import { readFileSync } from "fs";
import { join } from "path";
import { listAdmin } from "./list-admins.js";
import { showAdmin } from "./show-admins.js";
import { isLoggedIn } from "../../graphql/is-loggedin.js";
import { isAdmin } from "../../graphql/is-admin.js";
import { addAdmin } from "./add-admin.js";
import { editAdmin } from "./edit-admin.js";
import { removeAdmin } from "./remove-admin.js";
import { httpValidator } from "../../shared/http-validator/index.js";
import { addAdminSchema, updateAdminSchema } from "./_joi-schema.js";
import { ForbiddenError } from "../../shared/errors/index.js";

const typeDefs = readFileSync(
  join(process.cwd(), "src", "modules", "admins", "_schema.gql"),
  "utf8"
);

const resolvers = {
  Query: {
    admins: (_, args, contextValue) => {
      isLoggedIn(contextValue);
      isAdmin(["admin", "super_admin"], contextValue);
      return listAdmin();
    },
    admin: (_, args, contextValue) => {
      isLoggedIn(contextValue);
      isAdmin(["admin", "super_admin"], contextValue);
      return showAdmin({ id: args.id });
    },
  },
  Mutation: {
    addAdmin: (_, args, contextValue) => {
      isLoggedIn(contextValue);
      isAdmin(["super_admin"], contextValue);
      httpValidator({ body: args.input }, addAdminSchema);
      return addAdmin(args.input);
    },
    updateAdmin: (_, args, contextValue) => {
      isLoggedIn(contextValue);
      isAdmin(["super_admin", "admin"], contextValue);
      if (
        contextValue.user.id !== args.id &&
        contextValue.user.role !== "super_admin"
      ) {
        throw new ForbiddenError("No allowed");
      }
      httpValidator({ body: args.input }, updateAdminSchema);
      return editAdmin(args.id, args.input);
    },
    removeAdmin: (_, args, contextValue) => {
      isLoggedIn(contextValue);
      isAdmin(["super_admin"], contextValue);
      return removeAdmin(args.id, args.input);
    },
  },
};

export default { typeDefs, resolvers };
