import Profile from "../model/Profile.model";
import { validationResult } from "express-validator";
import ResponseObj from "./Response";

/**
 * Creates a profile
 */
export const CreateProfileTask = async (req, res) => {
  let { firstname, lastname, avatar, address, contact } = req.body;

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

  try {
    let newprofile = new Profile({
      authId: req.user.id,
      firstname: firstname,
      lastname: lastname,
      avatar: avatar,
      address: address,
      contact: contact,
    });
    await newprofile.save();
    let respObject = new ResponseObj(
      400,
      newprofile,
      "Profile added successfully"
    );
    res.send(respObject);
  } catch (error) {
    let resData = new ResponseObj(400, error, "Profile save failed");
    return res.send(resData);
  }
};
