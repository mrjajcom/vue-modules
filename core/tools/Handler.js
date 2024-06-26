import {Messages} from "./Messages";

/**
 *  Handler
 * handle server or connection errors
 */
export function Handler() {

}

/**
 * Handled errors count
 * @type {number}
 */
Handler.counter = 0;

/**
 * Handle response error
 * @param result
 */
Handler.error = function (result) {
  try {
    const error = result?.errors?.[0].message;
    Messages.error(error);
    return result;
  } catch (e) {
    return result;
  }
}

/*

import account from "./Auth";
import messages from "./Messages";

const handler = {


  // handle errors
  error(result) {

  },

  // handle response
  response(result) {
    try {
      if (!result.data) return null;
      return result.data;
    } catch (e) {
      return null;
    }
  },

  _getErrorMessage(result, key = 0) {
    try {
      return result.response.data.errors[key].message
    } catch (e) {
      return null;
    }
  }
};

export default handler;
*/
