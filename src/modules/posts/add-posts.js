import db from "../../db/index.js";
import { BadRequestError } from "../../shared/errors/index.js";

export const addPost = async (contextValue, args) => {
  const existing = await db("posts")
    .where({ title: args.title })
    .orWhere({ content: args.content })
    .first();

  if (existing) {
    throw new BadRequestError("This post already exists!");
  }

  let addition = { user_id: contextValue.user.id, verified_by: null };

  console.log({ ...args, ...addition });
  const post = await db("posts")
    .insert({ ...args, ...addition })
    .returning("*");

  return post[0];
};
