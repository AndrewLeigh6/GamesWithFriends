import express, { Request, Response } from "express";
import { Vote } from "../db/models/Vote";
export const votesRouter = express.Router();

interface VoteRequest extends Request {
  query: {
    sessionId: string;
    gameId: string;
    userId: string;
  };
}

// vote for a game
votesRouter.post("/", async function (req: VoteRequest, res: Response) {
  const sessionId = Number(req.query.sessionId);
  const gameId = Number(req.query.gameId);
  const userId = Number(req.query.userId); // we can get this by searching users with the url param until we find a match

  if (sessionId && gameId && userId) {
    const insertData = {
      session_id: sessionId,
      games_id: gameId,
      users_id: userId,
    };

    const vote = await Vote.query().insert(insertData);
    res.json(vote);
  }
});

// remove vote for a game
votesRouter.delete("/", async function (req: VoteRequest, res: Response) {
  const sessionId = Number(req.query.sessionId);
  const gameId = Number(req.query.gameId);
  const userId = Number(req.query.userId);

  if (sessionId && gameId && userId) {
    const vote = await Vote.query()
      .delete()
      .where("session_id", sessionId)
      .andWhere("games_id", gameId)
      .andWhere("users_id", userId);

    if (vote) {
      res.send("Vote removed successfully");
    }
  }
});
