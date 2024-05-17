import express from "express";
import prisma from "./../db/prisma.js";
import { findActiveTrip } from "./memo.js";

const router = express.Router();

/**
 * for when loading the details of an active trip, along with their events, memos, and associated users
 * i'm thinking this would be used upon the app loading up, or upon log in
 * GET /api/trip
 */
router.get("/", async (req, res) => {
  try {
    const id = await findActiveTrip(req.user.id);
    const trip = await prisma.trips.findFirst({
      where: {
        id
      },
      include: {
        users_trips: {
          select: {
            users: {
              select: {
                id: true,
                username: true
              }
            }
          }
        },
        events: {
          select: {
            id: true,
            name: true,
            description: true,
            date: true,
            start_time: true,
            end_time: true,
            location: true,
            users: {
              select: {
                id: true,
                username: true
              }
            }
          }
        },
        memos: {
          select: {
            id: true,
            content: true,
            date: true,
            time: true,
            usersId: true
          }
        }
      }
    })
    res.status(200).send({ trip })
  } catch (error) {
    res.status(400).send({ message: "Error getting active trip; please try again later." })
  }
})

export default router;