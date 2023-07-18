import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

export const showUser = async ({ id }) => {
  const user = await db("users")
    .where({ id })
    .andWhere({ role: "user" })
    .andWhere({ is_deleted: false })
    .first();

  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
};
