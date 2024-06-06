import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../api";
import { UserProps } from "../models/user.types";
import { setAuthCookie } from "../utils/jwt";

export const authenticate = () => (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_cookie"];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (!payload) {
      return res.status(httpStatus.UNAUTHORIZED);
    }
    // Refreshing token
    setAuthCookie((payload as UserProps)._id, res);
    next();
  } catch (err) {
    return res.status(httpStatus.UNAUTHORIZED);
  }
};
