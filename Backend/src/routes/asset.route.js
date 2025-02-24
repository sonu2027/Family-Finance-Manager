import express from "express";
import {
  createAsset,
  getUserAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
} from "../controllers/asset.controller.js";
import {verifyToken} from "../middlewares/verifyToken.middleware.js"

const router = express.Router();

router.post("/createasset", verifyToken, createAsset);
router.get("/getasset", verifyToken, getUserAssets);
router.get("/getassetbyid/:id", verifyToken, getAssetById);
router.put("/updateasset/:id", verifyToken, updateAsset);
router.delete("/deleteasset/:id", verifyToken, deleteAsset);

export default router;
