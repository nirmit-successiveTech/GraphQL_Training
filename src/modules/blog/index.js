
import { blogMutation } from "./mutation.js";
import { UserQueryResolver } from "./query.js";

export const blogModule={
    Query:UserQueryResolver,
    Mutation:blogMutation
}