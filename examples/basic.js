const Validator = require('../lib').default;
const messageTypes = require('../lib').messageTypes;

const validator = new Validator();

const schema = {
  foo: validator.define.type(Number).min(100).max(200).equalsTo(150).isRequired().label('FOO'),
  bar: validator.define.type([Number, Boolean]).defaultsTo(100).isRequired().label('BAR'),
  baz: validator.define.type(String).match(/hello/).isRequired(),
  abc: validator.define.type(String).in(['ABC']),
};

// Pass
console.log(validator.validate({ foo: 150, bar: undefined, baz: 'hello' }, schema));

// Fail
console.log(validator.validate({ foo: 10000, bar: 'string', baz: 'helo', notDefinedInSchema: 'hello' }, schema));

// Fail, with partially overridden message
const locale = {};
locale[messageTypes.IS_REQUIRED] = '{{name}} IS REQUIRED!';
const validator2 = new Validator({ locale: locale });
console.log(validator2.validate({ foo: null, bar: 'string', baz: 'helo', notDefinedInSchema: 'hello' }, schema));


// Using locale preset
const validator3 = new Validator({ locale: Validator.locales.ja });
console.log(validator3.validate({ foo: null, bar: 'string', baz: 'helo', notDefinedInSchema: 'hello', abc: 'FOO' }, schema));
