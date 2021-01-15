import { SessionModule } from "./../modules/SessionModule";
import { resolveVanityUrl, getOwnedGames } from "./../services/steamapi";
import express, { Request, Response } from "express";
import { PartialModelObject } from "objection";
import { Session } from "../db/models/Session";
import { User } from "../db/models/User";
export const sessionsRouter = express.Router();

interface RequestWithUsers extends Request {
  query: {
    users: string[];
  };
}

/* 
more useful links:
https://vincit.github.io/objection.js/api/query-builder/mutate-methods.html#relate
https://vincit.github.io/objection.js/api/query-builder/mutate-methods.html#insert
https://vincit.github.io/objection.js/recipes/extra-properties.html
*/

/* you can send a request like http://localhost:3000/api/sessions?user=andrew&user=bob&user=joey
and it will give you {user: ["andrew", "bob", "joey"]} */

// TESTING
sessionsRouter.get("/test", async function (req: Request, res: Response) {
  // const username = "silverstone1294";
  // const steamId = await resolveVanityUrl(username);

  // const userGames = await getOwnedGames(steamId);

  // res.json(userGames);

  // const user = new UserHelper();
  // await user.init("https://steamcommunity.com/id/silverstone1294/");
  // console.log(user);

  res.send("did it work");
});

// create session
sessionsRouter.post("/", async function (req: RequestWithUsers, res: Response) {
  // // create initial session with host
  // const hostSteamId = 1;
  // const insertData = { host_id: hostSteamId };

  // const session: SessionData = await Session.query().insert(insertData);

  // // next, we need to get our users info from steam and put them in the db

  // // finally, add our new users to sessions_users
  // const sessionId = session.id;

  // if (sessionId) {
  //   const sessionUsers = await Session.relatedQuery("users")
  //     .for(sessionId)
  //     .relate([1, 2, 3, 4]);
  // }

  const sessionModule = new SessionModule();
  await sessionModule.init(req.query.users);
  //console.log("Our users are", sessionModule.users);

  res.json({ hi: "hi" });
});

// get session by id

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

    const usersInSession = Session.relatedQuery("users").for(sessionId);

    const games = await User.relatedQuery("games")
      .for(usersInSession)
      .distinct("name", "image_vertical_url", "image_horizontal_url");

    res.json(games);
  }
);
