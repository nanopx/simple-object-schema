import test from 'tape';
import Schema from '../src/Schema';
import * as messageTypes from '../src/messageTypes';

test('Schema', (t) => {

  const schema = new Schema();
  t.ok(schema instanceof Schema, 'should be able to instantiate');

  const testSchema = {
    id: schema.define.type(Number).isRequired(),
    name: schema.define.type(String).isRequired(),
  };

  const passingValues = {
    id: 123,
    name: 'Test',
  };
  const passingResult = schema.validate(passingValues, testSchema);
  t.assert(!passingResult.errors, 'schema.validate should be able to validate without errors');
  t.deepEquals(passingResult.values, passingValues, 'schema.validate should return values when validation passes');


  const failingValues = {
    id: '123',
    name: 100,
  };
  const failingResult = schema.validate(failingValues, testSchema);
  t.assert(failingResult.errors, 'schema.validate should return errors when it fails');
  t.assert(failingResult.errors.id, 'schema.validate should return errors for specific key when it fails');
  t.assert(failingResult.errors.name, 'schema.validate should return errors for specific key when it fails');
  t.assert(!failingResult.values, 'schema.validate should not return values when validation fails');


  const locale = {
    [messageTypes.IS_REQUIRED]: '{{name}} IS REQUIRED!',
  };
  const schema2 = new Schema({ locale: locale });
  const failingResult2 = schema2.validate({}, testSchema);
  t.assert(Array.isArray(failingResult2.errors.id));
  const overriddenMessage = failingResult2.errors.id.filter((message) => {
    return message === 'id IS REQUIRED!';
  })[0];
  t.assert(overriddenMessage, 'should be able to override validation messages');


  const undeclaredKeysResult = schema.validate({id: 1, name: 'test', undeclared: undefined}, testSchema);
  t.assert(undeclaredKeysResult.errors.__root__.length === 1, 'should return errors for undeclared keys in provided values');

  t.end();
});
