import test from 'tape';
import validations from '../src/validations';
import { traverseValidations } from '../src/utils';

const createValidate = (_validations) => {
  return (value, option) => {
    const messages = traverseValidations(_validations, value, option);
    return messages[0] || undefined;
  };
};

const typeValidator = createValidate(validations.type);
const matchValidator = createValidate(validations.match);
const inValidator = createValidate(validations.in);
const minValidator = createValidate(validations.min);
const maxValidator = createValidate(validations.max);
const equalsToValidator = createValidate(validations.equalsTo);

test('validations.type', (t) => {
  t.assert(!typeValidator(100, Number), 'should not return messages on a valid number');
  t.assert(typeValidator('100', Number), 'should return message on an invalid number');

  t.assert(!typeValidator('test', String), 'should not return messages on a valid string');
  t.assert(typeValidator(100, String), 'should return message on an invalid string');

  t.assert(!typeValidator(true, Boolean), 'should not return messages on a valid boolean');
  t.assert(typeValidator(1, Boolean), 'should return message on an invalid boolean');

  t.assert(!typeValidator(new Buffer(1), Buffer), 'should not return messages on a valid buffer');
  t.assert(typeValidator('buffer', Buffer), 'should return message on an invalid buffer');

  t.assert(!typeValidator(new Date(), Date), 'should not return messages on a valid date');
  t.assert(!typeValidator(Date.now(), Date), 'should not return messages on a valid date (timestamp)');
  t.assert(!typeValidator('2016/04/02', Date), 'should not return messages on a valid date (date string)');
  t.assert(typeValidator('invalid date', Date), 'should return message on an invalid date');

  t.assert(!typeValidator([1, 2, 3], Array), 'should not return messages on a valid array');
  t.assert(typeValidator('array', Array), 'should return message on an invalid array');

  const types = [Number, Array, Boolean];
  t.assert(!typeValidator([1, 2, 3], types), 'should not return messages on valid types');
  t.assert(!typeValidator(123, types), 'should not return messages on valid types');
  t.assert(!typeValidator(false, types), 'should not return messages on valid types');
  t.assert(typeValidator(new Date(), types), 'should return message on a type which is not provided');

  t.end();
});

test('validations.match', (t) => {
  const re = /test/;
  t.assert(!matchValidator('testABC', re), 'should not return messages when RegExp matches');
  t.assert(matchValidator('123', re), 'should return message when RegExp does not match');
  t.end();
});

test('validations.in', (t) => {
  const has = ['test', 'test2', 'test3'];
  t.assert(!inValidator('test', has), 'should not return messages when the value matches one of options');
  t.assert(!inValidator('test2', has), 'should not return messages when the value matches one of options');
  t.assert(!inValidator('test3', has), 'should not return messages when the value matches one of options');
  t.assert(inValidator('test4', has), 'should return message when the value does not match any of options');
  t.end();
});

test('validations.min', (t) => {
  const min = 10;
  t.assert(!minValidator(11, min), 'should not return messages when number is greater than given number');
  t.assert(!minValidator(10, min), 'should not return messages when number is equal to given number');
  t.assert(minValidator(9, min), 'should return messages when number is less than given number');

  t.assert(!minValidator('1234567890+', min), 'should not return messages when length of string is greater than given number');
  t.assert(!minValidator('1234567890', min), 'should not return messages when length of string is equal to given number');
  t.assert(minValidator('123456789', min), 'should return message when length of string is less than given number');
  t.end();
});

test('validations.max', (t) => {
  const max = 10;
  t.assert(!maxValidator(9, max), 'should not return messages when number is less than given number');
  t.assert(!maxValidator(10, max), 'should not return messages when number is equal to given number');
  t.assert(maxValidator(11, max), 'should return message when number is greater than given number');

  t.assert(!maxValidator('123456789', max), 'should not return messages when length of string is less than given number');
  t.assert(!maxValidator('1234567890', max), 'should not return messages when length of string is equal to given number');
  t.assert(maxValidator('1234567890+', max), 'should return message when length of string is greater than given number');
  t.end();
});

test('validations.equalsTo', (t) => {
  t.assert(!equalsToValidator(10, 10), 'should not return messages when the values are equal');
  t.assert(!equalsToValidator('abc', 'abc'), 'should not return messages when the values are equal');
  t.assert(!equalsToValidator(true, true), 'should not return messages when the values are equal');
  t.assert(!equalsToValidator(false, false), 'should not return messages when the values are equal');

  t.assert(equalsToValidator(10, 'abc'), 'should return message when the values are not equal');
  t.assert(equalsToValidator('abc', 10), 'should return message when the values are not equal');
  t.assert(equalsToValidator(true, false), 'should return message when the values are not equal');
  t.assert(equalsToValidator(false, true), 'should return message when the values are not equal');
  t.end();
});
