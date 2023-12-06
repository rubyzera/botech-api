import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { mongoose } from "mongoose";
import mongoConnect from "./mongoose-connector.js";

import { AuthMiddleware } from "./src/middlewares/auth-middleware.js";
import { HandleHttpError } from "./src/middlewares/handle-http-error.js";

import {
  UserCreate,
  UserLogin,
  UserGetAll,
  UserTokenVerify,
} from "./src/controllers/users.controller.js";
import { CommanGetAll, CommandCreate, CommandFinish } from "./src/controllers/commands.controller.js";
import { StorageItemQuantity, StorageCreate, StorageItemDelete, StorageGetAll } from "./src/controllers/storage.controller.js";

const App = express();

App.use(express.json());
App.use(
  cors({
    origin: "http://localhost:5173",
  })
);
App.use(HandleHttpError);
App.use(AuthMiddleware);

App.get("/", (req, res) => {
  res.status(200).send("Index");
});

App.post("/login", UserLogin);

App.post("/verifyJwt", UserTokenVerify);

App.get("/users", UserGetAll);

App.post("/users", UserCreate);

App.get("/commands", CommanGetAll);

App.post("/commands", CommandCreate);

App.post("/commands/:idCommand", CommandFinish);

App.get("/storage", StorageGetAll);

App.post("/storage", StorageCreate);

App.post("/storage/:idItem", StorageItemQuantity);

App.delete("/storage/:idItem", StorageItemDelete);

dotenv.config();
const { HTTP_PORT, MONGO_URI } = process.env;

mongoose.set("strictQuery", true);
mongoConnect(MONGO_URI);

App.listen(HTTP_PORT, () => {
  console.log(`conectado porta: ${HTTP_PORT}`);
});
