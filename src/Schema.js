import SchemaDefinition, { SCHEMA_KEY } from './SchemaDefinition';
import * as utils from './utils';
import * as locales from './locales';
import validations from './validations';
import * as messageTypes from './messageTypes';

class Schema {
  _options = {
    locale: locales.en,
    rootErrorKey: '__root__',
  };

  validations = validations;

  static locales = locales;

  constructor(options = {}) {
    // Merge options
    const locale = this._options.locale;
    if (options.locale) {
      Object.assign(locale, options.locale);
    }
    this._options = Object.assign({}, this._options, options);
    this._options.locale = locale;
  }

  get define() {
    return new SchemaDefinition();
  }

  _translateTypeName(t) {
    const typeNames = this._options.locale.__types__;
    return typeNames && typeNames[t] ? typeNames[t] : t;
  }

  _translate(messageType, context = {}) {
    const locale = this._options.locale;
    if (!locale[messageType]) {
      throw new Error(`Cannot find message for message type: "${messageType}"`);
    }

    let message = locale[messageType];

    if (typeof message === 'function') {
      return message(context);
    }

    // if 'type' property exists in context
    if (context.hasOwnProperty('type')) {
      // set the function name
      if (typeof context.type === 'function' && context.type.name) {
        context.type = this._translateTypeName(context.type.name);
      }

      // if the value is an array of function, set it to comma-separated function names
      if (utils.isArray(context.type)) {
        context.type = context.type.map((t) => {
          if (typeof t === 'function' && t.name) {
            return this._translateTypeName(t.name);
          }
          return t;
        }).join(', ');
      }
    }

    if (context.hasOwnProperty('typeOfValue')) {
      context.typeOfValue = this._translateTypeName(context.typeOfValue);
    }

    // if 'in' property exists in context
    if (context.hasOwnProperty('in')) {
      context.in = context.in.join(', ');
    }

    Object.keys(context).forEach((key) => {
      const replaceTo = context[key];
      message = message.replace(RegExp(`{{${key}}}`, 'g'), replaceTo);
    });

    return message;
  }

  _addRootError(errors, message) {
    if (!errors[this._options.rootErrorKey]) {
      errors[this._options.rootErrorKey] = [];
    }
    errors[this._options.rootErrorKey].push(message);
  }

  _checkForUndeclaredKeys(inputValues, schemas, errors) {
    const schemaKeys = Object.keys(schemas);
    const inputKeys = Object.keys(inputValues);

    inputKeys.forEach((key) => {
      if (schemaKeys.indexOf(key) < 0) {
        this._addRootError(errors, this._translate(messageTypes.KEY_NOT_DEFINED_IN_SCHEMA, { key }));
      }
    });
  }

  addValidationForType(type, fn) {
    if (!this.validations[type]) {
      this.validations[type] = [];
    }
    this.validations[type].push(fn);
    return this;
  }

  validateEntry(key, schema, inputValue = null) {
    const errors = [];
    let value = inputValue;
    let name = key;

    // Label
    if (schema.label) {
      name = schema.label;
    }

    // Default values
    if (schema.hasOwnProperty('defaultsTo') && value === null) {
      value = schema.defaultsTo;
    }

    // Required values
    if (schema.isRequired && !value && value !== false && value !== 0) {
      errors.push(this._translate(messageTypes.IS_REQUIRED, { name }));
    }

    // Skip validation if it is not required
    if (!schema.isRequired && !value && value === null) {
      return { value, errors };
    }

    // Validations
    Object.keys(schema).forEach((type) => {
      const schemaConfigValue = schema[type];
      if (this.validations[type]) {
        this.validations[type].forEach((validate) => {
          const messageType = validate(value, schemaConfigValue);
          if (messageType) {
            errors.push(this._translate(messageType, {
              name,
              value,
              validation: type,
              [type]: schemaConfigValue,
              typeOfValue: utils.capitalizeFirstLetter(typeof value),
            }));
          }
        });
      }
    });

    return { value, errors };
  }

  validate(inputValues, schemas) {
    const values = inputValues;
    const errors = {};

    this._checkForUndeclaredKeys(inputValues, schemas, errors);

    Object.keys(schemas).forEach((key) => {
      if (!schemas[key].isSchemaDefinition) {
        throw new Error(`"${key}" doesn't have a valid schema definition`);
      }
      const result = this.validateEntry(key, schemas[key][SCHEMA_KEY], inputValues[key]);
      if (result.errors.length) {
        errors[key] = result.errors;
      }
      values[key] = result.value;
    });

    if (Object.keys(errors).length) {
      return { values: null, errors };
    }

    return { values, errors: null };
  }
}

export default Schema;
