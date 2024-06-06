import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller";

export const AuthRoutes = Router();

AuthRoutes.post("/auth/sign-up", signUp);
AuthRoutes.post("/auth/sign-in", signIn);
