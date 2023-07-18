import db from "../../db/index.js";

export const listAdmin = (filter = {}) => {
  return db("users")
    .where(function () {
      this.where({ role: "admin" }).orWhere({ role: "super_admin" });
    })
    .andWhere(filter)
    .andWhere({ is_deleted: false })
    .select("*");
};
