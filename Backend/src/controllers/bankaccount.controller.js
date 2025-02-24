import { BankAccount } from "../models/bankaccount.model.js";

// Create a Bank Account
export const createBankAccount = async (req, res) => {
  try {
    const { bankName, accountNumber, accountType, balance } = req.body;

    const existingAccount = await BankAccount.findOne({ accountNumber });
    if (existingAccount) {
      return res.status(400).json({ message: "Account number already exists" });
    }

    const newBankAccount = new BankAccount({
      userId: req.user.id,
      bankName,
      accountNumber,
      accountType,
      balance,
    });

    await newBankAccount.save();

    res.status(201).json({
      message: "Bank account created successfully",
      bankAccount: newBankAccount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating bank account", error });
  }
};

// Get All Bank Accounts for a User
export const getUserBankAccounts = async (req, res) => {
  try {
    const bankAccounts = await BankAccount.find({ userId: req.user.id });

    res.status(200).json({
      message: "Bank accounts fetched successfully",
      bankAccounts,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching bank accounts", error });
  }
};

// Get a Single Bank Account by ID
export const getBankAccountById = async (req, res) => {
  try {
    const bankAccount = await BankAccount.findById(req.params.id);

    if (!bankAccount) {
      return res.status(404).json({ message: "Bank account not found" });
    }

    res.status(200).json({ bankAccount });
  } catch (error) {
    res.status(500).json({ message: "Error fetching bank account", error });
  }
};

// Update Bank Account Details
export const updateBankAccount = async (req, res) => {
  try {
    const bankAccount = await BankAccount.findById(req.params.id);

    if (!bankAccount) {
      return res.status(404).json({ message: "Bank account not found" });
    }

    Object.assign(bankAccount, req.body);
    await bankAccount.save();

    res
      .status(200)
      .json({ message: "Bank account updated successfully", bankAccount });
  } catch (error) {
    res.status(500).json({ message: "Error updating bank account", error });
  }
};

// Delete a Bank Account
export const deleteBankAccount = async (req, res) => {
  try {
    const bankAccount = await BankAccount.findById(req.params.id);

    if (!bankAccount) {
      return res.status(404).json({ message: "Bank account not found" });
    }

    await BankAccount.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Bank account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bank account", error });
  }
};
