import express from "express";
import mongoose from "mongoose";
import connectToDatabase from "./config/db";

const app = express();

app.listen(3000, () => {
    console.log("Server is running on port 3000");

    connectToDatabase();
});
