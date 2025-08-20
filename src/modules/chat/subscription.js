import { pubsub } from "../../server/pubsub.js";

export const chatSubscriptionResolvers = {
  chatPosted: {
    subscribe: () => pubsub.asyncIterableIterator(["CHAT_POSTED"]),
  },
};