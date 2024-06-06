import { Request, Response } from "express";
import { validate } from "../utils/validate";
import { SignUpValidation } from "../validations/auth.validations";
import { createUser, loginUser } from "../services/auth.service";
import httpStatus from "http-status";
import { setAuthCookie } from "../utils/jwt";
import { ZodError } from "zod";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { body } = await validate(SignUpValidation, req);
    const user = await createUser(body.user);
    if (user) {
      await setAuthCookie(user._id, res);
      return res.status(httpStatus.CREATED).send({ user: user.toJSON() });
    }
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(httpStatus.BAD_REQUEST).send({ errors: err.errors });
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { body } = await validate(SignUpValidation, req);
    const user = await loginUser(body.user?.email, body.user?.password);
    if (user) {
      return res.status(httpStatus.CREATED).send({ user: user.toJSON() });
    }
    return res.status(httpStatus.NOT_FOUND).send({ message: "Invalid email or password" });
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(httpStatus.BAD_REQUEST).send({ errors: err.errors });
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
};
