import express, { Request, Response } from "express";
import { Session } from "../db/models/Session";
import { User } from "../db/models/User";
export const usersRouter = express.Router();

// get user by id
usersRouter.get("/:userId", async function (req: Request, res: Response) {
  const userId: string = req.params.userId;
  const users = await User.query().findById(userId);

  res.json(users);
});

// get games by user id
usersRouter.get("/:userId/games", async function (req: Request, res: Response) {
  const userId: string = req.params.userId;
  const games = await User.relatedQuery("games").for(userId);

  res.json(games);
});
