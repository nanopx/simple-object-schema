export function isObjectLike(value) {
  return Boolean(value) && typeof value === 'object';
}

export function stringifyObject(obj) {
  return Object.prototype.toString.call(obj);
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

export function isDate(date) {
  const parsedDate = Date.parse(date);
  return (
    isNumber(date) ||
    (!isNaN(parsedDate) && isNumber(parsedDate)) ||
    (isObjectLike(date) && stringifyObject(date) === '[object Date]')
  );
}

export function isRegExp(re) {
  return stringifyObject(re) === '[object RegExp]';
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

export function traverseValidations(validations, value, option) {
  const messages = [];
  validations.forEach((validation) => {
    const messageType = validation(value, option);
    if (messageType) {
      messages.push(messageType);
    }
  });
  return messages;
}
