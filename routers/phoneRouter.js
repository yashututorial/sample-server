import express from "express";
import { phoneResult } from "../controller/phoneController.js";
const phoneRouter = express.Router();

// Get Method

// Post Method
phoneRouter.post("/result", phoneResult)
// Put Method


// Delete Method

export default phoneRouter;




