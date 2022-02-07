import Auth from "../model/Auth.model";
import ResponseObj from "./Response";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

/**
 * This task is for registering a new user
 * @returns
 */
export const RegisterTask = async (req: Request, res: Response) => {
  let { email, username, password } = req.body;
  //Checking validations
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let respObject = new ResponseObj(400, errors, "Validations error occured");
    return res.status(400).send(respObject);
  }

  /**
   * Checking if the email is already existing
   */
  let found = await Auth.findOne({ email });
  if (found) {
    let resData = new ResponseObj(409, {}, "Email already Taken");
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
    let resData = new ResponseObj(200, newUser, "Confirm link is sent to mail");
    //SendActivationMail(newUser._id, token, newUser.email);
    return res.send(resData);
  } catch (error) {
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let resData = new ResponseObj(400, errorObject, "User save failed");

    return res.send(resData);
  }
};

/**
 * Create activate token and save to mongodb
 */
export const SendActivationMail = async (
  id: string,
  token: string,
  email: string
) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "shonahangrae@gmail.com",
      pass: process.env.myPass,
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Password Reset Request", // Subject line
    text: "Forgot Your Password", // plain text body
    html: `<p>CLick here to change your password <a href="/api/resetpassword/${id}/${token}">Reset password</a> </p>`, // html body
  });
  //console.log("Message sent: %s", info.messageId);
};

/**
 * The activate account task
 */
export const ActivateTask = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  //Checking code for now 1234
  if (code !== "1234") {
    let respObject = new ResponseObj(
      401,
      {},
      "Sorry, but the code is not valid"
    );
    return res.status(401).send(respObject);
  }

  /**
   * Finding the user
   */
  try {
    let findUser = await Auth.findOne({ email: email });
    if (!findUser) {
      let responseObj = new ResponseObj(
        404,
        {},
        "Sorry, The user was not found. Please chefck again."
      );
      return res.status(404).send(responseObj);
    }

    await Auth.findOneAndUpdate(
      { _id: findUser._id },
      { status: 1 },
      { new: true }
    );

    let respObject = new ResponseObj(
      200,
      {},
      "Congrats, your account is now activated. Now you can log in."
    );
    return res.status(200).send(respObject);
  } catch (error) {
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let responseObj = new ResponseObj(500, errorObject, "Server Error");
    return res.status(500).send(responseObj);
  }
};

/**
 * The login task
 */
export const LoginTask = async (req: Request, res: Response) => {
  const { logtype, password } = req.body;
  //Checking validations
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let respObject = new ResponseObj(400, errors, "Validations error occured");
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
        "Sorry, The user was not found. Please check again."
      );
      return res.status(404).send(responseObj);
    }

    //Checking if the account is activated
    if (findUser.status != "1") {
      let responsObj = new ResponseObj(
        405,
        findUser,
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
        "Sorry, Password did not matched. Please try again."
      );
      return res.status(401).send(responsObj);
    }

    let access_token = jwt.sign(
      { user: { id: findUser._id } },
      process.env.mySecret!,
      { expiresIn: 360000 }
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
    let respObject = new ResponseObj(200, resData, "Login Successfull");
    return res.status(200).send(respObject);
  } catch (error) {
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let responseObj = new ResponseObj(500, errorObject, "Server Error");
    return res.status(500).send(responseObj);
  }
};
