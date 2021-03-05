import express, { Request, Response } from "express";
import Knex from "knex";
import morgan from "morgan";
import * as fs from "fs";
import * as path from "path";
import { Model } from "objection";
import { sessionsRouter } from "./routes/sessions";
import { usersRouter } from "./routes/users";
import { votesRouter } from "./routes/votes";

/* 
useful knex stuff
==========
https://vincit.github.io/objection.js/guide/relations.html#require-loops
https://vincit.github.io/objection.js/recipes/subqueries.html
https://vincit.github.io/objection.js/guide/query-examples.html#relation-find-queries
*/

const knexConfig = require("./db/knexfile");

const logStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

const app = express();
app.use(morgan("dev", { stream: logStream }));
app.use("/sessions", sessionsRouter);
app.use("/users", usersRouter);
app.use("/votes", votesRouter);

// init knex and objection
const knex: Knex = Knex(knexConfig.development);
//knex.on("query", console.log);
Model.knex(knex);

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
