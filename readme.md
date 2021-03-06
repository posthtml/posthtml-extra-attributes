<div align="center">
  <img width="150" height="150" title="PostHTML" src="https://posthtml.github.io/posthtml/logo.svg">
  <h1>Extra Attributes</h1>
  <p>Add new attributes to elements in your HTML</p>

  [![Version][npm-version-shield]][npm]
  [![License][license-shield]][license]
  [![Build][github-ci-shield]][github-ci]
  [![Downloads][npm-stats-shield]][npm-stats]
</div>

## Introduction

This PostHTML plugin can add extra attributes to elements in your HTML:

- does not overwrite existing attributes (configurable)
- appends class names to existing ones
- supports a variety of CSS-like selectors

## Installation

```
$ npm i posthtml posthtml-extra-attributes
```

## Usage

```js
const posthtml = require('posthtml')
const addAttributes = require('posthtml-extra-attributes')

posthtml([
    addAttributes({
      attributes: {
        div: {
          class: 'new',
          id: 'new'
        }
      }
    })
  ])
  .process('<div class="test">Test</div>')
  .then(result => console.log(result.html))

  // <div class="test new" id="new">Test</div>
```

## Options

### `attributes`

Type: `object`\
Default: `{}`

An object defining which elements should get what attributes.

Elements can be any [posthtml-match-helper](https://github.com/phloe/posthtml-match-helper) selector.

#### Select by tag

Add `id="new"` to all `<div>` tags:

```js
const attributes = {
  div: {
    id: 'new'
  },
}
```

#### Select by class

Add `editable="true"` to all elements with a `test` class:

```js
const attributes = {
  '.test': {
    'editable': true
  },
}
```

#### Select by id

Add `class="new"` to any element with `id="test"`:

```js
const attributes = {
  '#test': {
    class: 'new'
  },
}
```

If the element already has a `class` attribute, the value will be appended:

```html
<div id="test" class="test">Test</div>
```

... will result in:

```html
<div id="test" class="test new">Test</div>
```

#### Select by attribute

Adds `aria-roledescription="slide"` to all elements with a `role` attribute:

```js
const attributes = {
  '[role]': {
    'aria-roledescription': 'slide'
  },
}
```

#### Select multiple tags

Add multiple attributes to multiple elements in one go:

```js
const attributes = {
  'div, p': {
    class: 'test',
  },
  'div[role=alert], section.alert': {
    class: 'alert'
  },
}
```

### `overwrite`

Type: `boolean`\
Default: `false`

By default, the plugin will not overwrite existing attribute values.

Set this option to `true` to enable attribute value overwriting:

```js
posthtml([
    addAttributes({
      attributes: {
        div: {
          id: 'new'
        }
      },
      overwrite: true
    })
  ])
  .process('<div id="test">Test</div>')
  .then(result => console.log(result.html))

  // <div id="new">Test</div>
```

[npm]: https://www.npmjs.com/package/posthtml-extra-attributes
[npm-version-shield]: https://img.shields.io/npm/v/posthtml-extra-attributes.svg
[npm-stats]: http://npm-stat.com/charts.html?package=posthtml-extra-attributes
[npm-stats-shield]: https://img.shields.io/npm/dt/posthtml-extra-attributes.svg
[github-ci]: https://github.com/posthtml/posthtml-extra-attributes/actions
[github-ci-shield]: https://img.shields.io/github/workflow/status/posthtml/posthtml-extra-attributes/Node.js%20CI
[license]: ./license
[license-shield]: https://img.shields.io/npm/l/posthtml-extra-attributes.svg
