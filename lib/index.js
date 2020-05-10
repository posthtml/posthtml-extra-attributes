const omit = require('lodash.omit')
const matchHelper = require('posthtml-match-helper')

module.exports = (options = {}) => tree => {
  options.attributes = options.attributes || {}
  options.overwrite = options.overwrite || false

  const process = node => {
    const attributes = Object.keys(options.attributes)
    const matchers = attributes.map(attribute => matchHelper(attribute))

    attributes.forEach((key, i) => {
      tree.match(matchers[i], node => {
        // For each attribute that we want to add...
        Object.entries(options.attributes[key]).forEach(([k, v]) => {
          if (k === 'class' && node.attrs && node.attrs.class) {
            node.attrs.class = [...(new Set([...node.attrs.class.split(' '), ...v.split(' ')]))].join(' ')
          } else {
            const attributes = options.overwrite ? options.attributes[key] : omit(options.attributes[key], Object.keys(node.attrs || {}))
            node.attrs = {...node.attrs, ...attributes}
          }
        })

        return node
      })
    })

    return node
  }

  return tree.walk(process)
}
