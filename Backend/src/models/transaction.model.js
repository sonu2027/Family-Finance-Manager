import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: "BankAccount" },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  assetId: { type: mongoose.Schema.Types.ObjectId, ref: "Asset" },
  date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["Income", "Expense"], required: true },
  category: { type: String, required: true },
  description: { type: String },
});

export const Transaction = mongoose.model("Transaction", transactionSchema);
