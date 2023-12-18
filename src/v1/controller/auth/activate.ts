import { Request, Response } from "express";
import Auth from "../../model/Auth.model";
import ResponseObj from "../Response";

/**
 * The activate account task
 */
const ActivateAccount = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  //Checking code for now 1234
  if (code !== "1234") {
    let respObject = new ResponseObj(
      401,
      {},
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
        {},
        "Sorry, The user was not found. Please check again and try."
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
      {},
      "Congrats, your account is now activated. Now you can log in."
    );
    return res.status(200).send(respObject);
  } catch (error) {
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let responseObj = new ResponseObj(500, errorObject, {}, "Server Error");
    return res.status(500).send(responseObj);
  }
};

export default ActivateAccount;
