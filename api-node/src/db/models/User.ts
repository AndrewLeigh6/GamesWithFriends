import { Session } from "./Session";
import { Model } from "objection";
import { Game } from "./Game";
import path from "path";

export class User extends Model {
  id?: number;
  url?: string;
  done_voting?: boolean;
  steam_id?: string;
  steam_username?: string;

  static get tableName() {
    return "users";
  }

  static relationMappings = {
    games: {
      relation: Model.ManyToManyRelation,
      modelClass: path.join(__dirname, "Game"),
      join: {
        from: "users.id",
        through: {
          from: "games_users.user_id",
          to: "games_users.game_id",
        },
        to: "games.id",
      },
    },
    sessions: {
      relation: Model.ManyToManyRelation,
      modelClass: path.join(__dirname, "Session"),
      join: {
        from: "users.id",
        through: {
          from: "sessions_users.user_id",
          to: "sessions_users.session_id",
          extra: ["url", "done_voting"],
        },
        to: "sessions.id",
      },
    },
  };
}
