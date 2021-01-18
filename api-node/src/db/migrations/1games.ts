import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.withSchema("public").createTable("games", (table) => {
    table.increments().primary();
    table.string("app_id");
    table.string("name");
    table.string("image_vertical_url");
    table.string("image_horizontal_url");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("games");
}
