import express from "express";
import {
  createBusiness,
  getUserBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
} from "../controllers/business.controller.js";
import {verifyToken} from "../middlewares/verifyToken.middleware.js";

const router = express.Router();

router.post("/createbusiness", verifyToken, createBusiness);
router.get("/getuserbusiness", verifyToken, getUserBusinesses);
router.get("/getbusinessbyid/:id", verifyToken, getBusinessById);
router.put("/updatebusiness/:id", verifyToken, updateBusiness);
router.delete("/deletebusiness/:id", verifyToken, deleteBusiness);

export default router;
