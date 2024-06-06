import jwt from "jsonwebtoken";
import { CookieOptions, Response } from "express";
import { JWT_SECRET } from "../api";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const cookieConfig = (date = new Date(1)): CookieOptions => {
  return {
    domain: process.env.JWT_SECRET === "production" ? "gus.sh" : "localhost",
    secure: process.env.JWT_SECRET === "production" ? true : false,
    expires: date,
    httpOnly: true,
    sameSite: "strict",
  };
};

export const setAuthCookie = async (userId: string, res: Response) => {
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 1);

  const config = cookieConfig(expireDate);
  const authToken = createAuthJwtToken(userId);
  res.cookie("auth_cookie", authToken, config);
};

export const removeAuthCookie = (res: Response) => {
  const config = cookieConfig();
  res.cookie("auth_cookie", "", config);
};

export const createAuthJwtToken = (userId: string) => {
  return jwt.sign({ _id: userId }, JWT_SECRET, {
    expiresIn: "24h",
  });
};

export const createHash = async () => {
  const random = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(random, bcrypt.genSaltSync(12));
  return hash;
};
