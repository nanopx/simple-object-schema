import test from 'tape';
import SchemaDefinition, { SCHEMA_KEY } from '../src/SchemaDefinition';

const define = new SchemaDefinition();

test('SchemaDefinition', (t) => {
  t.ok(define instanceof SchemaDefinition, 'should be able to instantiate');
  t.end();
});

test('SchemaDefinition define#type', (t) => {
  t.throws(() => {
    define.type('Something not supported');
  }, /is not supported/, 'should throw when trying to declare an unsupported type');
  define.type(Number);
  t.assert(define[SCHEMA_KEY].type === Number, 'should be able to define "type"');
  t.assert(define.definitions.filter((d) => d === 'type')[0], 'should have "type" defined in definitions');
  t.throws(() => {
    define.type(Number);
  }, /is already defined/, 'should throw when trying to re-declare "type"');

  t.end();
});

test('SchemaDefinition define#isRequired', (t) => {
  define.isRequired();
  t.assert(define[SCHEMA_KEY].isRequired, 'should be able to define "isRequired"');
  t.assert(define.definitions.filter((d) => d === 'isRequired')[0], 'should have "isRequired" defined in definitions');
  t.throws(() => {
    define.isRequired();
  }, /is already defined/, 'should throw when trying to re-declare "isRequired"');
  t.end();
});

test('SchemaDefinition define#defaultsTo', (t) => {
  define.defaultsTo('test');
  t.assert(define[SCHEMA_KEY].defaultsTo === 'test', 'should be able to define "defaultsTo"');
  t.assert(define.definitions.filter((d) => d === 'defaultsTo')[0], 'should have "defaultsTo" defined in definitions');
  t.throws(() => {
    define.defaultsTo('test2');
  }, /is already defined/, 'should throw when trying to re-declare "defaultsTo"');
  t.end();
});

test('SchemaDefinition define#label', (t) => {
  t.throws(() => {
    define.label();
  }, /name is required/, 'should throw when trying to set an empty label');
  define.label('Test');
  t.assert(define[SCHEMA_KEY].label === 'Test', 'should be able to define "label"');
  t.assert(define.definitions.filter((d) => d === 'label')[0], 'should have "label" defined in definitions');
  t.throws(() => {
    define.label('Test2');
  }, /is already defined/, 'should throw when trying to re-declare "label"');
  t.end();
});

test('SchemaDefinition define#equalsTo', (t) => {
  define.equalsTo('test');
  t.assert(define[SCHEMA_KEY].equalsTo === 'test', 'should be able to define "equalsTo"');
  t.assert(define.definitions.filter((d) => d === 'equalsTo')[0], 'should have "equalsTo" defined in definitions');
  t.throws(() => {
    define.equalsTo('test2');
  }, /is already defined/, 'should throw when trying to re-declare "equalsTo"');
  t.end();
});

test('SchemaDefinition define#match', (t) => {
  t.throws(() => {
    define.match();
  }, /is required/, 'should throw when no argument specified');
  t.throws(() => {
    define.match('test');
  }, /regular expression/, 'should throw when argument is not a regular expression');

  const re = /test/;
  define.match(re);
  t.assert(define[SCHEMA_KEY].match === re, 'should be able to define "match"');
  t.assert(define.definitions.filter((d) => d === 'match')[0], 'should have "match" defined in definitions');
  t.throws(() => {
    define.match(/test2/);
  }, /is already defined/, 'should throw when trying to re-declare "match"');
  t.end();
});

test('SchemaDefinition define#in', (t) => {
  t.throws(() => {
    define.in();
  }, /is required/, 'should throw when no argument specified');

  t.throws(() => {
    define.in('test');
  }, /array/, 'should throw when argument is not an Array');

  const arg = ['test', 'test2'];
  define.in(arg);
  t.assert(define[SCHEMA_KEY].in === arg, 'should be able to define "in"');
  t.assert(define.definitions.filter((d) => d === 'in')[0], 'should have "in" defined in definitions');
  t.throws(() => {
    define.in(['test3', 'test4']);
  }, /is already defined/, 'should throw when trying to re-declare "in"');
  t.end();
});

test('SchemaDefinition define#min', (t) => {
  t.throws(() => {
    define.min('10');
  }, /number/, 'should throw when argument is not a Number');

  define.min(10);
  t.assert(define[SCHEMA_KEY].min === 10, 'should be able to define "min"');
  t.assert(define.definitions.filter((d) => d === 'min')[0], 'should have "min" defined in definitions');
  t.throws(() => {
    define.min(30);
  }, /is already defined/, 'should throw when trying to re-declare "min"');
  t.end();
});

test('SchemaDefinition define#max', (t) => {
  t.throws(() => {
    define.max('10');
  }, /number/, 'should throw when argument is not a Number');

  define.max(10);
  t.assert(define[SCHEMA_KEY].max === 10, 'should be able to define "max"');
  t.assert(define.definitions.filter((d) => d === 'max')[0], 'should have "max" defined in definitions');
  t.throws(() => {
    define.max(30);
  }, /is already defined/, 'should throw when trying to re-declare "max"');
  t.end();
});
