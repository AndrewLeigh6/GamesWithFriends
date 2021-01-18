import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema("public")
    .createTable("sessions_votes", (table) => {
      table.increments().primary();
      table.integer("games_users_id").references("id").inTable("games_users");
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("sessions_votes");
}
