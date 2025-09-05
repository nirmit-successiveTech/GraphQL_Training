import { chatMutationResolver } from "./mutation.js";
import { ChatQueryResolver } from "./query.js";
import { chatSubscriptionResolvers } from "./subscription.js";

export const chatModule={
    Query:ChatQueryResolver,
    Mutation:chatMutationResolver,
    Subscription:chatSubscriptionResolvers
}