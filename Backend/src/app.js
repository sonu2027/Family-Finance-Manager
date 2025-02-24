import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

import userRouter from "./routes/user.route.js";
import assetRouter from "./routes/asset.route.js";
import bankAccountRouter from "./routes/bankaccount.route.js";
import businessRouter from "./routes/business.route.js";
import documentRouter from "./routes/document.route.js";
import notificationRouter from "./routes/notification.route.js";
import transactionRouter from "./routes/transaction.route.js";

app.use("/api/user", userRouter);
app.use("/api/assets", assetRouter);
app.use("/api/bankaccount", bankAccountRouter);
app.use("/api/business", businessRouter);
app.use("/api/document", documentRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/transaction", transactionRouter);


export default app;