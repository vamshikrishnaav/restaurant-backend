import jwt from "jsonwebtoken";

export const adminAuthentication = async (req, res, next) => {
  const token = req.cookies.token;

  console.log(req.cookies);

  if (!token) {
    return res
      .status(400)
      .json({ msg: "User is not LoggedIn", success: "False" });
  }

  const verifyToken = jwt.verify(token, process.env.jwt_secret);
  if (!verifyToken) {
    return res
      .status(400)
      .json({ msg: "User is not Authenticated", success: "False" });
  }

  const decode = jwt.decode(token);

  next();
};

export const userAuthentication = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(400)
      .json({ msg: "User is not LoggedIn", success: "False" });
  }

  const verifyToken = jwt.verify(token, process.env.jwt_secret);
  if (!verifyToken) {
    return res
      .status(400)
      .json({ msg: "User is not Autheticated", success: "False" });
  }
  next();
};

export const validate = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(404).json({ msg: "unauthorized" });
  console.log(token);
  try {
    const decode = jwt.decode(token, process.env.jwt_secret);
    req.user = decode;

    console.log(req.user);
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
