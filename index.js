import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import tableRouter from "./routes/tableRoutes.js";
import cors from "cors";
import orderRouter from "./routes/orderRoutes.js";

const app = express();
dotenv.config();
app.use(cookieParser());
app.use(express.json());

dbConnect();
console.log(process.env.FRONTEND_WEB_URL);
app.use(
  cors({
    origin: [process.env.FRONTEND_WEB_URL, process.env.FRONTEND_MOBILE_URL],
    credentials: true,
    methods: ["POST", "GET", "DELETE", "PATCH"],
  })
);
app.use(cookieParser());
app.use(express.json());

dbConnect();

const port = process.env.PORT || 4000;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/table", tableRouter);
app.use("/api/v1/order", orderRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
