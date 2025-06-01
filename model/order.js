import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
    },

    tableNumber: {
      type: Number,
      required: true,
    },

    orderItem: {
      Capricciosa: {
        price: {
          type: Number,
        },
        quantity: {
          type: Number,
        },
      },
      Sicilian: {
        price: {
          type: Number,
        },
        quantity: {
          type: Number,
        },
      },
      Marinara: {
        price: {
          type: Number,
        },

        quantity: {
          type: Number,
        },
      },

      Pepperoni: {
        price: {
          type: Number,
        },
        quantity: {
          type: Number,
        },
      },
      chicken: {
        price: {
          type: Number,
        },
        quantity: {
          type: Number,
        },
      },
    },

    orderType: {
      type: String,
      enum: ["dineIn", "served", "takeAway"],
      default: "dineIn",
    },
    orderStatus: {
      type: String,
      enum: ["processing", "done", "Not-Picked"],
      default: "processing",
    },
    cookingInstructions: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
