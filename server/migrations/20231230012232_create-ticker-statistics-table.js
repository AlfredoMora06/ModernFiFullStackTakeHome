/**
 * @param { import("knex").Knex } knex
 */
export const up = function (knex) {
  return knex.schema.createTable("ticker_statistics", function (table) {
    table.text("ticker_symbol").primary().notNullable();
    table.decimal("highest_price");
    table.decimal("lowest_price");
    table.decimal("vwap");
  });
};

/**
 * @param { import("knex").Knex } knex
 */
export const down = function (knex) {
  return knex.schema.dropTable("ticker_statistics");
};
