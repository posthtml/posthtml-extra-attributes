import matchHelper from 'posthtml-match-helper'

const plugin = (options = {}) => tree => {
  options.attributes = options.attributes || {}
  options.overwrite = options.overwrite || false

  const process = node => {
    const attributes = Object.keys(options.attributes)
    const matchers = attributes.map(attribute => matchHelper(attribute))

    attributes.forEach((key, i) => {
      tree.match(matchers[i], node => {
        // For each attribute that we want to add...
        for (const [k, v] of Object.entries(options.attributes[key])) {
          if (k === 'class' && node.attrs && node.attrs.class) {
            node.attrs.class = [...(new Set([...node.attrs.class.split(' '), ...v.split(' ')]))].join(' ')
          } else {
            const existingAttributes = node.attrs || {}
            const remainingAttributes = Object.fromEntries(
              Object.entries(
                options.attributes[key]).filter(([attrKey]) => !(attrKey in existingAttributes)
              )
            )

            const attributes = options.overwrite
              ? options.attributes[key]
              : remainingAttributes

            node.attrs = {...node.attrs, ...attributes}
          }
        }

        return node
      })
    })

    return node
  }

  return tree.walk(process)
}

export default plugin
