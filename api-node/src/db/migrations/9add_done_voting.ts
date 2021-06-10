import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema("public")
    .alterTable("sessions_users", (table) => {
      table.boolean("done_voting").defaultTo(false);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema("public")
    .alterTable("sessions_users", (table) => {
      table.dropColumn("done_voting");
    });
}
