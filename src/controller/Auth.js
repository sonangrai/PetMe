import Auth from "../model/Auth.model";
import { validationResult } from "express-validator";
import ResponseObj from "./Response";

export const RegisterTask = async (req, res) => {
  let errors = validationResult(req);

  //If error exist
  if (!errors.isEmpty()) {
    //Creating response
    let resData = new ResponseObj(
      400,
      errors.errors,
      "Validation errors occured"
    );
    return res.send(resData);
  }
  return res.send(req.body);
};
