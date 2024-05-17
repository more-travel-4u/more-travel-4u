import express from 'express';

const router = express.Router();

// GET /api/memo
router.get("/", (_, res) => res.send({ message: "Testing /api/memo"}))

export default router;