/**
 * Utils
 * general and useful functions to project.
 */
export function Utils() {

}

/**
 * Remove string comments
 * @param string
 * @returns {*}
 */
Utils.removeComments = function (string) {
  return string.replace(/\/\*[\s\S]*?\*\/|(?<=[^:])\/\/.*|^\/\/.*/g, '').trim();//Strip comments
}

/**
 * Covert a string to function with eval
 * @param string
 * @returns {boolean|function}
 */
Utils.convertStringToFunction = function (string) {
  try {
    string = string.toString();
    if (!string.includes('(')) return false;
    string = Utils.removeComments(string);
    return eval(string);
  } catch (e) {
    console.log(e, string);
    return false;
  }
}

/**
 * Check string is function
 * @param string
 * @returns {Function|boolean}
 */
Utils.stringIsFunction = function (string) {
  try {
    if (!string || typeof string === 'function') return false;

    const method = Utils.convertStringToFunction(string);
    if (!method || typeof method !== 'function') return false;
    return method;
  } catch (e) {
    console.log(e);
    return false;
  }
}

/**
 * Get method result from string handler
 * @param method
 * @param data
 * @returns {Promise<*|boolean|null>}
 */
Utils.getMethodResult = async function (method, data) {
  try {
    if (method === undefined || method === null || method === '') return null;
    if (typeof method === "boolean") return method;
    if (typeof method === "string") method = await Utils.stringIsFunction(method);
    if (typeof method === "function") return await method(data);
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
}

/**
 * Sleep
 * @returns {Promise<*|boolean|null>}
 * @param ms
 */
Utils.sleep = async function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Array push without duplicates
 *
 * @param array1
 * @param array2
 * @return any[]|null
 */
Utils.arrayPush = function (array1, array2) {
  try {
    return [...new Set(array1.concat(array2))]
  } catch (e) {
    return null;
  }
}

/**
 * Is Object
 * @returns {boolean}
 * @param data
 */
Utils.isObject = function (data, check_length = true) {
  try {
    if (!check_length) return typeof data === "object";
    return typeof data === "object" && Object.keys(data)?.length !== 0
  } catch (e) {
    return false;
  }
}

/**
 * Is String
 * @returns {boolean}
 * @param data
 */
Utils.isString = function (data) {
  try {
    return typeof data === "string"
  } catch (e) {
    return false;
  }
}

/**
 * Is Develop
 * @returns {boolean}
 */
Utils.isDev = function () {
  try {
    const host = window.location.hostname;
    return ['rev50.loc', 'localhost'].includes(host) || window.location.hostname?.indexOf('localhost') !== -1
  } catch (e) {
    return false;
  }
}

/**
 * Is Array
 * @returns {boolean}
 * @param data
 */
Utils.isArray = function (data) {
  try {
    return Array.isArray(data) && data?.length !== 0
  } catch (e) {
    return false;
  }
}

/**
 * Is Array or object
 * @returns {boolean}
 * @param data
 */
Utils.isArrayOrObject = function (data) {
  try {
    return Utils.isArray(data) || Utils.isObject(data);
  } catch (e) {
    return false;
  }
}

/**
 * Is Element
 * @returns {boolean}
 * @param element
 */
Utils.isElement = function (element) {
  return element instanceof Element || element instanceof HTMLDocument;
}

/**
 * Is Function
 * @returns {boolean}
 * @param data
 */
Utils.isFunction = function (data) {
  try {
    return typeof data === 'function';
  } catch (e) {
    return false;
  }
}

/**
 * Set string parameters
 */
Utils.setStringParameters = function (string, params) {
  try {
    params.forEach((param) => {
      string = string.replace('%s', param);
    })
    return string;
  } catch (e) {
    console.log();
    return string;
  }
}

/**
 * Format number
 * @param number
 * @param fa
 * @param split
 * @returns {*|string}
 */
Utils.formatNumber = function (number, fa = true, split = true) {
  try {
    let addFormat = "";
    if (split)
      if (100000000000 <= number + 0) {
        number = number / 1000000;
        addFormat = " Million";
      }
    let str = parseInt(number, 10).customFormat(0, 3, ",") + addFormat;
    if (!fa) return str;
    return str;
  } catch (e) {
    console.log(e);
    return number;
  }
}

/**
 * Create unique array of object with a column
 * @param array
 * @param key
 * @returns {*|*[]}
 */
Utils.uniqueArray = function (array, key = "id") {
  try {
    let new_array = [];
    array.filter(function (item) {
      let result = new_array.findIndex((x) => x[key] === item[key]);
      if (result < 0) new_array.push(item);
    });
    return new_array;
  } catch (e) {
    return array;
  }
}

/**
 * Calculate file size
 * @param bytes
 * @returns {string}
 */
Utils.calculateFileSize = function (bytes) {
  try {
    let sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (!bytes || bytes == 0) return "0 Byte";
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  } catch (e) {
    return "0 Byte";
  }
}

/**
 * Get file extension
 * @param path
 * @returns {*}
 */
Utils.getFileExtension = function (path) {
  if (!path) return;
  return path.split(".").pop();
}

/**
 * Log if is Development mode
 */
Utils.devLog = function (error) {
  if (!this.isDev()) return;

  console.log('>>>>>>> DEV LOG:')
  console.dir(error)
}

/**
 * Unique id
 * @return {string}
 */
Utils.uniqueId = function () {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
}

/**
 * Has property
 */
Utils.hasProperty = function (object, key) {
  try {
    return Object.prototype.hasOwnProperty.call(object, key)
  } catch (e) {
    return false;
  }
}

/**
 * Get string color
 */
Utils.getColor = function (string) {
  try {
    if (string === 'published') return 'success';
    if (string === 'draft') return 'grey';
    if (string === 'archived') return 'red';
    if (string === 'template') return 'blue';
  } catch (e) {
    console.log(e);
  }
}

/**
 * Convert string to object
 * @return {*}
 */
Utils.toObject = function (string) {
  try {
    if (typeof string === 'object') return string;
    return JSON.parse(string)
  } catch (e) {
    return null;
  }
}

/**
 * Sort compare method
 *
 * @return {{}|null}
 */
Utils.sortCompare = function (a, b, column = 'sort') {
  try {
    if (parseInt(a?.[column]) < parseInt(b?.[column])) {
      return -1;
    }
    if (parseInt(a?.[column]) > parseInt(b?.[column])) {
      return 1;
    }
    return 0;
  } catch (e) {

    return 0
  }
}

/**
 * Capitalize string
 * @param string
 * @return {*|string}
 */
Utils.capitalize = function (string) {
  try {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } catch (e) {
    return string;
  }
}

/**
 * Covert string to key structure
 * @param string
 */
Utils.toKey = function (string) {
  try {
    return string?.toString()?.trim()?.replaceAll(' ', '')?.toLowerCase()
  } catch (e) {
    Utils.devLog(e)
    return string;
  }
}

/**
 * Set cross subdomain cookie
 * @param name
 * @param value
 * @param seconds
 */
Utils.setCookie = function (name, value, seconds) {
  try {
    const assign = name + "=" + value + ";";
    const d = new Date();
    d.setTime(d.getTime() + (seconds * 1000));
    const expires = "expires=" + d.toUTCString() + ";";
    const path = "path=/;";
    const domain = "domain=" + (Utils.rootDomain(window.location.hostname)) + ";";
    document.cookie = assign + expires + path + domain + 'SameSite=Strict;Secure;';
    console.error(Utils.getCookie('token'))
  } catch (e) {
    Utils.devLog(e)
    return null;
  }
}

/**
 * Get cookie
 * @param name
 */
Utils.getCookie = function (name) {
  try {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  } catch (e) {
    Utils.devLog(e)
    return null;
  }
}

/**
 * Root domain
 * @param hostname
 * @return {*}
 */
Utils.rootDomain = function (hostname) {
  let parts = hostname.split(".");
  if (parts.length <= 2)
    return hostname;

  parts = parts.slice(-3);
  if (['co', 'com'].indexOf(parts[1]) > -1)
    return parts.join('.');

  return parts.slice(-2).join('.');
}

/**
 * Delete cookie
 * @param name
 */
Utils.deleteCookie = function (name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

/**
 * Clone and duplicate object
 * @param object
 * @return {any}
 */
Utils.cloneObject = function (object) {
  return Object.assign({}, object);
}
