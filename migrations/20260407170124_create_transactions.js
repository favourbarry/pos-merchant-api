/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable("transactions", (table) => {
    table.uuid("id").primary();
    table.uuid("merchant_id").references("id").inTable("merchants").onDelete("CASCADE");
    table.decimal("amount").notNullable();
    table.string("status").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTableIfExists("transactions");
};
