import { Router } from "express";
import { findAllUsers, removeUser, signOut } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

export const UserRoutes = Router();

//In the code challenge doc, there is a sentence saying to use only POST, but I think DELETE and GET are the best methods to handle this
UserRoutes.delete("/user/:userId/remove", authenticate(), removeUser);
UserRoutes.get("/user/findAll", authenticate(), findAllUsers);
UserRoutes.post("/user/sign-out", authenticate(), signOut);
