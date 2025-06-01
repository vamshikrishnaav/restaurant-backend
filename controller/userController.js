import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, number, password, address } = req.body;

    if (!name || !number || !password) {
      return res
        .status(400)
        .json({ msg: "All fields are necessary!", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      number,
      password: hashedPassword,
      address,
    });
    if (!user) {
      return res.status(400).json({ msg: "User not created", success: false });
    }
    return res.status(201).json({ msg: "user created!", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  console.log(req.body);
  const { number, password } = req.body;
  if (!number || !password) {
    return res
      .status(400)
      .json({ msg: "All fields are required,to login", success: false });
  }

  const user = await User.findOne({ number });

  const verifyPassword = await bcrypt.compare(password, user.password);
  if (!verifyPassword) {
    return res
      .status(400)
      .json({ msg: "Invalid Password, try again", success: false });
  }

  const jwtToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.jwt_secret
  );
  res.cookie("token", jwtToken, {
    sameSite: "none", // or "none" if using HTTPS + cross-origin
    secure: true,
  });

  return res
    .status(200)
    .json({ msg: "User logged in", token: jwtToken, success: true });
};

export const totalUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({ msg: "All good", count: users.length });
};

export const signOut = async (req, res) => {
  console.log("hello");
  res.clearCookie("token", {
    sameSite: "none",
    secure: true,
  });

  return res.status(200).json({ msg: "User logged out" });
};

export const getUser = async (req, res) => {
  const user = await User.find();

  return res.status(200).json({ msg: "All good", user: user });
};
