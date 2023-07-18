import { ForbiddenError } from "../shared/errors/index.js";

export const isAdmin = (allowed, contextValue) => {
  if (!allowed.includes(contextValue.user.role)) {
    throw new ForbiddenError("No allowed");
  }
};
