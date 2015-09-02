export function hasClass(node, className) {
  return node.className.indexOf(className) > -1;
}

export function isType(type, node, key = false) {
  if (!key) {
    return typeof node === type;
  }

  return node[key] && typeof node[key] === type;
}

export function isFunction(node, key = false) {
  return isType('function', node, key);
}
