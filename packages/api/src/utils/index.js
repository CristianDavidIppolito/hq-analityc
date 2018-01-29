/**
 * Function to get the no present key in a object
 * @param {any} keys
 * @param {any} object
 * @return {Array}
 */
function getMissinKeys(keys, object) {
    const array = keys
      .map(element => {
        const hasOwnProperty = Object.prototype.hasOwnProperty.call(
          object,
          element
        );
        if (!hasOwnProperty) {
          return element;
        }
        return null;
      })
      .filter(element => element !== null);
    return array;
  }
  
  /**
   * Function to validate if an object has the all keys that send in keys param
   *
   * @param {any} keys
   * @param {any} object
   * @return {Boolean}
   * @memberof Utils
   */
  function validateKeys(keys, object) {
    const array = keys
      .map(element => {
        const hasOwnProperty = Object.prototype.hasOwnProperty.call(
          object,
          element
        );
        if (!hasOwnProperty) {
          return element;
        }
        return null;
      })
      .filter(element => element !== null);
    if (array.length > 0) {
      return false;
    }
    return true;
  }
  
  module.exports = {
    getMissinKeys,
    validateKeys
  };
  