export function hasClass(node, className) {
  return node && node.className && node.className.indexOf(className) > -1;
}

export function isType(type, node, key = false) {
  if (!key) {
    return typeof node === type;
  }

  return node && node[key] && typeof node[key] === type;
}

export function isFunction(node, key = false) {
  return isType('function', node, key);
}

export function isNumber(val, key = false) {
  if (!key) {
    return isType('number', val) && parseInt(val) === parseInt(val);
  }

  return isType('number', val, key) && parseInt(val[key]) === parseInt(val[key]);
}

export function isString(val, key = false) {
  return isType('string', val, key);
}

export function contains(iterable, value) {
  if (iterable.indexOf) {
    return iterable.indexOf(value) > -1;
  }

  return Object.keys(iterable).filter(key => iterable[key] === value).length;
}
