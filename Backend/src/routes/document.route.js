import express from "express";
import {
  createDocument,
  getUserDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../controllers/document.controller.js";
import {verifyToken} from "../middlewares/verifyToken.middleware.js"

const router = express.Router();

router.post("/createdocument", verifyToken, createDocument);
router.get("/getUserdocument", verifyToken, getUserDocuments);
router.get("/getdocumentbyid/:id", verifyToken, getDocumentById);
router.put("/updatedocument/:id", verifyToken, updateDocument);
router.delete("/deletedocument/:id", verifyToken, deleteDocument);

export default router;
