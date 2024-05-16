import express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt"
import prisma from "../db/prisma.js";

const router = express.Router();

// register new user endpoint
router.post("/register", async (req, res) => {
  try { // validation for fields and values, email uniqueness, and username uniqueness
    if (!authValidate(req.body)) {
      res.status(400).send({ message: "Unsuccessful account creation." }); 
      return;
    }
    if (await prisma.users.findFirst({ where: { email: req.body.email }})) {
      res.status(400).send({ message: "Email already in use." })
      return;
    }
    if (await prisma.users.findFirst({ where: { username: req.body.username }})) {
      res.status(400).send({ message: "Username already in use." })
      return;
    }
    // if validation passes, create new user
    const user = await prisma.users.create({
      data: {
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        username: req.body.username
      }
    }) // validation in case of unsuccessful user creation
    if (!user) res.status(400).send({ message: "Unsuccessful account creation." })
    else { // if user creation successful, create token and send to user
      const token = jwt.sign({ id: user.id, username: user.username }, (process.env.SECRETKEY || "My Secret Key 🗝️"))
      res.status(201).send({ token })
    }
  } catch(error) {
    throw(error);
  }
})

// login existing user endpoint
router.post("/login", async(req, res) => {
  try { // validation for fields and values, and email and password correctness
    if(!authValidate(req.body, "🔒")) {
      res.status(401).send({ message: "Error logging in." })
      return;
    }
    const user = await prisma.users.findFirst({ where: { username: req.body.username }})
    if (!user) {
      res.status(401).send({ message: "Username or password is incorrect." });
      return;
    }
    const isPWMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPWMatch) {
      res.status(401).send({ message: "Username or password is incorrect." });
      return;
    } // if validation passes, create token and send to user
    const token = jwt.sign({ id: user.id, username: user.username }, (process.env.SECRETKEY || "My Secret Key 🗝️"))
    res.status(201).send({ token })
  } catch(error) {
    throw(error);
  }
})

// util function for field validation for both register & login
const authValidate = (body, login) => {
	// field type validation
	let notString = false;
	Object.values(body).forEach((val) => {
		if (typeof val !== "string") notString = true;
	});
	if (notString) return false;
	// field validation
	const comparison = ["email", "password", "username"];
	if (login) return JSON.stringify(Object.keys(body).sort()) === JSON.stringify(comparison.slice(1, 3));
	else return JSON.stringify(Object.keys(body).sort()) === JSON.stringify(comparison.sort());
};

export default router;