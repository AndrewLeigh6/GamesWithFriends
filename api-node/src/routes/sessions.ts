import { SessionModule } from "./../modules/SessionModule";
import express, { Request, Response } from "express";
import { Session } from "../db/models/Session";
import { User } from "../db/models/User";
import { Game } from "../db/models/Game";
import { Model } from "objection";
export const sessionsRouter = express.Router();

interface RequestWithUsers extends Request {
  query: {
    users: string[];
  };
}

interface UserCount extends Model {
  count?: string;
}

interface GameWithOwners extends Game {
  owners?: string;
}

/* 
useful links:
https://vincit.github.io/objection.js/api/query-builder/mutate-methods.html#relate
https://vincit.github.io/objection.js/api/query-builder/mutate-methods.html#insert
https://vincit.github.io/objection.js/recipes/extra-properties.html
*/

/* you can send a request like http://localhost:3000/api/sessions?user=andrew&user=bob&user=joey
and it will give you {user: ["andrew", "bob", "joey"]} */

// create session
sessionsRouter.post("/", async function (req: RequestWithUsers, res: Response) {
  const sessionModule = new SessionModule();
  await sessionModule.init(req.query.users);

  console.log(sessionModule.users);

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
    const sessionId: string = req.params.sessionId;

    // Get number of users in session
    const usersInSessionCountQuery = await Session.relatedQuery("users")
      .count()
      .for(sessionId);

    const usersInSessionObj: UserCount = usersInSessionCountQuery[0];
    const usersInSessionCount = usersInSessionObj.count;

    // Next, prepare the first part of our query
    const usersInSession = Session.relatedQuery("users")
      .select("users.id")
      .for(sessionId);

    // Put it all together and get the games the users own
    const userGames = await Game.query()
      .select(
        "games.*",
        Game.relatedQuery("users")
          .count()
          .as("owners")
          .whereIn("users.id", usersInSession)
      )
      .orderBy("games.name", "asc");

    // Finally, filter out games that the users don't have in common
    const sharedGames = userGames.filter((userGame: GameWithOwners) => {
      return userGame.owners === usersInSessionCount;
    });

    res.json(sharedGames);
  }
);
