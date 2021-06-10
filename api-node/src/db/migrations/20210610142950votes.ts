import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.withSchema("public").createTable("votes", (table) => {
    table.increments().primary();
    table.integer("session_id").references("id").inTable("sessions");
    table.integer("games_id").references("id").inTable("games");
    table.integer("users_id").references("id").inTable("users");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("votes");
}
