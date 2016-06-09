import Schema, { messageTypes } from '../lib';

class FooSchema extends Schema {
  constructor(options) {
    super(options);
    this.schema = {
      id: this.define.type(Number).isRequired(),
      name: this.define.type(String).isRequired().label('Display Name'),
      createdAt: this.define.type(Date).defaultsTo(Date.now()).label('Created At'),
    }
  }

  validate(values) {
    return super.validate(values, this.schema);
  }
}

const foo = new FooSchema();

const results = foo.validate({
  id: 100,
  name: 'nanopx',
});

console.log(results);
// { values: { id: 100, name: 'nanopx', createdAt: 1465487357721 },
//   errors: null }
