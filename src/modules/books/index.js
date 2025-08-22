import { bookMutationResolver } from "./mutation.js";
import { bookQueryResolver } from "./query.js";


export const bookModule={
    Query:bookQueryResolver,
    Mutation:bookMutationResolver
}