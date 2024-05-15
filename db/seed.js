import prisma from './prisma.js';
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import "dotenv/config";

const log = console.log;

const seedUsers = (process.env.seedUsers * 1) || 100;
const seedTrips = (process.env.seedTrips * 1) || 100;

const seed = async () => {
  try {
    log("☀️ seeding database... 🌧️ ")

    log("👩 adding users...")
    const usersToSeed = [];
    // hardcoded seed users for testing
    usersToSeed.push({
      email: "a@a",
      password: await bcrypt.hash("password", 8),
      username: "aaa",
    });
    usersToSeed.push({
      email: "b@b",
      password: await bcrypt.hash("password", 8),
      username: "bbb",
    });
    usersToSeed.push({
      email: "c@c",
      password: await bcrypt.hash("password", 8),
      username: "ccc",
    });
    // generating unique emails and usernames for seed users
    const allEmails = ensureUnique( seedUsers - usersToSeed.length, faker.internet.email);
    const allUsernames = ensureUnique( seedUsers - usersToSeed.length, faker.internet.userName);
    // generating seed users
    while (allEmails.length && allUsernames.length) {
      usersToSeed.push({
        email: allEmails.pop(),
        password: await bcrypt.hash(faker.internet.password(), 8),
        username: allUsernames.pop(),
      })
    }
    // push generated users to db
    const numSeededUsers = await prisma.users.createMany({ data: usersToSeed });
    log('👨 ...users seeded!')

    log('🗺️ creating trips...')
    const tripsToSeed = [];
    // hardcoded seed trips for testing
    tripsToSeed.push({
      name: "2024 Japan Trip",
      start_date: "2024-05-01T00:00:00.000Z",
      end_date: "2024-05-31T00:00:00.000Z",
    });
    tripsToSeed.push({
      name: "2023 Bermuda Trip",
      start_date: "2023-03-05T00:00:00.000Z",
      end_date: "2023-03-25T00:00:00.000Z",
    })
    // generating seed trips
    while(tripsToSeed.length !== seedTrips)
      tripsToSeed.push(getSeedTrip());
    //push generated trips to db
    const numSeededTrips = await prisma.trips.createMany({ data: tripsToSeed });
    log('✈️ ...trips seeded!')

    log('🎸 creating events for each trip...')
    const eventsToSeed = [];
    // generating seed events for each trip
    tripsToSeed.forEach((trip, i) => {
      const numEvents = faker.number.int({ min: 1, max: 10 })
      for (let j = 0; j < numEvents; j++) 
        eventsToSeed.push(getSeedEvent(trip, i + 1));
    })
    // push generated events to db
    const numSeededEvents = await prisma.events.createMany({ data: eventsToSeed });
    log('🍛 ...events seeded!')

    log('✍️ assigning users to trips...')
    log('✍️ assigning users to events on those trips...')
    log('📝 creating memos for users on those trips...')
    for (let i = 1; i <= numSeededUsers.count; i++) {
      const numTrips = faker.number.int({ min: 0, max: 4 })
      const tripIds = [];
      for (let j = 0; j < numTrips; j++) {
        let tripId = faker.number.int({ min: 1, max: numSeededTrips.count })
        while (tripIds.includes(tripId))
          tripId = faker.number.int({ min: 1, max: numSeededTrips.count })
        tripIds.push(tripId);
        // assign seed users random trips
        const user = await prisma.users.update({
          where: { id: i },
          data: { 
            trips: { 
              connect: { 
                id: tripId 
              } 
            }
          }
        })
        const numMemos = faker.number.int({ min: 0, max: 5 })
        for (let k = 0; k < numMemos; k++) {
          // create a number of memos for each user on each trip
          await prisma.memos.create({
            data: {
              usersId: i,
              tripsId: tripId,
              content: faker.lorem.paragraph({ min: 1, max: 3 }),
              date: faker.date.between({ from: tripsToSeed[i - 1].start_date, to: tripsToSeed[i - 1].end_date }),
              time: faker.date.between({ from: tripsToSeed[i - 1].start_date, to: tripsToSeed[i - 1].end_date })
            }
          })
        }
        const { events } = await prisma.trips.findUnique({
          where: { id: tripId },
          select: { events: true }
        })
        for (const event of events) {
          // assign seed users to events connected to those random trips
          await prisma.users.update({
            where: { id: i },
            data: {
              events: {
                connect: {
                  id: event.id
                }
              }
            }
          })
        }
      }
    }
    log('✍️ ...assigned users to trips!')
    log('✍️ ...assigned users to events on those trips!')
    log('📝 ...added memos for users on those trips!')

    log('🌱 finished seeding! 🌱')

  } catch(err) {
    log(err);
  }
}

// util function to help faker not have duplicates
const ensureUnique = (numToSeed, fakerMethod) => {
	const outputArray = [];
	while (numToSeed > outputArray.length) {
		const fakerOutput = fakerMethod();
		if (!outputArray.includes(fakerOutput)) {
			outputArray.push(fakerOutput);
		}
	}
	return outputArray;
};

// util function to set trips to seed
const getSeedTrip = () => {
  const tripYear = faker.number.int({ min: 1500, max: 2024 })
  const tripName = `${tripYear} ${faker.location.city()} Trip`
  const startDate = faker.date.between({
    from: `${tripYear}-01-01T00:00:00.000Z`,
    to: `${tripYear}-12-31T00:00:00.000Z`
  })
  const tripDayLength = faker.number.int({ min: 3, max: 60 });
  const endDate = addDays(startDate, tripDayLength);
  const tripObj = {
    name: tripName,
    start_date: startDate,
    end_date: endDate,
  };
  return tripObj;
}

// util function to set events to seed
const getSeedEvent = (trip, id) => {
  const name = `${faker.word.verb()} ${faker.word.adjective()} ${faker.word.noun()}`;
  const description = faker.lorem.paragraph({ min: 4, max: 15 });
  const date = faker.date.between({ from: trip.start_date, to: trip.end_date });
  const start_time = date;
  const end_time = addHours(start_time);
  const location = faker.location.streetAddress({ useFullAddress: true });
  const eventObj = {
    name,
    description,
    date,
    start_time,
    end_time,
    location,
    tripsId: id
  }
  return eventObj;
}

// util function to add days to a date
const addDays = (date, days) => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate.toISOString();
}

// util function to set end event times
const addHours = (date) => {
  const newDate = new Date(date.getTime() + faker.number.int({ min: 1, max: 8 }) * 60 * 60 * 1000);
  return newDate.toISOString();
}

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {log(e); await prisma.$disconnect(); process.exit(1)})