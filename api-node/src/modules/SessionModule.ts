import { Category } from "./../db/models/Category";
import { generateUrl } from "./../helpers/helpers";
import { UserModule } from "./UserModule";
import { Session } from "../db/models/Session";
import { Game } from "../db/models/Game";
import { Model, PartialModelObject } from "objection";
import { User } from "../db/models/User";

interface SessionData {
  id?: number;
  host_id?: number;
}

interface UserCount extends Model {
  count?: string;
}

interface GameWithOwners extends Game {
  owners?: string;
}

export class SessionModule {
  users: UserModule[] = [];

  private createUsers = async (steamUrls: string[]): Promise<void> => {
    const createUser = async (
      steamUrl: string,
      isHost: boolean = false
    ): Promise<UserModule> => {
      const user = new UserModule();
      if (isHost) {
        await user.init(steamUrl, isHost);
      } else {
        await user.init(steamUrl);
      }
      return user;
    };

    await Promise.all(
      steamUrls.map(
        async (steamUrl, index): Promise<void> => {
          let user: UserModule;

          // First user is host
          if (index === 0) {
            user = await createUser(steamUrl, true);
          } else {
            user = await createUser(steamUrl);
          }

          this.users.push(user);
        }
      )
    );
  };

  private save = async (
    hostId: number,
    users: UserModule[]
  ): Promise<number | undefined> => {
    const insertData = { host_id: hostId };
    const session: SessionData = await Session.query().insert(insertData);

    const userIds = users.flatMap((user) => {
      if (typeof user.id === "number") {
        return [user.id];
      } else {
        return [];
      }
    });

    await Promise.all(
      userIds.map(async (userId, index) => {
        if (typeof session.id === "number") {
          const url = generateUrl();

          const sessionUser = await Session.relatedQuery("users")
            .for(session.id)
            .relate({
              id: userId,
              url: url,
            } as PartialModelObject<User>);

          users[index].setRandomUrl(url);
        }
      })
    );

    if (typeof session.id === "number") {
      console.log("save id", session.id);

      return session.id;
    }
  };

  private getHostId = (users: UserModule[]): number | null => {
    const hostIndex = users.findIndex((user) => {
      return user.isHost;
    });

    if (hostIndex > -1) {
      const host = users[hostIndex];

      if (typeof host.id === "number") {
        return host.id;
      }

      return null;
    }

    return null;
  };

  public getSharedGames = async (sessionId: string): Promise<Game[]> => {
    const usersInSessionCount = await getSessionUserCount(sessionId);

    const usersInSession = Session.relatedQuery("users")
      .select("users.id")
      .for(sessionId);

    const userGames: GameWithOwners[] = await getGamesOwnedByAllUsers(
      sessionId
    );

    // Filter out games that the users don't have in common
    const sharedGames: GameWithOwners[] = userGames.filter(getGamesInCommon);

    // Get all multiplayer games in the db
    const multiplayerCategory = Category.query().where("name", "Multi-player");
    const multiplayerGames = await Category.relatedQuery<Game>("games").for(
      multiplayerCategory
    );

    // Now we want to return games that are both multiplayer and shared
    const sharedMultiplayerGames = sharedGames.filter((sharedGame) => {
      return multiplayerGames.some(
        (multiGame) => sharedGame.id === multiGame.id
      );
    });

    return sharedMultiplayerGames;

    /* =======================================================================
    HELPER FUNCTIONS 
    ===========================================================================*/
    function getGamesInCommon(userGame: GameWithOwners): boolean {
      return userGame.owners === usersInSessionCount;
    }

    // Basically, if there are 4 users in the session, return "4"
    async function getSessionUserCount(
      sessionId: string
    ): Promise<string | undefined> {
      const usersInSessionCountQuery = await Session.relatedQuery("users")
        .count()
        .for(sessionId);

      const usersInSessionResult: UserCount = usersInSessionCountQuery[0];
      const usersInSessionCount = usersInSessionResult.count;
      if (typeof usersInSessionCount === "string") {
        return usersInSessionCount;
      }

      return undefined;
    }

    async function getGamesOwnedByAllUsers(sessionId: string): Promise<Game[]> {
      const userGames: GameWithOwners[] = await Game.query<Game>()
        .select(
          "games.*",
          Game.relatedQuery("users")
            .count()
            .as("owners")
            .whereIn("users.id", usersInSession)
        )
        .orderBy("games.name", "asc");

      return userGames;
    }
    /* =======================================================================
    END HELPER FUNCTIONS 
    ===========================================================================*/
  };

  public init = async (steamUrls: string[]): Promise<number | undefined> => {
    await this.createUsers(steamUrls);
    const hostId = this.getHostId(this.users);

    if (hostId) {
      const sessionId = await this.save(hostId, this.users);
      console.log("init id", sessionId);

      if (typeof sessionId === "number") {
        return sessionId;
      }
    }
  };
}
