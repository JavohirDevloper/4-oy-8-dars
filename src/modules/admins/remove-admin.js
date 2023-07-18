import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

export const removeAdmin = async (id) => {
  const existing = await db("users")
    .where({ id })
    .andWhere({ role: "admin" })
    .andWhere({ is_deleted: false })
    .first();

  if (!existing) {
    throw new NotFoundError("Admin not found");
  }

  const user = await db("users")
    .where({ id })
    .update({ is_deleted: true })
    .returning("*");

  return user[0];
};
