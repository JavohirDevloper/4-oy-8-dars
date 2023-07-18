import bcryptjs from "bcryptjs";
import db from "../../db/index.js";
import { BadRequestError } from "../../shared/errors/index.js";

export const addAdmin = async (contextValue) => {
  const existing = await db("users")
    .where({ username: contextValue.username })
    .first();

  if (existing) {
    throw new BadRequestError("This user already exists!");
  }

  let addition = {};
  if (contextValue.password) {
    addition.password = bcryptjs.hashSync(contextValue.password, 10);
    addition.role = "admin";
  }

  const user = await db("users")
    .insert({ ...contextValue, ...addition })
    .returning("*");

  return "Admin added successfully";
};
