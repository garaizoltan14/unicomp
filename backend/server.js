import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.route.js";
import bookRouter from "./routes/book.route.js";
import reviewRouter from "./routes/review.route.js";
import jsonwebtoken from "jsonwebtoken";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use((req, res, next) => {
  if (req.headers && req.headers.authorization) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "UNICOMP",
      function (err, decode) {
        if (err) {
          req.user = undefined;
        }
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
app.use("/api/reviews", reviewRouter);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "UNICOMP Felvételi feladat API Dokumentáció",
      version: "1.0.0",
      description:
        "Az alábbi dokumentáció bemutatja az elkészült UNICOMP Felvételi feladat API végpointjait, illetve az ezek használatához szükséges paramétereket és egyéb információkat. A dokumentáció a Swagger eszközzel készült.",
    },
    servers: [
      {
        url: "http://localhost:5000/",
      },
    ],
    basePath: "/",
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "backend/routes/book.route.js",
    "backend/routes/review.route.js",
    "backend/routes/user.route.js",
  ],
};

const swaggerDoc = swaggerJsdoc(options);

app.use(
  "/api-docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDoc)
);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http_//localhost:5000");
});
