import "dotenv/config";
import express from "express";
import morgan from "morgan";
import apirouter from "./routes/api.js";
import authrouter from "./routes/auth.js";
import cors from "cors";

const PORT = process.env.PORT || 3000;
const server = express();

//middleware
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//routes
server.use("/api", apirouter);
server.use("/auth", authrouter);

server.listen(PORT, () => {
  console.log("listening on " + PORT);
});