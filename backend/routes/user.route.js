/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - password
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: Automatikusan generált egyedi azonosító
 *         name:
 *           type: string
 *           description: A felhasználó neve
 *         password:
 *           type: string
 *           description: A felhasználó jelszava
 *         email:
 *           type: string
 *           description: A felhasználó email címe
 *         bio:
 *           type: string
 *           description: A felhasználó profil adatai
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Az értékelés hozzáadásának időbélyege
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: Az értékelés utolsó módosításának időbélyege
 *
 */

import express from "express";
import {
  createUser,
  getUser,
  loginUser,
} from "../controllers/user.controller.js";
import {
  isUserUnique,
  isUserValid,
  loginRequired,
} from "../functions/middleware.js";

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: A felhasználók kezelésére szolgáló végpontok
 * /users:
 *   post:
 *     summary: Létrehoz egy új felhasználót a megadott adatokkal.
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: A létrehozott felhasználó
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: A megadott adatok hiányosak vagy nem megfelelőek
 *       500:
 *         description: Szerverhiba
 */
userRouter.post("/", [isUserValid, isUserUnique], createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: A felhasználót a megadott adatokkal belépteti a rendszerbe.
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Sikeres belépés, JWT token küldése
 *       401:
 *         description: A megadott adatok nem megfelelőek
 *       500:
 *         description: Szerverhiba
 */
userRouter.post("/login", loginUser);

/**
 * @swagger
 * /users/me:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Visszadja a bejelentkezett felhasználó saját adatait
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A bejelentkezett felhasználó adatai
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Nem azonosított felhasználó
 *       500:
 *         description: Szerverhiba
 */
userRouter.get("/me", loginRequired, getUser);

export default userRouter;
