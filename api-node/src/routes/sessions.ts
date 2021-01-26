import { SessionModule } from "./../modules/SessionModule";
import express, { Request, Response } from "express";
import { Session } from "../db/models/Session";
export const sessionsRouter = express.Router();

interface RequestWithUsers extends Request {
  query: {
    users: string[];
  };
}

/* you can send a request like http://localhost:3000/api/sessions?user=andrew&user=bob&user=joey
and it will give you {user: ["andrew", "bob", "joey"]} */

// create session
sessionsRouter.post("/", async function (req: RequestWithUsers, res: Response) {
  const sessionModule = new SessionModule();
  await sessionModule.init(req.query.users);

  res.json(sessionModule);
});

// get users by session id
sessionsRouter.get(
  "/:sessionId/users",
  async function (req: Request, res: Response) {
    const sessionId: string = req.params.sessionId;

    const users = await Session.relatedQuery("users")
      .for(sessionId)
      .distinct("steam_id", "steam_username");

    res.json(users);
  }
);

// get games by session id
sessionsRouter.get(
  "/:sessionId/games",
  async function (req: Request, res: Response) {
    const sessionModule = new SessionModule();
    const sessionId: string = req.params.sessionId;

    const sharedGames = await sessionModule.getSharedGames(sessionId);

    res.json(sharedGames);
  }
);
