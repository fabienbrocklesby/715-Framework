# 715 Framework

A lightning-fast, zero-dependency reactive JavaScript framework with no fluff, just pure performance.

**[🚀 Live Demo](https://fabienbrocklesby.github.io/715-Framework/demo.html)**

## What Makes 715 Special?

**⚡ Lightning Fast** - O(1) targeted DOM updates, no virtual DOM overhead  
**🔧 Zero Dependencies** - Pure JavaScript, no external libraries required  
**💾 Built-in Persistence** - Automatic localStorage and sessionStorage support  
**🎯 Minimal Setup** - Works directly in browsers with no build process  
**📦 Tiny Size** - 4.0KB minified, 1.4KB gzipped  
**🧮 Computed Variables** - Automatic reactive calculations  
**🎨 Transform Filters** - Built-in text, currency, and date formatting  
**🧠 Smart Expressions** - Mathematical operations and string concatenation in templates  

## Quick Start

### 1. Include the Framework
```html
<!-- Latest version (auto-updates) -->
<script src="https://cdn.jsdelivr.net/gh/fabienbrocklesby/715-Framework@main/715.ultra.min.js"></script>

<!-- Or use a specific version (recommended for production) -->
<script src="https://cdn.jsdelivr.net/gh/fabienbrocklesby/715-Framework@v1.0.0/715.ultra.min.js"></script>

<!-- Or download locally -->
<script src="715.ultra.min.js"></script>
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

<!-- Transform filters -->
<p>Price: {{price | currency:GBP:en-GB}}</p>
<p>Name: {{name | upper}}</p>
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

### Computed Variables
```javascript
// Automatically updates when dependencies change
const fullName = sevenFifteen.computed('fullName', 
    () => `${firstName.get()} ${lastName.get()}`,
    ['firstName', 'lastName']
);
```

### Transform Filters
```html
<!-- Built-in filters -->
<p>{{price | currency:USD:en-US}}</p>
<p>{{date | format:en-GB}}</p>
<p>{{name | upper}}</p>
<p>{{text | lower}}</p>

<!-- Custom filters -->
<script>
sevenFifteen.filter('reverse', str => str.split('').reverse().join(''));
</script>
<p>{{text | reverse}}</p>
```

### Automatic Form Controls
```html
<input type="text" data-715-var="userName">
<input type="checkbox" data-715-var="isVisible">
<input type="range" data-715-var="volume" min="0" max="100">
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

<!-- With transform filters -->
<p>Price: {{price | currency:EUR:en-DE}}</p>
<p>Date: {{date | format:en-AU}}</p>
<p>Text: {{message | upper | reverse}}</p>

<!-- Mathematical operations -->
<p>Plus 10: {{number + 10}}</p>
<p>Times 2: {{number * 2}}</p>
<p>Complex: {{(number + 5) * 2 - 1}}</p>

<!-- String concatenation -->
<p>Greeting: {{"Hello " + userName}}</p>
<p>With suffix: {{userName + "!"}}</p>
<p>Multiple: {{"Hello " + userName + ", welcome!"}}</p>

<!-- Mixed operations -->
<p>Dynamic: {{userName + " has " + count + " items"}}</p>
<p>Conditional: {{showMessage ? "ON" : "OFF"}}</p>
<p>Math + Text: {{userName + " #" + (userId * 10)}}</p>

<!-- In attributes -->
<img src="{{imageUrl}}" alt="{{imageDescription}}">
<a href="{{linkUrl}}" title="{{linkTitle}}">{{linkText}}</a>

<!-- Multiple variables in one element -->
<div class="user-{{userId}}" data-score="{{score}}">
    {{userName}} has {{score | currency}} points
</div>
```

### Mathematical Expressions
715 Framework supports JavaScript expressions directly in templates:

```html
<!-- Basic arithmetic -->
<p>{{price + tax}}</p>
<p>{{width * height}}</p>
<p>{{total / count}}</p>
<p>{{price - discount}}</p>

<!-- Complex expressions -->
<p>{{(price + tax) * quantity}}</p>
<p>{{Math.round(average * 100) / 100}}</p>

<!-- Comparisons and ternary operators -->
<p>{{count > 10 ? "High" : "Low"}}</p>
<p>{{isLoggedIn ? userName : "Guest"}}</p>

<!-- String operations -->
<p>{{firstName + " " + lastName}}</p>
<p>{{message + " (" + timestamp + ")"}}</p>

<!-- Combined with filters -->
<p>{{(price * 1.2) | currency:EUR:en-DE}}</p>
<p>{{(firstName + " " + lastName) | upper}}</p>
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

### `sevenFifteen.computed(name, fn, dependencies)`
Creates a computed variable that auto-updates when dependencies change.

**Parameters:**
- `name` (string): Unique computed variable name
- `fn` (function): Function that returns the computed value
- `dependencies` (array): Array of variable names this depends on

**Returns:** Object with `get()` method

```javascript
const fullName = sevenFifteen.computed('fullName',
    () => `${firstName.get()} ${lastName.get()}`,
    ['firstName', 'lastName']
);
```

### `sevenFifteen.filter(name, fn)`
Creates a custom transform filter.

**Parameters:**
- `name` (string): Filter name for use in templates
- `fn` (function): Function that transforms the input value

```javascript
sevenFifteen.filter('slug', str => 
    str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
);
// Usage: {{title | slug}}
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

## Built-in Filters

### Text Filters
- `upper` - Converts to uppercase
- `lower` - Converts to lowercase

### Currency Filters
- `currency` - Formats as currency (default USD, en-US)
- `currency:EUR:en-DE` - Euro in German format
- `currency:GBP:en-GB` - British Pound in UK format
- `currency:NZD:en-NZ` - New Zealand Dollar

### Date Filters
- `format` - Formats date (default en-US)
- `format:en-GB` - UK date format
- `format:en-AU` - Australian date format
- `format:sv-SE` - ISO format (YYYY-MM-DD)

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

### Mathematical Calculator
```html
<div>
    <input type="number" data-715-var="num1" placeholder="First number">
    <input type="number" data-715-var="num2" placeholder="Second number">
    
    <div>
        <p>Sum: {{num1 + num2}}</p>
        <p>Product: {{num1 * num2}}</p>
        <p>Average: {{(num1 + num2) / 2}}</p>
        <p>Result: {{num1 > num2 ? num1 + " is bigger" : num2 + " is bigger"}}</p>
    </div>
</div>

<script>
const num1 = sevenFifteen.variable('num1', 0, 'session');
const num2 = sevenFifteen.variable('num2', 0, 'session');
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
