import { NextFunction, Request, Response } from "express";
import { validate } from "../utils/validate";
import { getAllUsers, removeOneUser } from "../services/user.service";
import { RemoveUserValidation, findAllUsersValidation } from "../validations/user.validations";
import httpStatus from "http-status";
import { pick } from "../utils/pick";

export const removeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = await validate(RemoveUserValidation, req);
    const success = await removeOneUser(params.userId);
    if (success) {
      return res.status(httpStatus.OK).send({ message: "User succesfully removed" });
    }
    return res.status(httpStatus.NOT_FOUND).send({ message: "User not found!" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const findAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query } = await validate(findAllUsersValidation, req);
    const filter = pick(query, ["jobTitle", "companyName"]);
    const options = pick(query, ["limit", "page"]);
    const users = await getAllUsers(filter, options);
    return res.status(httpStatus.OK).send({ users: users });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
