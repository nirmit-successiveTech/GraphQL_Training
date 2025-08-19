
import { blogMutation } from "./mutation.js";
import { UserQueryResolver } from "./query.js";
import { commentSubscriptionResolvers } from "./subscription.js";

export const blogModule={
    Query:UserQueryResolver,
    Mutation:blogMutation,
    Subscription:commentSubscriptionResolvers
}