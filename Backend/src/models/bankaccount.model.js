import mongoose from "mongoose";

const bankAccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  accountType: {
    type: String,
    required: true,
    enum: ["Checking", "Savings", "Business"],
  },
  balance: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const BankAccount = mongoose.model("BankAccount", bankAccountSchema);
