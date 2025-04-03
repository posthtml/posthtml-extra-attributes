import matchHelper from 'posthtml-match-helper';

const plugin = (options = {}) => (tree) => {
  options.attributes = options.attributes || {};
  options.overwrite = options.overwrite || false;
  const process = (node) => {
    const attributes = Object.keys(options.attributes);
    const matchers = attributes.map((attribute) => matchHelper(attribute));
    attributes.forEach((key, i) => {
      tree.match(matchers[i], (node2) => {
        for (const [k, v] of Object.entries(options.attributes[key])) {
          if (k === "class" && node2.attrs && node2.attrs.class) {
            node2.attrs.class = [.../* @__PURE__ */ new Set([...node2.attrs.class.split(" "), ...v.split(" ")])].join(" ");
          } else {
            const existingAttributes = node2.attrs || {};
            const remainingAttributes = Object.fromEntries(
              Object.entries(
                options.attributes[key]
              ).filter(
                ([attrKey]) => !(attrKey in existingAttributes)
              )
            );
            const attributes2 = options.overwrite ? options.attributes[key] : remainingAttributes;
            node2.attrs = { ...node2.attrs, ...attributes2 };
          }
        }
        return node2;
      });
    });
    return node;
  };
  return tree.walk(process);
};

export { plugin as default };
