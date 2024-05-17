import express from 'express';
import prisma from './../db/prisma.js';

const router = express.Router();

// for when loading all memos of an active trip to a user's mobile app
// GET /api/memo
router.get("/", async (req, res) => {
  try {
    const tripsId = await findActiveTrip(req.user.id);
    const memos = await prisma.memos.findMany({
      where: {
        tripsId
      }
    })
    res.status(200).send({ memos });
  } catch (error) {
    res.status(400).send({ message: "Error getting memos; please try again later." })
  }
})

// for a user posting a new memo for the active trip
// expected req.body: { content }
// POST /api/memo
router.post("/", async (req, res) => {
  try {
    const currTimeDate = new Date().toISOString();
    const usersId = req.user.id * 1
    const tripsId = await findActiveTrip(usersId);
    const memo = await prisma.memos.create({
      data: {
        usersId,
        tripsId,
        content: req.body.content,
        date: currTimeDate,
        time: currTimeDate,
      }
    })
    res.status(201).send({ memo });
  } catch (error) {
    res.status(400).send({ message: "Error in creating new memo; please try again later." })
  }
})

// for a user editing their own existing memo for the active trip
// expected req.body: { content }
// expected req.params: { memoId } (of the memo being updated)
// PUT /api/memo/:memoId
router.put("/:memoId", async (req, res) => {
  try {
    const memo = await prisma.memos.update({
      where: {
        id: req.params.memoId * 1,
        usersId: req.user.id * 1
      },
      data: {
        content: req.body.content
      }
    })
    res.status(201).send({ memo })
  } catch (error) {
    res.status(400).send({ message: "Error in editing memo; please try again later." })
  }
})

// for a user deleting their own existing memo for the active trip
// expected req.params: { memoId } (of the memo being updated)
// DELETE /api/memo/:memoId
router.delete("/:memoId", async (req, res) => {
  try {
    const memo = await prisma.memos.delete({
      where: {
        id: req.params.memoId * 1,
        usersId: req.user.id * 1
      }
    })
    res.status(200).send({ memo })
  } catch (error) {
    res.status(400).send({ message: "Error in deleting memo; please try again later." })
  }
})

// util function for getting active trip for a user
const findActiveTrip = async (usersId) => {
  try {
    const { tripsId } = await prisma.users_Trips.findFirst({
      where: {
        usersId,
        is_active: true
      },
      select: {
        tripsId: true
      }
    })
    return tripsId;
  } catch (error) {
    throw (error)
  }
}

export { findActiveTrip }

export default router;