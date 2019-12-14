import axios from "axios";
import Errors from "./Errors";
import Validators from "./Validators";
import logger from "~/utils/logger";

export default class Form {
  /**
   * Create a new Form instance.
   *
   * @param {object} data
   */
  constructor(data, fieldRules) {
    this.originalData = data;
    this.fieldRules = fieldRules || [];

    for (let field in data) {
      this[field] = data[field];
    }
    this.errors = new Errors();
  }

  isFormValid() {
    const fieldRules = this.fieldRules;
    let i = fieldRules.length;

    this.errors.clear();
    while (i--) {
      const field = fieldRules[i];
      const fieldName = field.name;
      if (!this.hasOwnProperty(fieldName)) {
        logger.error("Invalid validation field name: " + fieldName);
        continue;
      }
      const fieldType = field.type;
      if (typeof Validators[fieldType] !== "function") {
        logger.error("Invalid validation field type: " + fieldType);
        continue;
      }
      let errorMessage = Validators[fieldType](this[fieldName], field.rules);
      if (errorMessage !== null) {
        this.errors.addRecord(fieldName, errorMessage);
      }
    }
    return !this.errors.any();
  }

  isFormFieldValid(fieldName) {
    const fieldRules = this.fieldRules;
    let i = fieldRules.length;

    // Create error coppy to not disable vue reactivity
    const errorsCopy = Object.assign({}, this.errors.getErrors());
    this.errors.record(errorsCopy);
    while (i--) {
      const field = fieldRules[i];
      if (fieldName === field.name) {
        this.errors.clear(fieldName);
        if (!this.hasOwnProperty(fieldName)) {
          logger.error("Invalid validation field name: " + fieldName);
          return false;
        }
        const fieldType = field.type;
        if (typeof Validators[fieldType] !== "function") {
          logger.error("Invalid validation field type: " + fieldType);
          return false;
        }
        let errorMessage = Validators[fieldType](this[fieldName], field.rules);
        if (errorMessage !== null) {
          //this.errors.clear();
          this.errors.addRecord(fieldName, errorMessage);
          return false;
        }
        return true;
      }
    }
    logger.error("Form field `" + fieldName + "` not found!");
    return false;
  }


  /**
   * Fetch all relevant data for the form.
   */
  data() {
    let data = {};

    for (let property in this.originalData) {
      data[property] = this[property];
    }
    return data;
  }


  /**
   * Reset the form fields.
   */
  reset() {
    for (let field in this.originalData) {
      if (this[field]) {
        this[field] = typeof this[field] === "number" ? 0 : "";
      }

    }

    this.errors.clear();
  }


  /**
   * Send a POST request to the given URL.
   * .
   * @param {string} url
   */
  post(url) {
    return this.submit("post", url);
  }


  /**
   * Send a PUT request to the given URL.
   * .
   * @param {string} url
   */
  put(url) {
    return this.submit("put", url);
  }


  /**
   * Send a PATCH request to the given URL.
   * .
   * @param {string} url
   */
  patch(url) {
    return this.submit("patch", url);
  }


  /**
   * Send a DELETE request to the given URL.
   * .
   * @param {string} url
   */
  delete(url) {
    return this.submit("delete", url);
  }


  /**
   * Submit the form.
   *
   * @param {string} requestType
   * @param {string} url
   */
  submit(requestType, url) {
    return new Promise((resolve, reject) => {
      let isValid = this.isFormValid();
      if (!isValid) {
        logger.error("Invalid form validation. Errors: " + JSON.stringify(this.errors, null, 2));
        reject("Not valid Form.");
        return false;
      }
      axios[requestType](url, this.data()).then(
        response => {
          this.onSuccess(response.data);
          resolve(response.data);
        }
      ).catch(
        error => {
          const response = error && error.response;
          if (response && response.data && response.data.errors) {
            this.onFail(response.data.errors);
          } else {
            this.onFail({});
          }
          reject(response && response.data);
        }
      );
    });
  }


  /**
   * Handle a successful form submission.
   *
   * @param {object} data
   */
  onSuccess(/*data*/) {
    this.reset();
  }


  /**
   * Handle a failed form submission.
   *
   * @param {object} errors
   */
  onFail(errors) {
    this.errors.record(errors);
  }
}