import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";

import userController from "./controller/userController";

dotenv.config();

const app = express();

createConnection()
  .then(async () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true, limit: "50mb" }));
    app.use(cors());

    app.use("/", userController);

    const port = process.env.PORT || 5000;

    app.listen(port, () => console.log(`Server listening on Port ${port}`));
  })
  .catch((error) => console.log(error));
