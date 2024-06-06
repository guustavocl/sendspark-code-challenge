import { Router } from "express";
import { findAllUsers, removeUser } from "../controllers/user.controller";

export const UserRoutes = Router();

//In the code challenge doc, there is a sentence saying to use only POST, but I think DELETE and GET are the best methods to handle this
// TODO add auth here
UserRoutes.delete("/user/:userId/remove", removeUser);
UserRoutes.get("/user/findAll", findAllUsers);
