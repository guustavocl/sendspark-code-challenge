import { NextFunction, Request, Response } from "express";
import { validate } from "../utils/validate";
import { SignUpValidation } from "../validations/auth.validations";
import { createUser, loginUser } from "../services/auth.service";
import httpStatus from "http-status";
import { setAuthCookie } from "../utils/jwt";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = await validate(SignUpValidation, req);
    const user = await createUser(body.user);
    if (user) {
      await setAuthCookie(user._id, res);
      return res.status(httpStatus.CREATED).send({ user: user.toJSON() });
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
      return res.status(httpStatus.CREATED).send({ user: user.toJSON() });
    }
    return res.status(httpStatus.NOT_FOUND).send({ message: "Invalid email or password" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
