import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

export const approvePost = async (id, contextValue) => {
  const existing = await db("posts").where({ id }).select("*").first();
  const approved = await db("posts")
    .where({ id })
    .andWhere({ is_verified: true })
    .select("*")
    .first();

  if (!existing) {
    throw new NotFoundError("Post not found");
  }

  if (approved) {
    throw new NotFoundError("The post has already been approved");
  }

  await db("posts")
    .where({ id })
    .update({ verified_by: contextValue.user.id, is_verified: true });

  return "Post approved!";
};
