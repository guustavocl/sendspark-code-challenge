import { Router } from "express";
import { AuthRoutes } from "./routes/auth.route";
import { UserRoutes } from "./routes/user.route";

const Routes = Router();

Routes.use("/", AuthRoutes);
Routes.use("/", UserRoutes);

/* PING CHECK */
Routes.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

/*  NOT FOUND */
Routes.get("*", (req, res) => res.status(404).json({ message: "Not Found~" }));

export { Routes };
