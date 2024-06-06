import { Router } from "express";
import { findAllUsers, removeUser, signOut } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

export const UserRoutes = Router();

//In the code challenge doc, there is a sentence saying to use only POST, but I think DELETE and GET are the best methods to handle this

/**
 * @swagger
 * /user/findAll:
 *   get:
 *     summary: Find all users
 *     description: Retrieve a list of users with optional filtering and pagination.
 *     parameters:
 *       - in: query
 *         name: jobTitle
 *         schema:
 *           type: string
 *         description: Optional job title to filter users.
 *       - in: query
 *         name: companyName
 *         schema:
 *           type: string
 *         description: Optional company name to filter users.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Optional limit for the number of users per page (default 10, maximum 100).
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Optional page number for pagination.
 *     responses:
 *       200:
 *         description: Successfully retrieved list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: user1@example.com
 *                   firstName:
 *                     type: string
 *                     example: John
 *                   lastName:
 *                     type: string
 *                     example: Doe
 *                   companyName:
 *                     type: string
 *                     example: Example Corp
 *                   jobTitle:
 *                     type: string
 *                     example: Developer
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 */
UserRoutes.get("/user/findAll", authenticate(), findAllUsers);

/**
 * @swagger
 * /user/sign-out:
 *   post:
 *     summary: User sign-out
 *     description: Endpoint for user sign-out.
 *     responses:
 *       200:
 *         description: Successfully signed out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: signed out
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 */
UserRoutes.post("/user/sign-out", authenticate(), signOut);

/**
 * @swagger
 * /user/{userId}/remove:
 *   delete:
 *     summary: Remove user
 *     description: Remove a user by ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: "6661d3c357ff55d591ba2220"
 *         description: ID of the user to remove.
 *     responses:
 *       200:
 *         description: Successfully removed user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User successfully removed
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 */
UserRoutes.delete("/user/:userId/remove", authenticate(), removeUser);
