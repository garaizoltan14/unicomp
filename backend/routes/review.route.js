/**
 * @swagger
 * components:
 *   schemas:
 *     Reviews:
 *       type: object
 *       required:
 *         - rating
 *         - text
 *       properties:
 *         _id:
 *           type: string
 *           description: Automatikusan generált egyedi azonosító
 *         owner:
 *           type: string
 *           description: A könyv szerzőjének azonosítója
 *         book:
 *           type: string
 *           description: Az értékelés tárgyát képező könyv azonosítója
 *         rating:
 *           type: number
 *           description: Számszerű értékelés (legalább 1, legfeljebb 5)
 *         text:
 *           type: string
 *           description: Szöveges értékelés (legalább 30 karakter hosszú)
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
  deleteReview,
  updateReview,
} from "../controllers/review.controller.js";
import { isReviewIdValid, loginRequired } from "../functions/middleware.js";

const reviewRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Az értékelések kezelésére szolgáló végpontok
 * /reviews/{id}:
 *   patch:
 *     security:
 *      - bearerAuth: []
 *     summary: Módosítja a megadott azonosító alapján kiválasztott értékelés adatait. Az értékeléshez tartozó könyv átlagos értékelés automatikusan frissül.
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Az értékelés azonosítója
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: A módosított értékelés az új adatokkal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: A megadott azonosító nem megfelelő
 *       401:
 *         description: Nem azonosított felhasználó
 *       403:
 *         description: Nem jogosult felhasználó (értékelés írója)
 *       500:
 *         description: Szerverhiba
 */
reviewRouter.patch("/:id", [loginRequired, isReviewIdValid], updateReview);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     summary: A megadott azonosító alapján törli a kiválasztott értékelést. Az értékeléshez tartozó könyv átlagos értékelés automatikusan frissül.
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Az értékelés azonosítója
 *     responses:
 *       200:
 *         description: Az értékelés törlésre került.
 *       401:
 *         description: Nem azonosított felhasználó
 *       403:
 *         description: Nem jogosult felhasználó (értékelés írója)
 *       500:
 *         description: Szerverhiba
 */
reviewRouter.delete("/:id", [loginRequired, isReviewIdValid], deleteReview);

export default reviewRouter;
