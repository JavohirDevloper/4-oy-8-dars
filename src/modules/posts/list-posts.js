import db from "../../db/index.js";

export const listPost = async (filter = {}) => {
  if (filter.user.role == "admin" || filter.user.role == "super_admin") {
    const existing = await db("posts").select("*");

    if (!existing) {
      throw new NotFoundError("post not found");
    }
    return existing;
  }

  const existing = await db("posts")
    .where({ is_verified: true })
    .orWhere({ user_id: filter.user.id })
    .select("*");

  if (!existing) {
    throw new NotFoundError("post not found");
  }

  return existing;
};
