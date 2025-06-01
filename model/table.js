import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
  },
  seats: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  availabilityStatus: {
    type: String,
    enum: ["available", "booked"],
    default: "available",
  },
  bookedDate: {
    type: Date,
  },
});

export default mongoose.model("Table", tableSchema);
