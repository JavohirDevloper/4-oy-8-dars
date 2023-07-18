/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  await knex("posts").del();
  await knex("posts").insert([
    {
      title: "Founding of Apple",
      content:
        "Apple Computer, Inc. was founded on April 1, 1976, by college dropouts Steve Jobs and Steve Wozniak, who brought to the new company a vision of changing the way people viewed computers. Jobs and Wozniak wanted to make computers small enough for people to have them in their homes or offices.",
      user_id: "1",
      verified_by: "1",
      is_verified: true,
    },
    {
      title: "Founding of USA",
      content:
        'In 1776, in Philadelphia, the Second Continental Congress declared the independence of the colonies as the "United States". Led by General George Washington, it won the Revolutionary War. The peace treaty of 1783 established the borders of the new sovereign state.',
      user_id: "1",
      verified_by: "1",
      is_verified: true,
    },
  ]);
};