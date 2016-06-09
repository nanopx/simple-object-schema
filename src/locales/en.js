import * as messageTypes from '../messageTypes';

export default {
  [messageTypes.KEY_NOT_DEFINED_IN_SCHEMA]: 'Key "{{key}}" is not defined in schema',
  [messageTypes.IS_REQUIRED]: '"{{name}}" is required',
  [messageTypes.TYPE_MUST_BE_STRING]: '"{{name}}" must be a "{{type}}"',
  [messageTypes.TYPE_MUST_BE_NUMBER]: '"{{name}}" must be a "{{type}}"',
  [messageTypes.TYPE_MUST_BE_BOOLEAN]: '"{{name}}" must be a "{{type}}"',
  [messageTypes.TYPE_MUST_BE_BUFFER]: '"{{name}}" must be a "{{type}}"',
  [messageTypes.TYPE_MUST_BE_DATE]: '"{{name}}" must be a "{{type}}"',
  [messageTypes.TYPE_MUST_BE_ARRAY]: '"{{name}}" must be an "{{type}}"',
  [messageTypes.TYPE_MUST_BE_ONE_OF]: '"{{name}}" must be one of "{{type}}", but the type of given value was "{{typeOfValue}}"',
  [messageTypes.MATCH_DOES_NOT_MATCH_PATTERN]: '"{{name}}" does not match pattern "{{match}}"',
  [messageTypes.IN_DOES_NOT_MATCH_VALUES]: '"{{name}}" ',
  [messageTypes.MIN_MUST_BE_GREATER_THAN]: '"{{name}}" must be greater than {{min}}',
  [messageTypes.MIN_MUST_BE_GREATER_THAN_CHAR]: '"{{name}}" must be greater than {{min}} characters',
  [messageTypes.MAX_MUST_BE_LESS_THAN]: '"{{name}}" must be less than {{max}}',
  [messageTypes.MAX_MUST_BE_LESS_THAN_CHAR]: '"{{name}}" must be less than {{max}} characters',
  [messageTypes.EQUALS_TO_MUST_BE_EQUAL]: '"{{name}}" must be equal to "{{equalsTo}}"',
};
