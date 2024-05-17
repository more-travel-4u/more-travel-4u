import express from "express";
import prisma from "./../db/prisma.js";
import { findActiveTrip } from "./memo.js";

const router = express.Router();

export default router;