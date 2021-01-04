import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.withSchema("public").createTable("sessions", (table) => {
    table.increments().primary();
    table.integer("host_id").references("id").inTable("users");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("sessions");
}
