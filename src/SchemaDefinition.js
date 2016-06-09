/* eslint-disable */
import * as utils from './utils';

export const SCHEMA_KEY = Symbol('SchemaDefinition::_schema');
export const OPTIONS_KEY = Symbol('SchemaDefinition::_options');

class SchemaDefinition {

  definitions = [];
  isSchemaDefinition = true;

  constructor(options = {}) {
    const { throwOnDefinitionError = true } = options;
    this[SCHEMA_KEY] = {};
    this[OPTIONS_KEY] = {
      throwOnDefinitionError,
    };
  }

  _throwInvalidDefinition(type, message) {
    if (this[OPTIONS_KEY].throwOnDefinitionError) {
      throw new Error(`Invalid definition for '${type}': ${message}`);
    }
  }

  define(definitionType, definition) {
    if (this.definitions.indexOf(definitionType) >= 0) {
      return this._throwInvalidDefinition(definitionType, `${definitionType} is already defined`);
    }
    this.definitions.push(definitionType);
    this[SCHEMA_KEY][definitionType] = definition;
  }

  type(t) {
    if (!t) {
      return this._throwInvalidDefinition('type', 'type is required');
    }

    if (!utils.isSupportedType(t)) {
      return this._throwInvalidDefinition(
        'type', t.name ? `'${t.name}' is not supported` : 'the provided type is not supported'
      );
    }

    this.define('type', t);
    return this;
  }

  match(re) {
    // TODO: check valid regex
    this.define('match', re)
    return this;
  }

  in(values) {
    if (!values) {
      return this._throwInvalidDefinition('in', 'argument is required');
    }

    if (!utils.isArray(values)) {
      return this._throwInvalidDefinition('in', 'argument must be an array');
    }

    this.define('in', values);
    return this;
  }

  defaultsTo(defaultValue) {
    this.define('defaultsTo', defaultValue);
    return this;
  }

  min(_min) {
    if (!utils.isNumber(_min)) {
      return this._throwInvalidDefinition('min', 'must be a valid number');
    }

    this.define('min', _min);
    return this;
  }

  max(_max) {
    if (!utils.isNumber(_max)) {
      return this._throwInvalidDefinition('max', 'must be a valid number');
    }

    this.define('max', _max);
    return this;
  }

  equalsTo(value) {
    this.define('equalsTo', value);
    return this;
  }

  isRequired() {
    this.define('isRequired', true);
    return this;
  }

  label(name) {
    if (!name) {
      return this._throwInvalidDefinition('label', 'name is required');
    }

    this.define('label', name);
    return this;
  }
}

export default SchemaDefinition;
