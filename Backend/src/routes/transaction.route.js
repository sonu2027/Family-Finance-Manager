import express from "express";
import {
  createTransaction,
  getUserTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller.js";
import {verifyToken} from "../middlewares/verifyToken.middleware.js"

const router = express.Router();

router.post("/createtransaction", verifyToken, createTransaction);
router.get("/getUsertransactions", verifyToken, getUserTransactions);
router.get("/gettransactionbyid/:id", verifyToken, getTransactionById);
router.put("/updatetransaction/:id", verifyToken, updateTransaction);
router.delete("/deletetransaction/:id", verifyToken, deleteTransaction);

export default router;
