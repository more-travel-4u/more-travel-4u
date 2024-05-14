import "dotenv/config";
import express from "express";
const server = express();
import morgan from "morgan";
import apirouter from "./routes/api.js";
import authrouter from "./routes/auth.js";
import cors from "cors";

const PORT = process.env.PORT || 3000;

//middleware
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api", apirouter);
server.use("/auth", authrouter);
// server.use("/",);

server.listen(PORT, () => {
  console.log("listening on " + PORT);
});