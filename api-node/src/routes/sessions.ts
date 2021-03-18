import { GameModule } from "./../modules/GameModule";
import { CategoryModule } from "./../modules/CategoryModule";
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

interface ExistingSessionUserData {
  id: number;
  host_id: number;
  users: [
    {
      id: number;
      steam_id: string;
      steam_username: string;
      url: string;
    }
  ];
}
[];

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

// get session details by url
sessionsRouter.get("/url/:url", async function (req: Request, res: Response) {
  const url = req.params.url;

  // get user and session id associated with this url
  const data = await Session.query()
    .withGraphJoined("users")
    .where("url", "=", url);

  if (data[0].users) {
    const sessionId = data[0].id;
    const hostId = data[0].host_id;
    const userId = data[0].users[0].id;
    const username = data[0].users[0].steam_username;

    if (sessionId) {
      const sessionData = await Session.query()
        .withGraphFetched("users.[games.[categories]]")
        .where("sessions.id", "=", sessionId);

      const response = {
        sessionId: sessionId,
        hostId: hostId,
        userId: userId,
        username: username,
        sessionData: sessionData[0],
      };

      res.json(response);
    }
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
    // const url = req.query.url;
    // const sessionModule = new SessionModule();
    // sessionModule.initFromUrl(url);
    // res.json(url);
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
