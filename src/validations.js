import * as utils from './utils';
import * as c from './messageTypes';

const checkString = (value, type) => {
  if (type !== String) return null;
  return utils.isString(value) ? null : c.TYPE_MUST_BE_STRING;
};

const checkNumber = (value, type) => {
  if (type !== Number) return null;
  return utils.isNumber(value) ? null : c.TYPE_MUST_BE_NUMBER;
};

const checkBoolean = (value, type) => {
  if (type !== Boolean) return null;
  return utils.isBoolean(value) ? null : c.TYPE_MUST_BE_BOOLEAN;
};

const checkBuffer = (value, type) => {
  if (type !== Buffer) return null;
  return utils.isBuffer(value) ? null : c.TYPE_MUST_BE_BUFFER;
};

const checkDate = (value, type) => {
  if (type !== Date) return null;
  return utils.isDate(value) ? null : c.TYPE_MUST_BE_DATE;
};

const checkArray = (value, type) => {
  if (type !== Array) return null;
  return utils.isArray(value) ? null : c.TYPE_MUST_BE_ARRAY;
};

export default {
  type: [
    checkString,
    checkNumber,
    checkBoolean,
    checkBuffer,
    checkDate,
    checkArray,
    (value, type) => {
      if (utils.isArray(type) && type.length) {
        const fails = type.map((t) => {
          return [
            checkString(value, t),
            checkNumber(value, t),
            checkBoolean(value, t),
            checkBuffer(value, t),
            checkDate(value, t),
            checkArray(value, t),
          ].filter((results) => results)[0];
        }).filter((results) => results) || null;

        if (!fails || fails.length < type.length) return null;

        return c.TYPE_MUST_BE_ONE_OF;
      }
    },
  ],
  match: [
    (value, re) => !re.test(value) ? c.MATCH_DOES_NOT_MATCH_PATTERN : null,
  ],
  in: [
    (value, options) => options.indexOf(value) < 0 ? c.IN_DOES_NOT_MATCH_VALUES : null,
  ],
  min: [
    (value, min) => utils.isNumber(value) && value < min ? c.MIN_MUST_BE_GREATER_THAN : null,
    (value, min) => utils.isString(value) && value.length < min ? c.MIN_MUST_BE_GREATER_THAN_CHAR : null,
  ],
  max: [
    (value, max) => utils.isNumber(value) && value > max ? c.MAX_MUST_BE_LESS_THAN : null,
    (value, max) => utils.isString(value) && value.length > max ? c.MAX_MUST_BE_LESS_THAN_CHAR : null,
  ],
  equalsTo: [
    (value, target) => value !== target ? c.EQUALS_TO_MUST_BE_EQUAL : null,
  ],
};
