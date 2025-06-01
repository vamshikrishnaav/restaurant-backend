import express from "express";
import {
  bookTable,
  createTable,
  getTotalTable,
} from "../controller/tableController.js";
import {
  adminAuthentication,
  userAuthentication,
} from "../middlewares/auth.js";

const tableRouter = express.Router();

tableRouter
  .post("/create-table", adminAuthentication, createTable)
  .post("/book-table", adminAuthentication, bookTable)
  .get("/table-summary", getTotalTable);

export default tableRouter;
