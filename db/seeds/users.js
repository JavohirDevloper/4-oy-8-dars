import bcrypt from "bcryptjs";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      first_name: "John",
      last_name: "Doe",
      username: "johndoe",
      password: bcrypt.hashSync("12345", 10),
      role: "super_admin",
    },
  ]);
};
