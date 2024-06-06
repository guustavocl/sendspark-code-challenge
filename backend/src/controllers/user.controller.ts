import { Request, Response } from "express";
import { validate } from "../utils/validate";
import { getAllUsers, removeOneUser } from "../services/user.service";
import { RemoveUserValidation, findAllUsersValidation } from "../validations/user.validations";
import httpStatus from "http-status";
import { pick } from "../utils/pick";
import { ZodError } from "zod";

export const removeUser = async (req: Request, res: Response) => {
  try {
    const { params } = await validate(RemoveUserValidation, req);
    const success = await removeOneUser(params.userId);
    if (success) {
      return res.status(httpStatus.OK).send({ message: "User succesfully removed" });
    }
    return res.status(httpStatus.NOT_FOUND).send({ message: "User not found!" });
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(httpStatus.BAD_REQUEST).send({ errors: err.errors });
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const findAllUsers = async (req: Request, res: Response) => {
  try {
    const { query } = await validate(findAllUsersValidation, req);
    const filter = pick(query, ["jobTitle", "companyName"]);
    const options = pick(query, ["limit", "page"]);
    const users = await getAllUsers(filter, options);
    return res.status(httpStatus.OK).send({ users: users });
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(httpStatus.BAD_REQUEST).send({ errors: err.errors });
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
};
