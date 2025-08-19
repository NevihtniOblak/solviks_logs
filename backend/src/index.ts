import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/db";
import errorHandler from "./middleware/errorHandler";
import authenticate from "./middleware/authenticate";

import { APP_ORIGIN, PORT } from "./constants/env";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import projectRoutes from "./routes/projectRoutes";
import logRoutes from "./routes/logRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: `${APP_ORIGIN}`, credentials: true }));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/user", authenticate, userRoutes);
app.use("/project", authenticate, projectRoutes);
app.use("/log", logRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    connectToDatabase();
});
