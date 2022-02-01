import Profile from "../model/Profile.model";
import Auth from "../model/Auth.model";
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

/**
 * Edit a profile
 */
export const EditProfileTask = async (req, res) => {
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

  let profile = new Profile({
    firstname,
    lastname,
    avatar,
    address,
    contact,
  });

  //New pbject for updated fields
  let newProfile = {};
  if (firstname) newProfile.firstname = firstname;
  if (lastname) newProfile.lastname = lastname;
  if (avatar) newProfile.avatar = avatar;
  if (address) newProfile.address = address;
  if (contact) newProfile.contact = contact;

  try {
    let findUser = await Auth.findById(req.user.id);
    if (!findUser) {
      let respObject = new ResponseObj(400, newprofile, "User not found");
      res.send(respObject);
    } else {
      profile = await Profile.findOneAndUpdate(
        { _id: req.user.id },
        { $set: newProfile },
        { new: true }
      );
      let respObject = new ResponseObj(
        200,
        newProfile,
        "Profile Update Success"
      );
      return res.status(200).send(respObject);
    }
  } catch (error) {
    let resData = new ResponseObj(400, error, "Profile Update Error");
    return res.send(resData);
  }
};

/**
 * Fetch the profile
 */
export const GetProfile = async (req, res) => {
  //finding if profile exist
  let profile = await Profile.findOne({ authId: req.user.id });
  if (!profile) {
    let respObject = new ResponseObj(404, {}, "Profile not found");
    return res.status(404).send(respObject);
  }

  let respObject = new ResponseObj(200, profile, "Profile found");
  return res.status(200).send(respObject);
};
