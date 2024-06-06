import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller";

export const AuthRoutes = Router();

/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: User sign-up
 *     description: Endpoint for user registration.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 required:
 *                   - email
 *                   - firstName
 *                   - lastName
 *                   - companyName
 *                   - password
 *                 properties:
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: user@example.com
 *                   firstName:
 *                     type: string
 *                     maxLength: 120
 *                     example: John
 *                   lastName:
 *                     type: string
 *                     maxLength: 120
 *                     example: Doe
 *                   companyName:
 *                     type: string
 *                     maxLength: 120
 *                     example: Example Corp
 *                   jobTitle:
 *                     type: string
 *                     maxLength: 120
 *                     example: Developer
 *                   password:
 *                     type: string
 *                     minLength: 8
 *                     example: password123
 *     responses:
 *       201:
 *         description: Successfully created user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: user@example.com
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                     companyName:
 *                       type: string
 *                       example: Example Corp
 *                     jobTitle:
 *                       type: string
 *                       example: Developer
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bad Request
 */
AuthRoutes.post("/auth/sign-up", signUp);

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: User sign-in
 *     description: Endpoint for user authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: user@example.com
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                     companyName:
 *                       type: string
 *                       example: Example Corp
 *                     jobTitle:
 *                       type: string
 *                       example: Developer
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bad Request
 */
AuthRoutes.post("/auth/sign-in", signIn);
