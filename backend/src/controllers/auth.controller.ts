import { NextFunction, Request, Response } from "express";
import { validate } from "../utils/validate";
import { SignInValidation, SignUpValidation } from "../validations/auth.validations";
import { createUser, loginUser } from "../services/auth.service";
import httpStatus from "http-status";
import { setCookies } from "../utils/jwt";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = await validate(SignUpValidation, req);
    const user = await createUser(body.user);
    if (user) {
      await setCookies(user, res);
      return res.status(httpStatus.CREATED).send({ user: user.toJSON() });
    }
  } catch (err) {
    next(err);
  }
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = await validate(SignInValidation, req);
    const user = await loginUser(body.email, body.password);
    if (user) {
      await setCookies(user, res);
      return res.status(httpStatus.OK).send({ user: user.toJSON() });
    }
    return res.status(httpStatus.NOT_FOUND).send({ message: "Invalid email or password" });
  } catch (err) {
    next(err);
  }
};
