/**
 * @param { import("knex").Knex } knex
 */
export const up = function (knex) {
  return knex.schema.createTable("trades", function (table) {
    table.uuid("trade_id").primary().defaultTo(knex.raw("(GEN_RANDOM_UUID())"));
    table.text("ticker_symbol").notNullable();
    table.text("side").notNullable(); // Buy/Sell
    table.decimal("price").notNullable();
    table.integer("volume").notNullable();
    table.timestamp("timestamp").notNullable();
    table
      .enum("status", ["pending", "successful", "failed"], {
        useNative: true,
        enumName: "status",
      })
      .notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 */
export const down = function (knex) {
  return knex.schema.dropTable("trades");
};
