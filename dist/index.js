import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { publicRouter } from "./routes/public.js";
import { adminRouter } from "./routes/admin.js";
import { sadminRouter } from "./routes/Sasmin.js";
dotenv.config();
var app = express();
mongoose
    .connect("mongodb+srv://Bhavya_09:UsFRHsiMSTJsjuKD@cluster0.kwywqqu.mongodb.net/")
    .then(function () {
    console.log("Connected successfully");
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(publicRouter);
    app.use('/sadmin', sadminRouter);
    app.use('/admin', adminRouter);
    app.listen(3000);
})
    .catch(function () {
    console.log("Failed to connect DB");
});
