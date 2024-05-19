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
    const trip = await getTrip(id);
    res.status(200).send({ trip })
  } catch (error) {
    res.status(400).send({ message: "Error getting active trip; please try again later." })
  }
})

/**
 * getting all trips of a user; allows us to use this to switch between active trips in settings
 * GET /api/trip/all
 */
router.get("/all", async (req, res) => {
  try {
    const trips = await prisma.users_Trips.findMany({
      where: {
        usersId: req.user.id
      },
      select: {
        trips: true
      }
    })
    res.status(200).send({ trips });
  } catch (error) {
    res.status(400).send({ message: "Error getting all trips; please try again later." });
  }
})

/**
 * for a user creating a new trip, along with the users attending that trip. The creating user will have whatever
 * trip they current have set to active to false. Then, they are set to active on the trip just created. The other users
 * on the trip will have this trip status set to inactive.
 * POST /api/trip 
 * @params expected req.body { name, start_date, end_date, userIds: [{usersId}, {usersId}, {usersId}] } 
 * (users should be an array of objects with a single property, userIds, that will be on this trip)
 */
router.post("/", async (req, res) => {
  try {
    const { 
      name, 
      start_date, 
      end_date, 
      userIds
    } = req.body;
    const activeTrip = await findActiveTrip(req.user.id)
    if (activeTrip) await setTripStatus(req.user.id, activeTrip, false)
    for (const obj of userIds) {
      if (obj.usersId === req.user.id * 1) obj.is_active = true;
      else obj.is_active = false;
    }
    const trip = await prisma.trips.create({
      data: {
        name,
        start_date,
        end_date,
        users_trips: {
          create: userIds
        }
      }
    })
    res.status(201).send({ trip })
  } catch (error) {
    res.status(400).send({ message: "Error creating new trip; please try again later." })
  }
})

/**
 * for a user editing their active trip, including the current companions also on that trip. Users are able to remove themselves,
 * and disconnect themselves from a trip.
 * PUT /api/trip/:tripID
 * @params expected req.body: { name?, start_date?, end_date? userIds?: [{usersId}, {usersId}, {usersId}]}
 * @params expected req.params: { tripId } (of the active trip of the user)
 */
router.put("/:tripId", async (req, res) => { // this function was a tricky one
  try { 
    const tripsId = await findActiveTrip(req.user.id);
    if (tripsId !== req.params.tripId * 1) throw new Error(); // validation against changing trips that are not the user's active trip
    const { name, start_date, end_date, userIds } = req.body;
    const currentUsers = await prisma.users_Trips.findMany({
      where: {
        tripsId
      }
    })
    let isRemovingSelf = true;
    for (const user of currentUsers) 
      if (user.usersId === req.user.id) isRemovingSelf = false;
    if (isRemovingSelf) await setTripStatus(req.user.id, tripsId, false); // safeguard against not having multiple active trips for a user
    const updatedUsersIdArray = userIds.map(obj => obj.usersId);
    const currentUsersIdArray = currentUsers.map(obj => obj.usersId);
    for (let i = 0; i < currentUsersIdArray.length; i++) { // two for loops, this and the one right under, for editing the users_tables rows correctly
      if (!updatedUsersIdArray.includes(currentUsersIdArray[i])) {
        await prisma.users_Trips.deleteMany({
          where: {
            usersId: currentUsersIdArray[i],
            tripsId
          }
        })
      }
    }
    for (const updatedUserId of updatedUsersIdArray) {
      if (!currentUsersIdArray.includes(updatedUserId)) {
        await prisma.users_Trips.create({
          data: {
            is_active: false,
            usersId: updatedUserId,
            tripsId
          }
        })
      }
    }
    const trip = await prisma.trips.update({ // finally, update the trip info and return the trip along with the updated users on the trip
      where: {
        id: tripsId
      },
      data: {
        name,
        start_date,
        end_date
      },
      select: {
        name: true,
        start_date: true,
        end_date: true,
        users_trips: {
          select: {
            users: {
              select: {
                username: true,
                id: true
              }
            }
          }
        }
      }
    })
    res.status(201).send({ trip })
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: "Error editing active trip; please try again later." })
  }
})

/**
 * Util function for setting a user's trip status.
 * If a user has an active trip and they want to set another trip's status to active,
 * the active trip will first be changed to false. Next, we will change the chosen trip
 * to true. Otherwise, set the trip status.
 * Noted that this function has no validation for maintaining the rule that each user can only 
 * have one active trip. Validation must be conducted elsewhere, or this function needs to be revised.
 * @param {number} userId - the id of the user
 * @param {number} tripId - the id of the trip
 * @param {boolean} status - the trip status to switch to
 */
const setTripStatus = async (userId, tripId, status) => {
  try {
    const activeTripId = await findActiveTrip(userId);
    if (status && activeTripId) {
      await prisma.users_Trips.update({
        where: {
          tripsId: activeTripId
        },
        data: {
          is_active: !status
        }
      })
    }
    await prisma.users_Trips.updateMany({
      where: {
        tripsId: tripId
      },
      data: {
        is_active: status
      }
    })
  } catch (error) {
    console.log(error);
  }
}

/**
 * Util function for getting a trip and all of its associated parts.
 * @param {number} id - the id of the trip
 * @returns {object} trip - the trip information
 */

const getTrip = async (id) => {
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
          users: {
            select: {
              username: true,
              id: true,
            }
          }
        }
      }
    }
  })
  return trip;
}

export { setTripStatus, getTrip }

export default router;