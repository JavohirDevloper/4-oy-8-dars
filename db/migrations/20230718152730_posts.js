/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("posts", (table) => {
    table.increments("id");
    table.string("title", 70).notNullable().unique();
    table.text("content").notNullable().unique();
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .integer("verified_by")
      .references("id")
      .inTable("users")
      .defaultTo(null)
      .onDelete("CASCADE");
    table.boolean("is_verified").defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("posts");
};
