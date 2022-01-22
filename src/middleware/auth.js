import jwt from "jsonwebtoken";
import ResponseObj from "../controller/Response";
require("dotenv").config();

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns Authenticated users or not
 */

const auth = async (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    let respObject = new ResponseObj(401, {}, "No token, authorization denied");
    return res.status(401).send(respObject);
  }

  // Verify token
  try {
    await jwt.verify(token, process.env.mySecret, (error, decoded) => {
      if (error) {
        let respObject = new ResponseObj(
          401,
          {},
          "Token is not valid or is expired"
        );
        return res.status(401).send(respObject);
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    let respObject = new ResponseObj(500, {}, "Server Error");
    return res.status(500).send(respObject);
  }
};

export default auth;
