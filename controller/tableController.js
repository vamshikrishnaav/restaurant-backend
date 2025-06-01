import Table from "../model/table.js";
import User from "../model/user.js";
import jwt from "jsonwebtoken";

export const createTable = async (req, res) => {
  try {
    const token = req.cookies.token;
    const userId = await jwt.decode(token).userId;
    const user = await User.findById(userId);
    if (user && user.role !== "admin") {
      return res
        .status(400)
        .json({ msg: "Not permitted to perform this action" });
    }

    const { seats, tableNumber } = req.body;

    if (!seats || !tableNumber) {
      return res.status(400).json({ msg: "Seats fiels is required!" });
    }

    const table = await Table.create({
      tableNumber,
      seats,
    });

    if (!table) {
      return res.status(400).json({ msg: "Table not created!" });
    }

    return res.status(201).json({ msg: "table created successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const bookTable = async (req, res) => {
  const userToken = req.cookies.token;
  const userId = await jwt.decode(userToken).userId;
  const user = await User.findById(userId);
  const { tableNumber } = req.body;
  console.log(tableNumber);
  const table = await Table.findOne({ tableNumber });
  console.log(table);
  if (!user) {
    return res.status(400).json({
      msg: "user doesnot logged in or doesnot exists",
      success: false,
    });
  }

  if (!table) {
    return res
      .status(400)
      .json({ msg: "table you are trying doesnt exists", success: false });
  }

  if (table.availabilityStatus !== "available") {
    return res.status(400).json({ msg: "Table is booked", success: false });
  }

  await Table.findByIdAndUpdate(table._id, {
    availabilityStatus: "booked",
    user: user._id,
    bookedDate: new Date(),
  });
  await User.findByIdAndUpdate(user._id, {
    tableId: table._id,
  });

  return res.status(201).json({ msg: "Table booked successfully" });
};

export const updateTableinfo = async (req, res) => {
  const { seats, tableNumber } = req.body;

  if (!seats || !tableNumber) {
    return res.status(400).json({ msg: "seats or table number is missing" });
  }

  const table = await Table.findOne({ tableNumber });
  if (!table) {
    return res.status(400).json({ msg: "Table doesnot exsists" });
  }

  const updatedSeats = await Table.updateOne({
    seats: seats,
  });

  if (!updatedSeats) {
    return res.status(400).json({ msg: "Updating failed" });
  }

  return res.status(201).json({ msg: "Table content updated successfully" });
};

export const deleteTable = async (req, res) => {
  const { tableNumber } = req.body;
  const table = await Table.findOne({ tableNumber });
  if (!table) {
    return res.status(400).json({ msg: "table doesnot exsist" });
  }

  const deletetable = await Table.deleteOne(table);

  if (!deletetable) {
    return res.status(400).json({ msg: "Table deletion failed" });
  }

  return res.status(200).json({ msg: "table deleted successfully" });
};

export const getTotalTable = async (req, res) => {
  const table = await Table.find();

  const tableSummary = [];

  table.map((item) => {
    tableSummary.push({
      tableNumber: item.tableNumber,
      tableStatus: item.availabilityStatus,
    });
  });

  return res
    .status(200)
    .json({ msg: "Total Table", tableSummary: tableSummary });
};
