import express from "express";
import Knex from "knex";
import { Model } from "objection";
import { sessionsRouter } from "./routes/sessions";
import { usersRouter } from "./routes/users";

/* 
useful knex stuff
==========
https://vincit.github.io/objection.js/guide/relations.html#require-loops
https://vincit.github.io/objection.js/recipes/subqueries.html
https://vincit.github.io/objection.js/guide/query-examples.html#relation-find-queries
*/

const knexConfig = require("./db/knexfile");

const app = express();
app.use("/sessions", sessionsRouter);
app.use("/users", usersRouter);

// init knex and objection
const knex: Knex = Knex(knexConfig.development);
//knex.on("query", console.log);
Model.knex(knex);

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
