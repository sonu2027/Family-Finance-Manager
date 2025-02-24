import { Document } from "../models/document.model.js";

// Create a Document
export const createDocument = async (req, res) => {
  try {
    const { title, type, fileUrl, expiryDate } = req.body;

    const newDocument = new Document({
      userId: req.user.id,
      title,
      type,
      fileUrl,
      expiryDate,
    });

    await newDocument.save();

    res.status(201).json({
      message: "Document uploaded successfully",
      document: newDocument,
    });
  } catch (error) {
    res.status(500).json({ message: "Error uploading document", error });
  }
};

// Get All Documents for a User
export const getUserDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.user.id });

    res.status(200).json({
      message: "Documents fetched successfully",
      documents,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching documents", error });
  }
};

// Get a Single Document by ID
export const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json({ document });
  } catch (error) {
    res.status(500).json({ message: "Error fetching document", error });
  }
};

// Update Document Details
export const updateDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Update fields dynamically
    Object.assign(document, req.body);

    await document.save();

    res.status(200).json({ message: "Document updated successfully", document });
  } catch (error) {
    res.status(500).json({ message: "Error updating document", error });
  }
};

// Delete a Document
export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    await Document.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting document", error });
  }
};
