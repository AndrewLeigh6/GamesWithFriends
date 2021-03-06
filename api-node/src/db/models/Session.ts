import { Model, snakeCaseMappers } from "objection";
import { User } from "./User";
import path from "path";

export class Session extends Model {
  id?: number;
  host_id?: number;
  url?: string;
  done_voting?: boolean;

  users?: User[];

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return "sessions";
  }

  static relationMappings = {
    users: {
      relation: Model.ManyToManyRelation,
      modelClass: path.join(__dirname, "User"),
      join: {
        from: "sessions.id",
        through: {
          from: "sessions_users.session_id",
          to: "sessions_users.user_id",
          extra: ["url", "done_voting"],
        },
        to: "users.id",
      },
    },
    votes: {
      relation: Model.HasOneRelation,
      modelClass: path.join(__dirname, "Vote"),
      join: {
        from: "sessions.id",
        to: "votes.session_id",
      },
    },
  };
}
