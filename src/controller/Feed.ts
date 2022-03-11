import { Request, Response } from "express";
import Feed, { Ifeed } from "../model/Feed.modal";
import ResponseObj from "./Response";
import respPagination from "./respPagination";

/**
 * Get all feeds
 * @param req
 * @param res
 */
export const getFeedTask = async (req: Request, res: Response) => {
  try {
    const feeds = await Feed.find();
    if (Object(feeds).length === 0) {
      const paginate = new respPagination(0, 0, 0);
      const responseObj = new ResponseObj(200, {}, paginate, "No Data");
      return res.status(200).send(responseObj);
    }
    return res.send(feeds);
  } catch (error) {}
};
