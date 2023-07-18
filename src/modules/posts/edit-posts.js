import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

export const editPost = async (id, changes, contextValue) => {
  //
  if (
    contextValue.user.role == "admin" ||
    contextValue.user.role == "super_admin"
  ) {
    const existing = await db("posts").select("*").first();

    if (!existing) {
      throw new NotFoundError("post not found");
    }
    await db("posts")
      .where({ id })
      .update({ ...changes });

    return existing;
  }

  const existing = await db("posts")
    .where({ id })
    .andWhere({ user_id: contextValue.user.id })
    .select("*")
    .first();

  if (!existing) {
    throw new NotFoundError("post not found");
  }

  await db("posts")
    .where({ id })
    .update({ ...changes });

  return existing;
};
