import { Model } from "objection";
import { User } from "./User";
import path from "path";

export class Session extends Model {
  id?: number;
  host_id?: number;
  url?: string;

  users?: User[];

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
          extra: ["url"],
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
