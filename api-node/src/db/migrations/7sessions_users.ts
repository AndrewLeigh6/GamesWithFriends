import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema("public")
    .createTable("sessions_users", (table) => {
      table.increments().primary();
      table.integer("session_id").references("id").inTable("sessions");
      table.integer("user_id").references("id").inTable("users");
      table.string("url");
      table.boolean("done_voting").defaultTo(false);
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("sessions_users");
}
