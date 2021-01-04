import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.withSchema("public").createTable("users", (table) => {
    table.increments().primary();
    table.string("steam_id");
    table.string("steam_username");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("users");
}
