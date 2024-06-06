import { Router } from "express";
import { AuthRoutes } from "./routes/auth.route";
import { UserRoutes } from "./routes/user.route";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

const Routes = Router();

Routes.use("/", AuthRoutes);
Routes.use("/", UserRoutes);

/* PING CHECK */
/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Respond with "pong"
 *     description: A simple endpoint that responds with "pong".
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: pong
 */
Routes.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

/* SWAGGER */
Routes.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/*  NOT FOUND */
Routes.get("*", (req, res) => res.status(404).json({ message: "Not Found~" }));

export { Routes };
