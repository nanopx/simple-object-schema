const Schema = require('../lib').default;
const messageTypes = require('../lib').messageTypes;

const schema = new Schema();

const fooSchema = {
  foo: schema.define.type(Number).min(100).max(200).equalsTo(150).isRequired().label('FOO'),
  bar: schema.define.type([Number, Boolean]).defaultsTo(100).isRequired().label('BAR'),
  baz: schema.define.type(String).match(/hello/).isRequired(),
  abc: schema.define.type(String).in(['ABC', 'DEF']),
};

// Pass
console.log(schema.validate({ foo: 150, bar: undefined, baz: 'hello' }, fooSchema));
// { values: { foo: 150, bar: 100, baz: 'hello', abc: null },
//   errors: null }


// Fail
console.log(schema.validate({ foo: 10000, bar: 'string', baz: 'helo', notDefinedInSchema: 'hello' }, fooSchema));
// { values: null,
//   errors:
//    { __root__: [ 'Key "notDefinedInSchema" is not defined in schema' ],
//      foo:
//       [ '"FOO" must be less than 200',
//         '"FOO" must be equal to "150"' ],
//      bar: [ '"BAR" must be one of "Number, Boolean", but the type of given value was "String"' ],
//      baz: [ '"baz" does not match pattern "/hello/"' ] } }


// Fail, with partially overridden message
const locale = {};
locale[messageTypes.IS_REQUIRED] = '{{name}} IS REQUIRED!';
const schema2 = new Schema({ locale: locale });
console.log(schema2.validate({ foo: null, bar: 'string', baz: 'helo', notDefinedInSchema: 'hello' }, fooSchema));
// { values: null,
//   errors:
//    { __root__: [ 'Key "notDefinedInSchema" is not defined in schema' ],
//      foo:
//       [ 'FOO IS REQUIRED!',
//         '"FOO" must be a "Number"',
//         '"FOO" must be equal to "150"' ],
//      bar: [ '"BAR" must be one of "Number, Boolean", but the type of given value was "String"' ],
//      baz: [ '"baz" does not match pattern "/hello/"' ] } }


// Using locale preset
const schema3 = new Schema({ locale: Schema.locales.ja });
console.log(schema3.validate({ foo: null, bar: 'string', baz: 'helo', notDefinedInSchema: 'hello', abc: 'FOO' }, fooSchema));
// { values: null,
//   errors:
//    { __root__: [ 'スキーマに"notDefinedInSchema"が定義されていません。' ],
//      foo:
//       [ '"FOO"は必須です。',
//         '"FOO"は数字でなければなりません。',
//         '"FOO"は"150"と同じでなければなりません。' ],
//      bar: [ '"BAR"は"数字, 真偽"の何れかの型でなければなりません。指定された値は"文字列"型でした。' ],
//      baz: [ '"baz"は正規表現の"/hello/"に一致しませんでした。' ],
//      abc: [ '"abc"は"ABC, DEF"の何れかと一致しなければなりません。' ] } }
