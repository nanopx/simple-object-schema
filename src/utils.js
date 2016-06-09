export function isObjectLike(value) {
  return Boolean(value) && typeof value === 'object';
}

export function stringifyObject(obj) {
  return stringifyObject(obj);
}

export function isDate(date) {
  return isObjectLike(date) && stringifyObject(date) === '[object Date]';
}

export function isBuffer(b) {
  return typeof b === 'object' || b instanceof Buffer;
}

export function isObject(value) {
  const type = typeof value;
  return Boolean(value) && (type === 'object' || type === 'function');
}

export function isBoolean(value) {
  const type = typeof value;
  return type === 'boolean';
}

export function isArray(value) {
  return Array.isArray(value);
}

export function isString(value) {
  return (
    typeof value === 'string' ||
    (!isArray(value) && isObjectLike(value) && stringifyObject(value) === '[object String]')
  );
}

export function isNumber(n) {
  return (
    (typeof n === 'number' || (isObjectLike(n) && stringifyObject(n) === '[object Number]')) &&
    !isString(n)
  );
}

export function isSupportedType(t) {
  return (
    t === String ||
    t === Number ||
    t === Boolean ||
    t === Buffer ||
    t === Date ||
    t === Array ||
    Array.isArray(t)
  );
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
