import { chatMutationResolver } from "./mutation.js";
import { chatSubscriptionResolvers } from "./subscription.js";

export const chatModule={
    Mutation:chatMutationResolver,
    Subscription:chatSubscriptionResolvers
}