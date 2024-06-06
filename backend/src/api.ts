import bodyParser from "body-parser";
import timeout from "connect-timeout";
import cookies from "cookie-parser";
import express from "express";
import http from "http";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import { Routes } from "./routes";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errors.middleware";
dotenv.config();

const app = express();
const server = http.createServer(app);

const database_url = process.env.MONGO_DB_URL || "";
const port = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || "sendspark_challenge_secret";

mongoose
  .connect(database_url, {
    retryWrites: true,
  })
  .then(() => {
    console.log("Mongoose successfully connected!");
    runServer();
  })
  .catch(error => {
    console.error(error, "Mongoose error");
  });

const runServer = () => {
  app.use(timeout("60s"));
  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
  app.use(helmet());
  app.use(cors());
  app.use(cookies());
  app.use(Routes);
  app.use(errorHandler());
  server.listen(port, async () => {
    console.log(`Server running on port ${port}`);
  });
};

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", err => {
    console.error(err, "Uncaught Exception thrown");
  });
