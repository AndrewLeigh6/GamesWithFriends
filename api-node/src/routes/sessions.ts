import { User } from "./../db/models/User";
import { SessionModule } from "./../modules/SessionModule";
import express, { Request, Response } from "express";
import { Session } from "../db/models/Session";
export const sessionsRouter = express.Router();

interface RequestWithUsers extends Request {
  query: {
    users: string[];
  };
}

interface RequestWithUrl extends Request {
  query: {
    url: string;
  };
}

/* you can send a request like http://localhost:3000/api/sessions?user=andrew&user=bob&user=joey
and it will give you {user: ["andrew", "bob", "joey"]} */

// create session
sessionsRouter.post("/", async function (req: RequestWithUsers, res: Response) {
  const sessionModule = new SessionModule();
  const sessionId = await sessionModule.init(req.query.users);
  const response = {
    sessionId: sessionId,
    sessionModule: sessionModule,
  };

  if (typeof sessionId === "number") {
    res.json(response);
  } else {
    res.send("Unable to create session");
  }
});

// get users by session id
sessionsRouter.get(
  "/:sessionId/users",
  async function (req: Request, res: Response) {
    const sessionId: string = req.params.sessionId;

    const users = await Session.relatedQuery("users")
      .for(sessionId)
      .distinct("steam_id", "steam_username", "url");

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

// testing
sessionsRouter.get(
  "/test",
  async function (req: RequestWithUrl, res: Response) {
    const url = req.query.url;
    const sessionModule = new SessionModule();
    sessionModule.initFromUrl(url);
    res.json(url);
  }
);

sessionsRouter.get(
  "/:sessionId/users/:userId",
  async (req: Request, res: Response) => {
    // in the current session, get the user details
    const sessionId = req.params.sessionId;
    const userId = req.params.userId;

    const user = await Session.relatedQuery("users")
      .for(sessionId)
      .where("users.id", userId);

    res.json(user);
  }
);
