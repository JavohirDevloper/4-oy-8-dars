import { readFileSync } from "fs";
import { join } from "path";
import { listUser } from "./list-users.js";
import { showUser } from "./show-users.js";
import { loginUser } from "./login-user.js";
import { registerUser } from "./register-users.js";
import { isLoggedIn } from "../../graphql/is-loggedin.js";
import { isAdmin } from "../../graphql/is-admin.js";
//
import { httpValidator } from "../../shared/http-validator/index.js";
import { registerUserSchema, updateUserSchema } from "./_joi-schema.js";
import { removeUser } from "./remove-user.js";

const typeDefs = readFileSync(
  join(process.cwd(), "src", "modules", "users", "_schema.gql"),
  "utf8"
);

const resolvers = {
  Query: {
    users: (_, args, contextValue) => {
      isLoggedIn(contextValue);
      isAdmin(["admin", "super_admin"], contextValue);
      return listUser();
    },
    user: (_, args, contextValue) => {
      isLoggedIn(contextValue);
      isAdmin(["admin", "super_admin"], contextValue);
      return showUser({ id: args.id });
    },
  },
  Mutation: {
    login: (_, args) => {
      return loginUser(args.input);
    },
    register: (_, args) => {
      httpValidator({ body: args.input }, registerUserSchema);
      return registerUser(args.input);
    },
    updateUser: (_, args, contextValue) => {
      isLoggedIn(contextValue);
      if (contextValue.user.id !== args.id) {
        throw new ForbiddenError("No allowed");
      }
      httpValidator({ body: args.input }, updateUserSchema);
      return editAdmin(args.id, args.input);
    },
    removeUser: (_, args, contextValue) => {
      isLoggedIn(contextValue);
      isAdmin(["super_admin", "admin"], contextValue);
      return removeUser(args.id, args.input);
    },
  },
};

export default { typeDefs, resolvers };
