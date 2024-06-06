import { Router } from "express";

const Routes = Router();

/* PING CHECK */
Routes.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

/*  NOT FOUND */
Routes.get("*", (req, res) => res.status(404).json({ message: "Not Found~" }));

export { Routes };
