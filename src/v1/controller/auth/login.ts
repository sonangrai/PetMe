import Auth from "../../model/Auth.model";
import ResponseObj from "../Response";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { Request, Response } from "express";

/**
 * The login task
 */
const LoginUser = async (req: Request, res: Response) => {
  const { logtype, password } = req.body;
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
   * Finding the user
   */
  try {
    let findUser =
      (await Auth.findOne({ username: logtype })) ||
      (await Auth.findOne({ email: logtype }));
    if (!findUser) {
      let responseObj = new ResponseObj(
        404,
        {},
        {},
        "Sorry, The user was not found. Please check again."
      );
      return res.status(404).send(responseObj);
    }

    //Checking if the account is activated
    if (findUser.status != "1") {
      let responsObj = new ResponseObj(
        405,
        findUser,
        {},
        "Your account is not activated"
      );
      return res.status(405).send(responsObj);
    }

    //Finally checking the password
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      let responsObj = new ResponseObj(
        401,
        {},
        {},
        "Sorry, Password did not matched. Please try again."
      );
      return res.status(401).send(responsObj);
    }

    let access_token = jwt.sign(
      { user: { id: findUser._id } },
      process.env.mySecret!,
      { expiresIn: 3600000 }
    );

    //Object for sending data to response
    let userData = {
      _id: findUser._id,
      email: findUser.email,
      username: findUser.username,
      status: findUser.status,
    };
    let resData = {
      access_token: access_token,
      user: userData,
    };
    let respObject = new ResponseObj(200, resData, {}, "Login Successfull");
    return res.status(200).send(respObject);
  } catch (error) {
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let responseObj = new ResponseObj(500, errorObject, {}, "Server Error");
    return res.status(500).send(responseObj);
  }
};

export default LoginUser;
