import jwt from "jsonwebtoken";
import { CookieOptions, Response } from "express";
import { JWT_SECRET } from "../api";
import bcrypt from "bcryptjs";
import { UserProps } from "../models/user.types";

const cookieConfig = (date = new Date(1)): CookieOptions => {
  return {
    domain: process.env.NODE_ENV === "production" ? "gus.sh" : "localhost",
    secure: process.env.NODE_ENV === "production" ? true : false,
    expires: date,
    httpOnly: true,
    sameSite: "strict",
  };
};

export const setCookies = async (user: UserProps, res: Response) => {
  await setAuthCookie(user._id, res);
  await setUserCookie(user, res);
};

export const setAuthCookie = async (userId: string, res: Response) => {
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 1);

  const config = cookieConfig(expireDate);
  const authToken = createAuthJwtToken(userId);
  res.cookie("auth_cookie", authToken, config);
};

export const setUserCookie = async (user: UserProps, res: Response) => {
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 7);

  const config = cookieConfig(expireDate);
  res.cookie("user_cookie", JSON.stringify(user), config);
};

export const removeCookies = (res: Response) => {
  const config = cookieConfig();
  res.cookie("auth_cookie", "", config);
  res.cookie("user_cookie", "", config);
};

export const createAuthJwtToken = (userId: string) => {
  return jwt.sign({ _id: userId }, JWT_SECRET, {
    expiresIn: "24h",
  });
};

export const createHashedPassword = async (password: string) => {
  const hash = await bcrypt.hash(password || "", bcrypt.genSaltSync(12));
  return hash;
};
