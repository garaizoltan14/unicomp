/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - author
 *         - title
 *         - description
 *       properties:
 *         _id:
 *           type: string
 *           description: Automatikusan generált egyedi azonosító
 *         author:
 *           type: string
 *           description: A könyv szerzője
 *         title:
 *           type: string
 *           description: A könyv címe
 *         description:
 *           type: string
 *           description: A könyv rövid leírása / ismertetője
 *         publisher:
 *           type: string
 *           description: A könyv kiadója
 *         rating_avg:
 *           type: number
 *           description: A könyv átlagos értékelése (automatikusan generált)
 *         price:
 *           type: number
 *           description: A könyv ára
 *         reviews:
 *           type: array
 *           description: A könyvhoz tartozó értékelések azonosítóinak listája (automatikusan generált)
 *         createdAt:
 *           type: string
 *           format: date
 *           description: A könyv hozzáadásának időbélyege
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: A könyv utolsó módosításának időbélyege
 *
 */

import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from "../controllers/book.controller.js";
import {
  createReview,
  getAllReview,
} from "../controllers/review.controller.js";
import {
  isBookIdValid,
  isBookValid,
  isReviewValid,
  loginRequired,
} from "../functions/middleware.js";

const bookRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: A könyvek kezelésére szolgáló végpontok
 * /books:
 *   post:
 *     summary: Létrehoz egy új könyvet a megadott adatokkal.
 *     tags: [Books]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: A létrehozott könyv
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: A megadott adatok hiányosak vagy nem megfelelőek
 *       500:
 *         description: Szerverhiba
 */
bookRouter.post("/", isBookValid, createBook);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Visszaadja az összes nyilvántartott könyvet
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A nyilvántartott könyvek listája
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Szerverhiba
 */
bookRouter.get("/", getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Visszadja egy adott könyv adatait a megadott azonosító alapján
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: A könyv azonosítója
 *     responses:
 *       200:
 *         description: A megadott azonosítójú könyv
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: A megadott azonosító nem megfelelő
 *       500:
 *         description: Szerverhiba
 */
bookRouter.get("/:id", isBookIdValid, getBook);

/**
 * @swagger
 * /books/{id}:
 *   patch:
 *     summary: Módosítja a megadott azonosító alapján kiválasztott könyv adatait.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: A könyv azonosítója
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: A módosított könyv az új adatokkal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: A megadott azonosító nem megfelelő
 *       500:
 *         description: Szerverhiba
 */
bookRouter.patch("/:id", [isBookIdValid, isBookValid], updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: A megadott azonosító alapján törli a kiválasztott könyvet
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: A könyv azonosítója
 *     responses:
 *       200:
 *         description: A könyv törlésre került.
 *       400:
 *         description: A megadott azonosító nem megfelelő
 *       500:
 *         description: Szerverhiba
 */
bookRouter.delete("/:id", isBookIdValid, deleteBook);

/**
 * @swagger
 * /books/{id}/review:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Az azonosító alapján kiválasztott könyvhöz létrehoz egy új értékelést. Az értékeléshez tartozó könyv átlagos értékelés automatikusan frissül.
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: A könyv azonosítója
 *     responses:
 *       200:
 *         description: A létrehozott értékelés.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: A megadott adatok hiányosak vagy nem megfelelőek
 *       401:
 *         description: Nem azonosított felhasználó
 *       500:
 *         description: Szerverhiba
 */
bookRouter.post(
  "/:bookId/reviews",
  [loginRequired, isBookIdValid, isReviewValid],
  createReview
);

/**
 * @swagger
 * /books/{id}/review:
 *   get:
 *     summary: Visszaadja a kiválasztott könyvhöz tartozó értékeléseket
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: A választott könyvhöz tartozó értékelések listája
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       400:
 *         description: A megadott azonosító nem megfelelő
 *       500:
 *         description: Szerverhiba
 */
bookRouter.get("/:bookId/reviews", isBookIdValid, getAllReview);

export default bookRouter;
