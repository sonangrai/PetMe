/**
 * A response class
 *  msg = the message of the response
 *  data = data object
 *  status = the response status
 */
class ResponseObj {
  constructor(status, data, msg) {
    this.status = status;
    this.data = data;
    this.msg = msg;
  }
}

export default ResponseObj;
