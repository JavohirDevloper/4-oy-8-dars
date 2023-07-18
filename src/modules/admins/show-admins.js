import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

export const showAdmin = async ({ id }) => {
  const admin = await db("users")
    .where({ id })
    .andWhere(function () {
      this.where({ role: "admin" }).orWhere({ role: "super_admin" });
    })
    .andWhere({ is_deleted: false })
    .first();

  if (!admin) {
    throw new NotFoundError("admin not found");
  }
  return admin;
};
