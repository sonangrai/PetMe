import Auth from "../../model/Auth.model";
import ResponseObj from "../Response";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { Request, Response } from "express";

/**
 * This task is for registering a new user
 * @returns
 */
const RegisterUser = async (req: Request, res: Response) => {
  let { email, username, password } = req.body;
  //Checking validations
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let respObject = new ResponseObj(
      400,
      errors,
      {},
      "Validations error occurred"
    );
    return res.status(400).send(respObject);
  }

  /**
   * Checking if the email is already existing
   */
  let found = await Auth.findOne({ email });
  if (found) {
    let resData = new ResponseObj(409, {}, {}, "Email already Taken");
    return res.status(409).send(resData);
  }

  /**
   * Creating the new user object with the body request
   */
  let newUser = new Auth();
  newUser.email = email;
  newUser.username = username;

  /**
   * Generating salt
   */
  let salt = await bcrypt.genSalt(10);
  //Hashing the password
  newUser.password = await bcrypt.hash(password, salt);

  /**
   * Generating token for the activation link
   */
  let token = jwt.sign({ expiresIn: 360000 }, process.env.mySecret!);

  /**
   * Saving to database
   */
  try {
    await newUser.save();
    let resData = new ResponseObj(
      200,
      newUser,
      {},
      "Confirm link is sent to mail"
    );
    //SendActivationMail(newUser._id, token, newUser.email);
    return res.send(resData);
  } catch (error) {
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let resData = new ResponseObj(400, errorObject, {}, "User save failed");

    return res.send(resData);
  }
};

export default RegisterUser;
