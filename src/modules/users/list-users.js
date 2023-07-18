import db from "../../db/index.js";

export const listUser = (filter = {}) => {
  return db("users")
    .where(filter)
    .andWhere({ role: "user" })
    .andWhere({ is_deleted: false })
    .select("*");
};
