import { subscribe } from "graphql";
import { pubsub } from "../../server/pubsub.js";

export const chatSubscriptionResolvers = {
  chatPosted: {
    subscribe: () => pubsub.asyncIterableIterator(["CHAT_POSTED","USER_OFFLINE"]),
  },
  
};