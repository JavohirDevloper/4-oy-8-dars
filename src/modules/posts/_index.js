import { readFileSync } from "fs";
import { join } from "path";
import { listPost } from "./list-posts.js";
import { showPost } from "./show-posts.js";
import { addPost } from "./add-posts.js";
import { isLoggedIn } from "../../graphql/is-loggedin.js";
import { isAdmin } from "../../graphql/is-admin.js";
import { removePost } from "./remove-post.js";
import { editPost } from "./edit-posts.js";
import { approvePost } from "./approve-posts.js";
//
import { httpValidator } from "../../shared/http-validator/index.js";
import { updatePostSchema, addPostSchema } from "./_joi-schema.js";

const typeDefs = readFileSync(
  join(process.cwd(), "src", "modules", "posts", "_schema.gql"),
  "utf8"
);

const resolvers = {
  Query: {
    posts: (_, args, contextValue) => {
      isLoggedIn(contextValue);
      return listPost(contextValue);
    },
    post: (_, args, contextValue) => {
      isLoggedIn(contextValue);
      return showPost(args.id, contextValue);
    },
  },
  Mutation: {
    addPost: (_, args, contextValue) => {
      isLoggedIn(contextValue);
      httpValidator({ body: args.input }, addPostSchema);
      return addPost(contextValue, args.input);
    },
    updatePost: (_, args, contextValue) => {
      isLoggedIn(contextValue);
      httpValidator({ body: args.input }, updatePostSchema);
      return editPost(args.id, args.input, contextValue);
    },
    approvePost: (_, args, contextValue) => {
      isLoggedIn(contextValue);
      isAdmin(["admin", "super_admin"], contextValue);
      return approvePost(args.id, contextValue);
    },
    removePost: (_, args, contextValue) => {
      isLoggedIn(contextValue);
      return removePost(args.id, contextValue);
    },
  },
};

export default { typeDefs, resolvers };
