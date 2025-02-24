import { Transaction } from "../models/transaction.model.js";

// Create a New Transaction
export const createTransaction = async (req, res) => {
  try {
    const { accountId, businessId, assetId, amount, type, category, description } = req.body;

    // Validate that at least one of accountId, businessId, or assetId is provided
    if (!accountId && !businessId && !assetId) {
      return res.status(400).json({ message: "Transaction must be linked to a bank account, business, or asset" });
    }

    const newTransaction = new Transaction({
      userId: req.user.id,
      accountId,
      businessId,
      assetId,
      amount,
      type,
      category,
      description,
    });

    await newTransaction.save();

    res.status(201).json({
      message: "Transaction recorded successfully",
      transaction: newTransaction,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating transaction", error });
  }
};

// Get All Transactions for a User
export const getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });

    res.status(200).json({
      message: "Transactions fetched successfully",
      transactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

// Get a Single Transaction
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction fetched successfully",
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching transaction", error });
  }
};

// Update a Transaction
export const updateTransaction = async (req, res) => {
  try {
    const { amount, type, category, description } = req.body;
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this transaction" });
    }

    transaction.amount = amount || transaction.amount;
    transaction.type = type || transaction.type;
    transaction.category = category || transaction.category;
    transaction.description = description || transaction.description;

    await transaction.save();

    res.status(200).json({
      message: "Transaction updated successfully",
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating transaction", error });
  }
};

// Delete a Transaction
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this transaction" });
    }

    await Transaction.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction", error });
  }
};
