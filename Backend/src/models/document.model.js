import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ["Tax", "Insurance", "Legal", "Other"], required: true },
  fileUrl: { type: String, required: true },
  expiryDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const Document = mongoose.model("Document", documentSchema);
