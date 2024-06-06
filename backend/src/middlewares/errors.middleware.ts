import { NextFunction, Request, Response } from "express";
import { MongooseError } from "mongoose";
import { ZodError } from "zod";
import httpStatus from "http-status";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = () => (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(httpStatus.BAD_REQUEST).send({ errors: err.errors });
  } else if (err instanceof MongooseError) {
    return res.status(httpStatus.BAD_REQUEST).send({ errors: err.message });
  }
  return res.status(httpStatus.INTERNAL_SERVER_ERROR);
};
