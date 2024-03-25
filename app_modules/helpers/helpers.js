const dynamicHandler = function( _config ) {
  return {
    set: function(target, property, value) {
      const seters = _config().setters;
      if (!seters.includes(property)) return false;
      target[property] = value;
      return true;
    },
    get:function(target, property){
      const getters = _config().getters;
      if (!getters.includes(property)) return undefined;
      const objKey = target[property];
      if (typeof objKey === 'function') {
        return function(...args) {
          return objKey.apply(target, args);
        };
      }
      return objKey
    }
  }
}

const pipe = function(...functions){
  return functions.reduce( function(currentValue,currentFunction) {
     return currentFunction(currentValue);
  },value);
}
const parseBool = function(value) {
  if(
    typeof value === "string" && ( value.length < 1 || value.toLowerCase() === 'false') ||
    typeof value === "object" && Object.keys(value).length < 1 ||
    Array.isArray(value) && value.length < 1 ||
    value == undefined ||
    value === false
  ){
    return false;
  }
  return true;
}

const isNull = function(num) {
  return num === null;
}

/**
 * Checks to see if a value is set.
 *
 * @param   {Function} accessor Function that returns our value
 * @returns {Boolean}           Value is not undefined or null
 */
const isset = function(accessor) {
  try {
    // Note we're seeing if the returned value of our function is not
    // undefined or null
    return accessor() !== undefined && accessor() !== null
  } catch (e) {
    // And we're able to catch the Error it would normally throw for
    // referencing a property of undefined
    return false
  }
}

/**
 * Checks to see if a value is set.
 *
 * @param   {Function} array Function that returns our value
 * @returns {array by reference}           Value is not undefined or null
 */
const shuffle = function(array) {
  array.sort(() => Math.random() - 0.5);
}

module.exports = {
  dynamicHandler,
  pipe,
  parseBool,
  isNull,
  isset,
  shuffle,
};