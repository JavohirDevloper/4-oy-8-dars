import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../shared/config/index.js";
import db from "../../db/index.js";
import { NotFoundError, UnauthorizedError } from "../../shared/errors/index.js";

export const loginUser = async ({ username, password }) => {
  const existing = await db("users")
    .where({ username })
    .andWhere({ is_deleted: false })
    .first();

  if (!existing) {
    throw new NotFoundError("Not found");
  }

  const match = await bcryptjs.compare(password, existing.password);
  if (!match) {
    throw new UnauthorizedError("Username or password wrong!");
  }

  const payload = { user: { id: existing.id, role: existing.role } };
  const token = jwt.sign(payload, config.jwt.secret, { expiresIn: "1d" });

  return { token };
};
