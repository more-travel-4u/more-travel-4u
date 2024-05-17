import express from "express";
import memoRouter from "./memo.js";
import eventRouter from "./event.js";
import tripRouter from "./trip.js";

const router = express.Router();

// auth check beyond this point
router.use((req, res, next) => {
  if (req.user) next();
  else res.status(401).send({ message: "Not Authorized"});
})

// /api/memo
router.use("/memo", memoRouter);

// /api/trip
router.use("/trip", tripRouter);

// /api/event
router.use("/event", eventRouter);

export default router;

