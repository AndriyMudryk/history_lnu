import logger from "~/utils/logger";

function apply(obj, props) {
  // Is it smart always return new object and not to modify original object?
  // When you really have intention to do that by apply?
  for (let prop in props) {
    if (props.hasOwnProperty(prop)) {
      obj[prop] = props[prop];
    }
  }
  return obj;
}

function cloneObject(obj, level) {
  if (level === 1) {
    return Object.assign({}, obj);
  }
  return JSON.parse(JSON.stringify(obj));
}

function getArrayItemIndex(arrayItems, propertyName, searchValue) {
  let i = arrayItems.length;

  while (i--) {
    if (arrayItems[i][propertyName] === searchValue) {
      return i;
    }
  }
  return -1;// Not found
}

function getArrayItem(arrayItems, propertyName, searchValue) {
  const index = getArrayItemIndex(arrayItems, propertyName, searchValue);

  if (index === -1) {
    return null;// Not found
  }
  return arrayItems[index];
}

function formatJsonObject(jsonObject) {
  return JSON.stringify(jsonObject, null, 2);
}

function serializeJsonObject(jsonObject) {
  const params = [];
  for (let property in jsonObject) {
    if (jsonObject.hasOwnProperty(property)) {
      params.push(encodeURIComponent(property) + "=" + encodeURIComponent(jsonObject[property]));
    }
  }
  return params.join("&");
}

function isStringNumber(numberStr) {
  return numberStr == Number(numberStr);
}

/*
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
*/

function isObject(value) {
  return value !== null && typeof value === "object";
}

function mergeDeep(target, ...sources) {
  if (sources.length === 0) {
    return target;
  }

  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      const targetValue = target[key];
      const sourceValue = source[key];
      if (isObject(sourceValue)) {
        if (isObject(targetValue)) {
          mergeDeep(targetValue, sourceValue);
        } else {
          target[key] = cloneObject(sourceValue);
        }
      } else {
        target[key] = sourceValue;
      }
    }
  }

  return mergeDeep(target, ...sources);
}

function catchErrorPromise(error) {

  // Skip unhandled promise rejections
  //logger.error("catchErrorPromise: " + JSON.stringify(error, null, 2));
  if (error && error.message) {
    logger.error("Error message: " + error.message);
  }
}

export default {
  apply: apply,
  cloneObject: cloneObject,
  getArrayItemIndex: getArrayItemIndex,
  getArrayItem: getArrayItem,
  formatJsonObject: formatJsonObject,
  serializeJsonObject: serializeJsonObject,
  isStringNumber: isStringNumber,
  mergeDeep: mergeDeep,
  catchErrorPromise: catchErrorPromise
};