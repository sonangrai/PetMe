import Auth from "../model/Auth.model";
import ResponseObj from "./Response";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import requestValidation from "./ValidationError";

/**
 * This task is for registering a new user
 * @returns
 */
export const RegisterTask = async (req, res) => {
  //Checking validations
  requestValidation(req, res);

  /**
   * Checking if the email is already existing
   */
  let found = await Auth.findOne({ email: req.body.email });
  if (found) {
    let resData = new ResponseObj(409, {}, "Email already Taken");
    return res.send(resData);
  }

  /**
   * Creating the new user object with the body request
   */
  let newUser = new Auth();
  newUser.email = req.body.email;
  newUser.username = req.body.username;

  /**
   * Generating salt
   */
  let salt = await bcrypt.genSalt(10);
  //Hashing the password
  newUser.password = await bcrypt.hash(req.body.password, salt);

  /**
   * Generating token for the activation link
   */
  let token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: "foobar",
    },
    process.env.mySecret
  );

  /**
   * Saving to database
   */
  try {
    await newUser.save();
    let resData = new ResponseObj(200, newUser, "Confirm link is sent to mail");
    //SendActivationMail(newUser._id, token, newUser.email);
    return res.send(resData);
  } catch (error) {
    let resData = new ResponseObj(400, error, "User save failed");
    return res.send(resData);
  }
};

/**
 * Create activate token and save to mongodb
 */
export const SendActivationMail = async (id, token, email) => {
  console.log(email, token, id);

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
  console.log("Message sent: %s", info.messageId);
};

/**
 * The login task
 */
export const LoginTask = async (req, res) => {
  //Checking validations
  requestValidation(req, res);
};
