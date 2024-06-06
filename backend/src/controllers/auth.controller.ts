import { NextFunction, Request, Response } from "express";
import { validate } from "../utils/validate";
import { SignUpValidation } from "../validations/auth.validations";
import { createUser, loginUser } from "../services/auth.service";
import httpStatus from "http-status";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = await validate(SignUpValidation, req);
    const user = await createUser(body.user);
    if (user) {
      res.status(httpStatus.CREATED).send({ user: user.toJSON() });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = await validate(SignUpValidation, req);
    const user = await loginUser(body.user?.email, body.user?.password);
    if (user) {
      res.status(httpStatus.CREATED).send({ user: user.toJSON() });
    }
    res.status(httpStatus.NOT_FOUND).send({ message: "Invalid email or password" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
