const test = require('ava')
const plugin = require('../lib')
const posthtml = require('posthtml')

const path = require('path')
const {readFileSync} = require('fs')

const fixture = file => readFileSync(path.join(__dirname, 'fixtures', `${file}.html`), 'utf8')
const expected = file => readFileSync(path.join(__dirname, 'expected', `${file}.html`), 'utf8')

const clean = html => html.replace(/[^\S\r\n]+$/gm, '').trim()

const process = (t, name, options, log = false) => {
  return posthtml([plugin(options)])
    .process(fixture(name))
    .then(result => log ? console.log(result.html) : clean(result.html))
    .then(html => t.is(html, expected(name).trim()))
}

test('does nothing if no attributes passed', t => {
  return process(t, 'nothing')
})

test('does not overwrite existing attributes by default', t => {
  const attributes = {
    div: {
      id: 'new'
    }
  }
  return process(t, 'no-overwrite', {attributes})
})

test('overwrites existing attributes when option is enabled', t => {
  const attributes = {
    div: {
      id: 'new'
    }
  }
  return process(t, 'overwrite', {attributes, overwrite: true})
})

test('appends new classes', t => {
  const attributes = {
    div: {
      class: 'new'
    }
  }
  return process(t, 'append-classes', {attributes})
})

test('tag selectors', t => {
  const attributes = {
    div: {
      id: 'add'
    }
  }

  return process(t, 'tag', {attributes})
})

test('class selectors', t => {
  const attributes = {
    '.test': {
      id: 'add'
    }
  }

  return process(t, 'class', {attributes})
})

test('id selectors', t => {
  const attributes = {
    '#test': {
      class: 'test'
    }
  }

  return process(t, 'id', {attributes})
})

test('attribute selectors', t => {
  const attributes = {
    '[role]': {
      'aria-roledescription': 'slide'
    }
  }

  return process(t, 'attribute', {attributes})
})

test('nested', t => {
  const attributes = {
    div: {
      class: 'parent'
    },
    span: {
      class: 'child'
    }
  }

  return process(t, 'nested', {attributes})
})

test('multiple selectors', t => {
  const attributes = {
    'div, p': {
      class: 'test',
      role: 'section'
    }
  }

  return process(t, 'multiple', {attributes})
})
