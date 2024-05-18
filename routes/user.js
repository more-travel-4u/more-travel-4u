import express from "express";
import prisma from "./../db/prisma.js";
import bcrypt from "bcrypt";
import Prisma from "@prisma/client"
import { setTripStatus, getTrip } from "./trip.js";
import { findActiveTrip } from "./memo.js";

const router = express.Router();

/**
 * returning information on the user
 * GET /api/user
 */
router.get("/", async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: req.user.id
      },
      select: {
        id: true,
        username: true,
        email: true
      }
    })
    res.status(200).send({ user })
  } catch (error) {
    res.status(400).send({ message: "Error getting user; please try again later." })
  }
})

/**
 * editing information of the user; will require old password to be entered
 * error handling included for username/email duplicates, but no differentiation between the two
 * PUT /api/user
 * @params expected req.body { username, password, newPassword, email }
 */
router.put("/", async (req, res) => {
  try {
    const { username, password, newPassword, email } = req.body;
    const { password: hashedPassword } = await prisma.users.findUnique({
      where: {
        id: req.user.id
      },
      select: {
        password: true
      }
    })
    const isPwMatch = await bcrypt.compare(password, hashedPassword);
    console.log(password, isPwMatch)
    if (!isPwMatch) return res.status(401).send({ Message: "Password incorrect." });
    const user = await prisma.users.update({
      where: {
        id: req.user.id
      },
      data: {
        username,
        password: await bcrypt.hash(newPassword, 10),
        email
      },
      select: {
        username: true,
        id: true,
        email: true
      }
    })
    res.status(201).send({ user })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") res.status(400).send({ message: "Username and/or email already in use." })
    }
    else res.status(400).send({ message: "Error editing user; please try again later." })
  }
})

/**
 * allows the user to change active trips. a user can only ever have one active trip at one time. If user has an active
 * trip, will send the active trip back
 * PUT /api/user/:tripId
 * @params expected req.params { tripId }, the id of the trip whose status is being changed
 * @params expected req.body { is_active }
 */
router.put("/:tripId", async (req, res) => {
  try {
    const tripsIdArray = await prisma.users_Trips.findMany({
      where: {
        usersId: req.user.id
      },
      select: {
        tripsId: true
      }
    })
    let isUserTrip = false;
    for (const obj of tripsIdArray) 
      if (obj.tripsId === req.params.tripId * 1) isUserTrip = true;
    if (!isUserTrip) throw new Error();
    const activeTrip = await findActiveTrip(req.user.id);
    if (activeTrip) await setTripStatus(req.user.id, activeTrip, false);
    await setTripStatus(req.user.id, req.params.tripId * 1, req.body.is_active);
    const nowActiveTrip = await findActiveTrip(req.user.id);
    if (nowActiveTrip) {
      const trip = await getTrip(nowActiveTrip);
      res.status(200).send({ trip })
    } else res.status(207).send({ message: "No active trips." })
  } catch (error) {
    res.status(400).send({ message: "Error changing active trip; please try again later." })
  }
})

export default router;