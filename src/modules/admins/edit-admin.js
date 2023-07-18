import bcryptjs from "bcryptjs";
import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

export const editAdmin = async (id, changes) => {
  const existing = await db("users")
    .where({ id })
    .andWhere({ role: "admin" })
    .andWhere({ is_deleted: false })
    .first();

  if (!existing) {
    throw new NotFoundError("Admin not found");
  }

  let addition = {};
  if (changes.password) {
    addition.password = bcryptjs.hashSync(addition.password, 10);
  }

  const user = await db("users")
    .where({ id })
    .update({ ...changes, ...addition })
    .returning("*");

  return user[0];
};
