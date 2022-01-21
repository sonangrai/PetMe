import { validationResult } from "express-validator";
import ResponseObj from "./Response";

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns This will return response if any validation error has occured
 */

const requestValidation = async (req, res) => {
  let errors = validationResult(req);

  /*
   * If error exist
   */
  if (!errors.isEmpty()) {
    //Creating response
    let resData = new ResponseObj(
      400,
      errors.errors,
      "Validation errors occured"
    );
    return res.send(resData);
  }
};

export default requestValidation;
