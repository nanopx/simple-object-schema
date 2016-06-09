import * as utils from './utils';
import * as c from './messageTypes';

const checkString = (value, type) => type === String ? (utils.isString(value) ? null : c.TYPE_MUST_BE_STRING) : null;
const checkNumber = (value, type) => type === Number ? (utils.isNumber(value) ? null : c.TYPE_MUST_BE_NUMBER) : null;
const checkBoolean = (value, type) => type === Boolean ? (utils.isBoolean(value) ? null : c.TYPE_MUST_BE_BOOLEAN) : null;
const checkBuffer = (value, type) => type === Buffer ? (utils.isBuffer(value) ? null : c.TYPE_MUST_BE_BUFFER) : null;
const checkDate = (value, type) => type === Date ? (utils.isDate(value) ? null : c.TYPE_MUST_BE_DATE) : null;
const checkArray = (value, type) => type === Array ? (utils.isArray(value) ? null : c.TYPE_MUST_BE_ARRAY) : null;

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

        if (!fails || fails.length === 1) return null;

        return c.TYPE_MUST_BE_ONE_OF;
      }
    }
  ],
  match: [
    (value, re) => re.test(value) ? null : c.MATCH_DOES_NOT_MATCH_PATTERN,
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
    (value, target) => value === target ? null : c.EQUALS_TO_MUST_BE_EQUAL,
  ]
}
