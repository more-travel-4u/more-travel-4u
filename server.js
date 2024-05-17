import "dotenv/config";
import express from "express";
import morgan from "morgan";
import apirouter from "./routes/api.js";
import authrouter from "./routes/auth.js";
import cors from "cors";
import jwt from 'jsonwebtoken';

const PORT = process.env.PORT || 3000;
const server = express();

//middleware
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// server.use((req, _, next) => {log(req.headers); next()})

//auth route
server.use("/auth", authrouter);

//authentication middleware
server.use((req, _, next) => {
  try {
    const token = req.headers.authorization.slice(7);
    req.user = jwt.verify(token, (process.env.SECRETKEY || "My Secret Key 🗝️"));
  } catch { 
    req.user = null;
  } finally { 
    next();
  }
})

//api route
server.use("/api", apirouter);

//misc. routes
server.get("/health", (_, res) => {
  res.status(200).send({ check: "Health 👍" })
})

server.get("/", (_, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`<p style="font-size:10em">🌊🏖️🧋🌴<p>`);
});

server.use("/*", (_, res) => res.status(404).send("4️⃣0️⃣4️⃣❗"));

server.listen(PORT, () => {
  console.log("listening on " + PORT);
});