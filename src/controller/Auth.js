import Auth from "../model/Auth.model";
import { validationResult } from "express-validator";
import ResponseObj from "./Response";
import bcrypt from "bcryptjs";

/**
 * This task is for registering a new user
 * @returns
 */
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

  //Creating the new user object with the body request
  let newUser = new Auth();
  newUser.email = req.body.email;
  newUser.username = req.body.username;

  //Generating salt
  let salt = await bcrypt.genSalt(10);
  //Hashing the password
  newUser.password = await bcrypt.hash(req.body.password, salt);

  let resData = new ResponseObj(200, newUser, "User saved");
  return res.send(resData);
};
