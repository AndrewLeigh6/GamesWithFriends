import { Category } from "./Category";
import { Model } from "objection";
import { User } from "./User";
import path from "path";

export class Game extends Model {
  id?: number;
  app_id?: string;
  name?: string;
  image_vertical_url?: string;
  image_horizontal_url?: string;

  static get tableName() {
    return "games";
  }

  static relationMappings = {
    users: {
      relation: Model.ManyToManyRelation,
      modelClass: path.join(__dirname, "User"),
      join: {
        from: "games.id",
        through: {
          from: "games_users.game_id",
          to: "games_users.user_id",
        },
        to: "user.id",
      },
    },
    categories: {
      relation: Model.ManyToManyRelation,
      modelClass: path.join(__dirname, "Category"),
      join: {
        from: "games.id",
        through: {
          from: "categories_games.game_id",
          to: "categories_games.category_id",
        },
        to: "categories.id",
      },
    },
  };
}
