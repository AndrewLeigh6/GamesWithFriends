import path from "path";
import { Model, snakeCaseMappers } from "objection";

export class Vote extends Model {
  id?: number;
  session_id?: number;
  games_id?: number;
  users_id?: number;

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return "votes";
  }

  static relationMappings = {
    sessions: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, "Session"),
      join: {
        from: "votes.session_id",
        to: "sessions.id",
      },
    },
    games: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, "Game"),
      join: {
        from: "votes.games_id",
        to: "games.id",
      },
    },
    users: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, "User"),
      join: {
        from: "votes.users_id",
        to: "users.id",
      },
    },
  };
}
