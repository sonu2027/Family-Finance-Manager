import express from "express";
import {
  createBankAccount,
  getUserBankAccounts,
  getBankAccountById,
  updateBankAccount,
  deleteBankAccount,
} from "../controllers/bankaccount.controller.js";
import {verifyToken} from "../middlewares/verifyToken.middleware.js"

const router = express.Router();

router.post("/createbankaccount", verifyToken, createBankAccount);
router.get("/getuserbankaccount", verifyToken, getUserBankAccounts);
router.get("/getbankaccountbyid/:id", verifyToken, getBankAccountById);
router.put("/updatebankaccount/:id", verifyToken, updateBankAccount);
router.delete("/deletebankaccount/:id", verifyToken, deleteBankAccount);

export default router;
