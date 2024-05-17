import express from "express";
import prisma from './../db/prisma.js';
import { findActiveTrip } from "./memo.js";

const router = express.Router();

/**
 * for when loading all events of an active trip for a user's mobile app
 * includes the users associated with this event
 * GET /api/event
 */
router.get("/", async (req, res) => {
  try {
    const tripsId = await findActiveTrip(req.user.id);
    const events = await prisma.events.findMany({
      where: {
        tripsId
      },
      include: {
        users: {
          select: {
            id: true,
            username: true
          }
        }
      }
    })
    res.status(200).send({ events })
  } catch (error) {
    res.status(400).send({ message: "Error getting events; please try again later." })
  }
})

/**
 * for a user posting a new event for the active trip, along with the users attending
 * @params expected req.body: { name, description?, date, start_time, end_time, location, userIds: [{id},{id},{id}] }
 * POST /api/event
 */
router.post("/", async(req, res) => {
  try {
    const usersId = req.user.id * 1
    const tripsId = await findActiveTrip(usersId);
    const { 
      name, 
      description, 
      date, 
      start_time, 
      end_time, 
      location, 
      userIds // IMPORTANT: userIds is an array of objects, each with a single property of id (of the user associated with the event)
    } = req.body;
    console.log(typeof description, description)
    const event = await prisma.events.create({
      data: {
        tripsId,
        name,
        date,
        start_time,
        end_time,
        location,
        description,
        users: {
          connect: userIds
        }
      },
      include: {
        users: {
          select: {
            id: true,
            username: true
          }
        }
      }
    })
    res.status(201).send({ event });
  } catch (error) {
    res.status(400).send({ message: "Error in creating new event; please try again later." })
  }
})

/**
 * for a user editing an event that is part of their active trip
 * @params expected req.body: { name?, description?, date?, start_time?, end_time?, location?, userIds?: [{id},{id},{id}] }
 *         expected req.params: { eventId } (of the event on an active trip for a user)
 * PUT /api/event/:eventId
 */
router.put("/:eventId", async (req, res) => {
  try {
    const tripsId = await findActiveTrip(req.user.id)
    const { 
      name, 
      description, 
      date, 
      start_time, 
      end_time, 
      location, 
      userIds // IMPORTANT: userIds is an array of objects, each with a single property of id (of the user associated with the event)
    } = req.body;
    const event = await prisma.events.update({
      where: {
        tripsId,
        id: req.params.eventId * 1
      },
      data: {
        name,
        description,
        date,
        start_time,
        end_time,
        location,
        users: {
          set: userIds
        }
      },
      include: {
        users: {
          select: {
            id: true,
            username: true
          }
        }
      }
    })
    return res.status(201).send({ event })
  } catch (error) {
    res.status(400).send({ message: "Error in editing event; please try again later." })
  }
})

/**
 * for a user deleting an event on their active trip
 * @params expected req.params: { eventId } (of the event on an active trip for a user)
 * DELETE /api/event/:eventId
 */
router.delete("/:eventId", async (req, res) => {
  try {
    const tripsId = await findActiveTrip(req.user.id)
    const event = await prisma.events.delete({
      where: {
        tripsId,
        id: req.params.eventId * 1
      }
    })
    res.status(200).send({ event })
  } catch (error) {
    res.status(400).send({ message: "Error in deleting event; please try again later." })
  }
})

export default router;