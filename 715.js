const state = {};
const variableWatchers = {};
const globalVariables = {};

function createReactiveVariable(name, defaultValue, storageType = 'session') {
    const storage = storageType === 'local' ? localStorage : sessionStorage;
    const savedValue = storage.getItem(`715_${name}`);
    const currentValue = savedValue !== null ? JSON.parse(savedValue) : defaultValue;
    
    state[name] = currentValue;
    variableWatchers[name] = [];
    
    const variable = {
        get() {
            return state[name];
        },
        set(newValue) {
            state[name] = newValue;
            storage.setItem(`715_${name}`, JSON.stringify(newValue));
            updateSpecificVariable(name);
        }
    };
    
    globalVariables[name] = variable;
    return variable;
}

function updateSpecificVariable(variableName) {
    const watchers = variableWatchers[variableName];
    if (!watchers) return;
    
    watchers.forEach(watcher => {
        if (watcher.type === 'text') {
            watcher.element.textContent = watcher.template.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
                return state[varName] !== undefined ? state[varName] : '';
            });
        } else if (watcher.type === 'attribute') {
            watcher.element.setAttribute(watcher.attributeName, watcher.template.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
                return state[varName] !== undefined ? state[varName] : '';
            }));
        } else if (watcher.type === 'style') {
            const processedStyle = watcher.template.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
                return state[varName] !== undefined ? state[varName] : '';
            });
            watcher.element.setAttribute('style', processedStyle);
        } else if (watcher.type === 'conditional') {
            const shouldShow = evaluateCondition(watcher.condition);
            watcher.element.style.display = shouldShow ? '' : 'none';
        } else if (watcher.type === 'form') {
            updateFormElement(watcher.element, variableName);
        }
    });
}

function updateFormElement(element, variableName) {
    const currentValue = state[variableName];
    
    if (element.tagName === 'INPUT') {
        if (element.type === 'checkbox') {
            element.checked = currentValue;
        } else if (element.type === 'range' || element.type === 'number') {
            element.value = currentValue;
        } else {
            element.value = currentValue;
        }
    } else if (element.tagName === 'SELECT') {
        element.value = currentValue;
    }
}

function evaluateCondition(condition) {
    let expression = condition;
    Object.keys(state).forEach(variableName => {
        const value = state[variableName];
        const regex = new RegExp(`\\b${variableName}\\b`, 'g');
        expression = expression.replace(regex, typeof value === 'string' ? `"${value}"` : value);
    });
    
    try {
        return Function(`"use strict"; return (${expression})`)();
    } catch {
        return false;
    }
}

function addWatcher(varName, watcher) {
    if (!variableWatchers[varName]) variableWatchers[varName] = [];
    
    const exists = variableWatchers[varName].some(existing => 
        existing.element === watcher.element && 
        existing.type === watcher.type &&
        existing.attributeName === watcher.attributeName
    );
    
    if (!exists) {
        variableWatchers[varName].push(watcher);
    }
}

function scanForTemplates(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        const variableMatches = text.match(/\{\{(\w+)\}\}/g);
        if (variableMatches) {
            variableMatches.forEach(match => {
                const varName = match.slice(2, -2);
                addWatcher(varName, {
                    type: 'text',
                    element: node,
                    template: text
                });
            });
        }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.hasAttribute('data-715-if')) {
            const condition = node.getAttribute('data-715-if');
            const conditionVariables = condition.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g) || [];
            conditionVariables.forEach(varName => {
                if (state.hasOwnProperty(varName)) {
                    addWatcher(varName, {
                        type: 'conditional',
                        element: node,
                        condition: condition
                    });
                }
            });
        }
        
        if (node.hasAttribute('data-715-style')) {
            const styleTemplate = node.getAttribute('data-715-style');
            const variableMatches = styleTemplate.match(/\{\{(\w+)\}\}/g);
            if (variableMatches) {
                variableMatches.forEach(match => {
                    const varName = match.slice(2, -2);
                    addWatcher(varName, {
                        type: 'style',
                        element: node,
                        template: styleTemplate
                    });
                });
            }
        }
        
        Array.from(node.attributes).forEach(attribute => {
            if (attribute.name === 'data-715-style') return;
            
            const variableMatches = attribute.value.match(/\{\{(\w+)\}\}/g);
            if (variableMatches) {
                variableMatches.forEach(match => {
                    const varName = match.slice(2, -2);
                    addWatcher(varName, {
                        type: 'attribute',
                        element: node,
                        attributeName: attribute.name,
                        template: attribute.value
                    });
                });
            }
        });
        
        setupAutomaticEventHandlers(node);
        
        if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(node.tagName)) {
            Array.from(node.childNodes).forEach(child => scanForTemplates(child));
        }
    }
}

function setupAutomaticEventHandlers(element) {
    const varName = element.getAttribute('data-715-var');
    if (!varName || !globalVariables[varName]) return;
    
    const variable = globalVariables[varName];
    
    if (element.tagName === 'INPUT') {
        addWatcher(varName, {
            type: 'form',
            element: element
        });
        
        if (element.type === 'checkbox') {
            element.checked = variable.get();
            element.onclick = () => variable.set(element.checked);
        } else if (element.type === 'range' || element.type === 'number') {
            element.value = variable.get();
            element.oninput = () => variable.set(parseInt(element.value));
        } else {
            element.value = variable.get();
            element.oninput = () => variable.set(element.value);
        }
    } else if (element.tagName === 'SELECT') {
        addWatcher(varName, {
            type: 'form',
            element: element
        });
        
        element.value = variable.get();
        element.onchange = () => variable.set(element.value);
    } else if (element.tagName === 'BUTTON') {
        const action = element.getAttribute('data-715-action');
        if (action) {
            element.onclick = () => {
                const currentValue = variable.get();
                
                if (action === 'increment') {
                    variable.set(currentValue + 1);
                } else if (action === 'decrement') {
                    variable.set(currentValue - 1);
                } else if (action === 'reset') {
                    variable.set(0);
                } else if (action === 'toggle') {
                    variable.set(!currentValue);
                } else if (action.startsWith('set:')) {
                    const value = action.substring(4);
                    const parsedValue = isNaN(value) ? value : parseInt(value);
                    variable.set(parsedValue);
                }
            };
        }
    }
}

function startFramework() {
    scanForTemplates(document.body);
    
    Object.keys(variableWatchers).forEach(varName => {
        updateSpecificVariable(varName);
    });
}

window.sevenFifteen = {
    variable: createReactiveVariable,
    init: startFramework
};
