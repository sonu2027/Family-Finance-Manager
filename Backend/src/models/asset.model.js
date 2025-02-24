import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["Real Estate", "Stock", "Vehicle", "Other"],
  },
  value: { type: Number, required: true },
  purchaseDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Asset = mongoose.model("Asset", assetSchema);
