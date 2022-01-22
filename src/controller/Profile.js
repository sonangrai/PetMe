import Profile from "../model/Profile.model";
import { validationResult } from "express-validator";
import ResponseObj from "./Response";

/**
 * Creates a profile
 */
export const CreateProfileTask = async (req, res) => {
  //Checking the validetion error
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let respObject = new ResponseObj(
      400,
      errors.errors,
      "Validation error occured"
    );
    return res.status(400).send(respObject);
  }
};
