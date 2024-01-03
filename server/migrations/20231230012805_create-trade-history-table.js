/**
 * @param { import("knex").Knex } knex
 */

/*
 * trade_history and trades tables are practically identical, the main difference is
 * only adding completed trades (successful or failed), trades would be failed if focusing on
 * more than one user and no one wanting to buy/sell a trade at the price another user sets it to.
 * this decision was made based on the feedback to Michael Mutscheller's email
 */

export const up = function (knex) {
  return knex.schema.createTable("trade_history", function (table) {
    table
      .uuid("trade_history_id")
      .primary()
      .defaultTo(knex.raw("(GEN_RANDOM_UUID())"));
    table.uuid("trade_id").notNullable();
    table.foreign("trade_id").references("trades.id");
    table.text("ticker_symbol").notNullable();
    table.text("side").notNullable(); // Buy/Sell
    table.decimal("price").notNullable();
    table.integer("volume").notNullable();
    table.timestamp("timestamp").notNullable();
    table
      .enum("trade_status", ["successful", "failed"], {
        useNative: true,
        enumName: "trade_status",
      })
      .notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 */
export const down = function (knex) {
  return knex.schema.dropTable("trade_history");
};
