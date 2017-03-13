var data = {};

/**
 * In Memory key-value storage. For Mobile it will use native code. To share data between WebViews
 * @type {{set: Function, get: Function}}
 */
var MemCache = {
  sessionId: '',
  set(key, value){
    data[key] = value;
  },
  get(key) {
    return data[key];
  },
  remove(key) {
    delete data[key];
  }
};

export default MemCache;
