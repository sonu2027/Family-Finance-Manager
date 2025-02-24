import express from "express";
import { sendEmailVerificationOTP } from "../controllers/email.controller.js";

const router = express.Router();

router.post("/sendemailverificationotp", sendEmailVerificationOTP);

export default router;