import express, { Request, Response } from "express";
import Knex from "knex";
import morgan from "morgan";
import * as fs from "fs";
import * as path from "path";
import { Model } from "objection";
import { sessionsRouter } from "./routes/sessions";
import { usersRouter } from "./routes/users";
import { votesRouter } from "./routes/votes";

require("dotenv").config();
const knexConfig = require("./db/knexfile");

const logStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

const app = express();
app.use(morgan("dev", { stream: logStream }));

app.use("/api/sessions", sessionsRouter);
app.use("/api/users", usersRouter);
app.use("/api/votes", votesRouter);

app.use(express.static(path.join(__dirname, "../", "../client/build")));
app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../", "../client/build", "index.html"));
});

// init knex and objection
const knex: Knex = Knex(knexConfig.development);
//knex.on("query", console.log);
Model.knex(knex);

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
