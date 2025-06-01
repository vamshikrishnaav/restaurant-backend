import express from "express";
import {
  createOrder,
  orderSummary,
  orderTypeDetails,
  totalOrder,
  totalRevenue,
  weekDayRevenue,
} from "../controller/orderController.js";
import { adminAuthentication } from "../middlewares/auth.js";

const orderRouter = express.Router();

orderRouter
  .post("/create-order", createOrder)
  .get("/total-order", adminAuthentication, totalOrder)
  .get("/total-revenue", totalRevenue)
  .get("/order-data", orderTypeDetails)
  .get("/revenue-week", weekDayRevenue)
  .get("/order-summary", orderSummary);

export default orderRouter;
