import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

export const showPost = async (id, contextValue) => {
  //
  if (
    contextValue.user.role == "admin" ||
    contextValue.user.role == "super_admin"
  ) {
    const existing = await db("posts").where({ id }).select("*");

    if (!existing) {
      throw new NotFoundError("post not found");
    }
    return existing;
  }

  const existing = await db("posts")
    .where({ id })
    .andWhere(function () {
      this.where({ is_verified: true }).orWhere({
        user_id: contextValue.user.id,
      });
    })
    .returning("*");

  if (!existing.length) {
    throw new NotFoundError("post not found");
  }

  return existing[0];
};
