import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema("public")
    .createTable("games_users", (table) => {
      table.increments().primary();
      table.integer("game_id").references("id").inTable("games");
      table.integer("user_id").references("id").inTable("users");
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("games_users");
}
