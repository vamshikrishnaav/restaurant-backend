import express from "express";
import {
  loginUser,
  registerUser,
  signOut,
  totalUsers,
} from "../controller/userController.js";
import { adminAuthentication, validate } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter
  .post("/sign-up", registerUser)
  .post("/sign-in", loginUser)
  .get("/totalUsers", adminAuthentication, totalUsers)
  .post("/sign-out", signOut)
  .get("/validate", validate, (req, res) => {
    return res.status(200).json({ role: req.user.role });
  });

export default userRouter;
