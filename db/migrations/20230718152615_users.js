/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("first_name", 40).notNullable();
    table.string("last_name", 40).notNullable();
    table.string("username", 40).notNullable().unique();
    table.string("password", 300).notNullable();
    table.enum("role", ["user", "admin", "super_admin"]).notNullable();
    table.boolean("is_deleted").defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("users");
};
