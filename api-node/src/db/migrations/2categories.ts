import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.withSchema("public").createTable("categories", (table) => {
    table.increments().primary();
    table.string("name");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("categories");
}
