import express from "express";
import {verifyToken} from "../middlewares/verifyToken.middleware.js";
import {
  getUser,
  updateUser,
  changePassword,
  deleteUser,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/loginuser", loginUser);
router.get("/registeruser", registerUser);
router.get("/getuser", verifyToken, getUser);
router.put("/updateuser", verifyToken, updateUser);
router.put("/changepassword", verifyToken, changePassword);
router.delete("/deleteuser", verifyToken, deleteUser);

export default router;
