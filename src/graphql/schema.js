import { makeExecutableSchema } from "@graphql-tools/schema";
import userModule from "../modules/users/_index.js";
import adminModule from "../modules/admins/_index.js";
import postModule from "../modules/posts/_index.js";

const typdefsArr = [
  userModule.typeDefs,
  adminModule.typeDefs,
  postModule.typeDefs,
];
const resolversArr = [
  userModule.resolvers,
  adminModule.resolvers,
  postModule.resolvers,
];

export const schema = makeExecutableSchema({
  typeDefs: typdefsArr,
  resolvers: resolversArr,
});
