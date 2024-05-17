import express from "express";
import memoRouter from "./memo.js";

const router = express.Router();

// auth check beyond this point
router.use((req, res, next) => {
  if (req.user) next();
  else res.status(401).send({ message: "Not Authorized"});
})

// /api/memo
router.use("/memo", memoRouter);

export default router;

