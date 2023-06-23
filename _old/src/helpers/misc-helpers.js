/**
 * Convert Array of Objects to Key based object
 * @param  {Array} objectArray Object Array
 * @param  {String} key name of key to use as object key
 * @return {Object}     Mapped object
 */
const mapObjectArrayByKey = (objectArray, key) => {
  let mappedObj = {};
  objectArray?.forEach((elem) => {
    mappedObj[elem[key]] = elem;
  });
  return mappedObj;
};

export { mapObjectArrayByKey };
