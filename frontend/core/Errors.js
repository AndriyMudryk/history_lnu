export default class Errors {
  /**
   * Create a new Errors instance.
   */
  constructor() {
    this.errors = {};
  }


  /**
   * Determine if an errors exists for the given field.
   *
   * @param {string} field
   */
  has(field) {
    return this.errors.hasOwnProperty(field);
  }


  /**
   * Determine if we have any errors.
   */
  any() {
    return Object.keys(this.errors).length > 0;
  }


  /**
   * Retrieve the error message for a field.
   *
   * @param {string} field
   */
  get(field) {
    if (this.errors[field]) {
      return this.errors[field];
    }
  }


  /**
   * Record the new errors.
   *
   * @param {object} errors
   */
  record(errors) {
    this.errors = errors;
  }

  /**
   * Get erorr Records
   *
   * @param {object} errors
   */
  getErrors() {
    return this.errors;
  }

  /**
   * Record the new field error.
   *
   * @param {object} errors
   */
  addRecord(fieldName, errorMessage) {
    this.errors[fieldName] = errorMessage;
  }


  /**
   * Clear one or all error fields.
   *
   * @param {string|null} field
   */
  clear(field) {
    if (typeof field === "string") {
      delete this.errors[field];
      return;
    }

    this.errors = {};
  }
}