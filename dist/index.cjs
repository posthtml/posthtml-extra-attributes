'use strict';

const omit = require('lodash.omit');
const matchHelper = require('posthtml-match-helper');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const omit__default = /*#__PURE__*/_interopDefaultCompat(omit);
const matchHelper__default = /*#__PURE__*/_interopDefaultCompat(matchHelper);

const plugin = (options = {}) => (tree) => {
  options.attributes = options.attributes || {};
  options.overwrite = options.overwrite || false;
  const process = (node) => {
    const attributes = Object.keys(options.attributes);
    const matchers = attributes.map((attribute) => matchHelper__default(attribute));
    attributes.forEach((key, i) => {
      tree.match(matchers[i], (node2) => {
        for (const [k, v] of Object.entries(options.attributes[key])) {
          if (k === "class" && node2.attrs && node2.attrs.class) {
            node2.attrs.class = [.../* @__PURE__ */ new Set([...node2.attrs.class.split(" "), ...v.split(" ")])].join(" ");
          } else {
            const attributes2 = options.overwrite ? options.attributes[key] : omit__default(options.attributes[key], Object.keys(node2.attrs || {}));
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

module.exports = plugin;
