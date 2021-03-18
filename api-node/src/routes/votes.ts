import express, { Request, Response } from "express";
import { Session } from "../db/models/Session";
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
  const userId = Number(req.query.userId);

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

    console.log(vote);

    if (vote) {
      res.send("Vote removed successfully");
    }
  }
});

// remove all votes for a user in a session
votesRouter.delete(
  "/session/:session/user/:user",
  async function (req: VoteRequest, res: Response) {
    const sessionId = req.params.session;
    const userId = req.params.user;

    if (sessionId && userId) {
      try {
        const vote = await Vote.query()
          .delete()
          .where("session_id", sessionId)
          .andWhere("users_id", userId);

        if (vote) {
          res.send("Votes removed successfully");
        } else {
          res.send("No votes removed");
        }
      } catch (error: unknown) {
        console.log("Failed to remove votes:" + error);
      }
    }
  }
);

// get all votes
votesRouter.get("/", async function (req: VoteRequest, res: Response) {
  const sessionId = Number(req.query.sessionId);

  if (sessionId) {
    const votes = await Vote.query()
      .withGraphJoined("users")
      .where("session_id", sessionId);
    res.send(votes);
  }
});
