# 715 Framework

A lightning-fast, zero-dependency reactive JavaScript framework with no fluff, just pure performance.

## What Makes 715 Special?

**⚡ Lightning Fast** - O(1) targeted DOM updates, no virtual DOM overhead  
**🔧 Zero Dependencies** - Pure JavaScript, no external libraries required  
**💾 Built-in Persistence** - Automatic localStorage and sessionStorage support  
**🎯 Minimal Setup** - Works directly in browsers with no build process  
**📦 Tiny Size** - Under 5KB minified  

## Quick Start

### 1. Include the Framework
```html
<script src="715.js"></script>
```

### 2. Create Variables (Minimal JavaScript)
```html
<script>
const userName = sevenFifteen.variable('userName', '', 'session');
const count = sevenFifteen.variable('count', 0, 'local');

document.addEventListener('DOMContentLoaded', () => {
    sevenFifteen.init();
});
</script>
```

### 3. Use Variables in Your HTML
```html
<!-- Text variables -->
<p>Hello {{userName}}!</p>

<!-- Automatic form controls -->
<input type="text" data-715-var="userName" placeholder="Enter your name">
<input type="range" data-715-var="count" min="0" max="100">

<!-- Automatic buttons -->
<button data-715-var="count" data-715-action="increment">+1</button>
<button data-715-var="count" data-715-action="reset">Reset</button>

<!-- Conditional rendering -->
<div data-715-if="count > 10">Count is greater than 10!</div>

<!-- Dynamic styling -->
<div data-715-style="width: {{count}}px; height: {{count}}px;"></div>
```

That's it! Reactive variables, automatic DOM updates, zero dependencies.

## Features

### Reactive Variables
```javascript
// Session storage (cleared when tab closes)
const temp = sevenFifteen.variable('temp', 0, 'session');

// Local storage (persists after restart)
const theme = sevenFifteen.variable('theme', 'light', 'local');
```

### Automatic Form Controls
```html
<!-- Text inputs -->
<input type="text" data-715-var="userName">

<!-- Checkboxes -->
<input type="checkbox" data-715-var="isVisible">

<!-- Range sliders -->
<input type="range" data-715-var="volume" min="0" max="100">

<!-- Dropdowns -->
<select data-715-var="colour">
    <option value="red">Red</option>
    <option value="blue">Blue</option>
</select>
```

### Built-in Button Actions
```html
<!-- Counter actions -->
<button data-715-var="count" data-715-action="increment">+1</button>
<button data-715-var="count" data-715-action="decrement">-1</button>
<button data-715-var="count" data-715-action="reset">Reset</button>

<!-- Boolean toggle -->
<button data-715-var="isVisible" data-715-action="toggle">Toggle</button>

<!-- Set specific values -->
<button data-715-var="size" data-715-action="set:100">Set to 100</button>
<button data-715-var="colour" data-715-action="set:red">Make Red</button>
```

### Conditional Rendering
```html
<!-- Simple conditions -->
<div data-715-if="isLoggedIn === true">Welcome back!</div>
<div data-715-if="count > 5">Count is high!</div>
<div data-715-if="userName !== ''">Hello {{userName}}!</div>

<!-- Complex conditions -->
<div data-715-if="count > 10 && isVisible === true">
    Both conditions are met!
</div>
```

### Dynamic Styling
```html
<!-- Use data-715-style to avoid CSS parser errors -->
<div data-715-style="
    width: {{boxSize}}px; 
    height: {{boxSize}}px; 
    background-color: {{boxColour}};
    transform: rotate({{angle}}deg);
"></div>
```

### Template Variables
```html
<!-- In text content -->
<p>User: {{userName}} | Score: {{score}}</p>

<!-- In attributes -->
<img src="{{imageUrl}}" alt="{{imageDescription}}">
<a href="{{linkUrl}}" title="{{linkTitle}}">{{linkText}}</a>

<!-- Multiple variables in one element -->
<div class="user-{{userId}}" data-score="{{score}}">
    {{userName}} has {{score}} points
</div>
```

## Performance

715 Framework is built for speed:

- **O(1) Updates**: Only elements using changed variables are updated
- **Smart Scanning**: DOM is scanned once on init, then remembered
- **No Virtual DOM**: Direct, targeted DOM manipulation
- **Minimal Re-computation**: Variables are processed only where needed

This means your app stays fast regardless of how large your HTML becomes.

## API Reference

### `sevenFifteen.variable(name, defaultValue, storageType)`
Creates a reactive variable.

**Parameters:**
- `name` (string): Unique variable name
- `defaultValue` (any): Initial value if not found in storage
- `storageType` (string): `'session'` or `'local'`

**Returns:** Object with `get()` and `set(value)` methods

```javascript
const counter = sevenFifteen.variable('counter', 0, 'session');
console.log(counter.get()); // 0
counter.set(5); // Updates DOM automatically
```

### `sevenFifteen.init()`
Initialises the framework. Call after creating all variables.

```javascript
document.addEventListener('DOMContentLoaded', () => {
    sevenFifteen.init();
});
```

## Data Attributes

### `data-715-var="variableName"`
Connects form elements to variables automatically.

### `data-715-action="actionType"`
Adds automatic button behaviours:
- `increment` - Adds 1 to number
- `decrement` - Subtracts 1 from number  
- `reset` - Sets to 0
- `toggle` - Flips boolean value
- `set:value` - Sets to specific value

### `data-715-if="condition"`
Shows/hides elements based on conditions.

### `data-715-style="cssWithVariables"`
Applies dynamic CSS without parser errors.

## Browser Support

Works in all modern browsers supporting:
- ES6 (ECMAScript 2015)
- localStorage/sessionStorage
- Template literals
- Arrow functions

## Examples

### Simple Counter
```html
<div>Count: {{count}}</div>
<button data-715-var="count" data-715-action="increment">+</button>
<button data-715-var="count" data-715-action="decrement">-</button>

<script>
const count = sevenFifteen.variable('count', 0, 'session');
sevenFifteen.init();
</script>
```

### User Profile
```html
<div data-715-if="userName !== ''">
    <h1>Welcome {{userName}}!</h1>
    <p>Theme: {{theme}}</p>
</div>

<input type="text" data-715-var="userName" placeholder="Your name">
<select data-715-var="theme">
    <option value="light">Light</option>
    <option value="dark">Dark</option>
</select>

<script>
const userName = sevenFifteen.variable('userName', '', 'session');
const theme = sevenFifteen.variable('theme', 'light', 'local');
sevenFifteen.init();
</script>
```

### Dynamic Styling
```html
<div data-715-style="
    width: {{size}}px;
    height: {{size}}px;
    background: {{colour}};
">{{size}}px</div>

<input type="range" data-715-var="size" min="50" max="200">
<select data-715-var="colour">
    <option value="red">Red</option>
    <option value="blue">Blue</option>
    <option value="green">Green</option>
</select>

<script>
const size = sevenFifteen.variable('size', 100, 'session');
const colour = sevenFifteen.variable('colour', 'red', 'session');
sevenFifteen.init();
</script>
```

## Why 715?

715 Framework eliminates the complexity of modern JavaScript frameworks whilst providing true reactivity. It's designed for developers who want:

- **Performance over bloat**
- **Zero build tools**
- **Minimal dependencies**
- **Maximum efficiency**
- **True reactive behaviour**

Perfect for projects where you need lightning-fast reactivity without the framework overhead.

## Licence

MIT License - feel free to use in any project!
