/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("refresh_tokens", (table) => {
    table.uuid("id").primary();
    table.uuid("merchant_id").references("id").inTable("merchants").onDelete("CASCADE");
    table.text("refresh_token").notNullable();
    table.boolean("is_revoked").defaultTo(false);
    table.timestamp("expires_at").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
