import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../shared/config/index.js";
import db from "../../db/index.js";
import { BadRequestError } from "../../shared/errors/index.js";

export const registerUser = async (contextValue) => {
  const existing = await db("users")
    .where({ username: contextValue.username })
    .first();

  if (existing) {
    throw new BadRequestError("This user already exists!");
  }

  let addition = {};
  if (contextValue.password) {
    addition.password = bcryptjs.hashSync(contextValue.password, 10);
    addition.role = "user";
  }
  const user = await db("users")
    .insert({ ...contextValue, ...addition })
    .returning("*");

  const payload = { user: { id: user[0].id, role: user[0].role } };
  const token = jwt.sign(payload, config.jwt.secret, { expiresIn: "1d" });

  return { token };
};
