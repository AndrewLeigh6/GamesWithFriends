import { UserModule } from "./UserModule";
import axios from "axios";
import { Session } from "../db/models/Session";

interface SessionData {
  id?: number;
  host_id?: number;
}

interface User extends UserModule {}

export class SessionModule {
  users: User[] = [];

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

  private save = async (hostId: number, users: User[]): Promise<void> => {
    const insertData = { host_id: hostId };
    const session: SessionData = await Session.query().insert(insertData);

    const userIds = users.flatMap((user) => {
      if (typeof user.rowId === "number") {
        return [user.rowId];
      } else {
        return [];
      }
    });

    if (typeof session.id === "number") {
      const sessionUsers = await Session.relatedQuery("users")
        .for(session.id)
        .relate(userIds);
    }

    // we left off here - sessions and sessions_users are sorted
  };

  private getHostId = (users: User[]): number | null => {
    const hostIndex = users.findIndex((user) => {
      return user.isHost;
    });

    if (hostIndex > -1) {
      const host = users[hostIndex];

      if (typeof host.rowId === "number") {
        return host.rowId;
      }

      return null;
    }

    return null;
  };

  public init = async (steamUrls: string[]): Promise<void> => {
    await this.createUsers(steamUrls);
    const hostId = this.getHostId(this.users);

    if (hostId) {
      await this.save(hostId, this.users);
    }
  };
}
