import { Model } from "objection";
import { Game } from "./Game";
import path from "path";

export class Category extends Model {
  id?: number;
  name?: string;

  static get tableName() {
    return "categories";
  }

  static relationMappings = {
    games: {
      relation: Model.ManyToManyRelation,
      modelClass: path.join(__dirname, "Game"),
      join: {
        from: "categories.id",
        through: {
          from: "categories_games.category_id",
          to: "categories_games.game_id",
        },
        to: "games.id",
      },
    },
  };
}
