import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ["Retail", "Tech", "Service", "Other"] },
  revenue: { type: Number, default: 0 },
  expenses: { type: Number, default: 0 },
  profit: { 
    type: Number, 
    default: function () { return this.revenue - this.expenses; } 
  },
  createdAt: { type: Date, default: Date.now },
});

export const Business = mongoose.model("Business", businessSchema);
