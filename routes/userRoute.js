import express from "express";
import {
  loginUser,
  registerUser,
  signOut,
  totalUsers,
} from "../controller/userController.js";
import { adminAuthentication } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter
  .post("/sign-up", registerUser)
  .post("/sign-in", loginUser)
  .get("/totalUsers", adminAuthentication, totalUsers)
  .post("/sign-out", signOut);

export default userRouter;
