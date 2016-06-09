import * as messageTypes from '../messageTypes';

export default {
  __types__: {
    Array: '配列',
    Boolean: '真偽',
    Buffer: 'バッファ',
    Date: '日付',
    Number: '数字',
    String: '文字列',
  },
  [messageTypes.KEY_NOT_DEFINED_IN_SCHEMA]: 'スキーマに"{{key}}"が定義されていません。',
  [messageTypes.IS_REQUIRED]: '"{{name}}"は必須です。',
  [messageTypes.TYPE_MUST_BE_STRING]: '"{{name}}"は文字列でなければなりません。',
  [messageTypes.TYPE_MUST_BE_NUMBER]: '"{{name}}"は数字でなければなりません。',
  [messageTypes.TYPE_MUST_BE_BOOLEAN]: '"{{name}}"は真偽型でなければなりません。',
  [messageTypes.TYPE_MUST_BE_BUFFER]: '"{{name}}"はバッファでなければなりません。',
  [messageTypes.TYPE_MUST_BE_DATE]: '"{{name}}"日付でなければなりません。',
  [messageTypes.TYPE_MUST_BE_ARRAY]: '"{{name}}"は配列でなければなりません。',
  [messageTypes.TYPE_MUST_BE_ONE_OF]: '"{{name}}"は"{{type}}"の何れかの型でなければなりません。指定された値は"{{typeOfValue}}"型でした。',
  [messageTypes.MATCH_DOES_NOT_MATCH_PATTERN]: '"{{name}}"は正規表現の"{{match}}"に一致しませんでした。',
  [messageTypes.IN_DOES_NOT_MATCH_VALUES]: '"{{name}}"は"{{in}}"の何れかと一致しなければなりません。',
  [messageTypes.MIN_MUST_BE_GREATER_THAN]: '"{{name}}"は{{min}}以上でなければなりません。',
  [messageTypes.MIN_MUST_BE_GREATER_THAN_CHAR]: '"{{name}}"は{{min}}文字以上でなければなりません。',
  [messageTypes.MAX_MUST_BE_LESS_THAN]: '"{{name}}"は{{max}}以下でなければなりません。',
  [messageTypes.MAX_MUST_BE_LESS_THAN_CHAR]: '"{{name}}"は{{max}}文字以下でなければなりません。',
  [messageTypes.EQUALS_TO_MUST_BE_EQUAL]: '"{{name}}"は"{{equalsTo}}"と同じでなければなりません。',
};
