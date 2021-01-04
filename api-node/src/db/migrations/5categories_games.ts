import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema("public")
    .createTable("categories_games", (table) => {
      table.increments().primary();
      table.integer("game_id").references("id").inTable("games");
      table.integer("category_id").references("id").inTable("categories");
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("categories_games");
}
