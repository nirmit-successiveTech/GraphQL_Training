import { bookModule } from "../modules/books/index.js";
import { messageModule } from "../modules/message/index.js";
import { Authors, Books } from "../modules/books/dataSource.js";
import { blogModule } from "../modules/blog/index.js";

import { chatModule } from "../modules/chat/index.js";
import { Sender } from "../modules/chat/dataSource.js";

import { Comments, Posts, Users } from "../modules/blog/dataSource.js";
export const resolvers = {
  Query: {
    ...messageModule.Query,
    ...blogModule.Query,
    ...bookModule.Query,
    ...chatModule.Query,
  },
  Mutation: {
    ...messageModule.Mutation,
    ...bookModule.Mutation,
    ...blogModule.Mutation,
    ...chatModule.Mutation,
  },

  Subscription: {
    ...messageModule.Subscription,
    ...blogModule.Subscription,
    ...chatModule.Subscription,
  },

  Books: {
    author: (parent) => {
      const findAuthor = Authors.find(
        (author) => author.id === parent.authorId
      );
      if (!findAuthor) {
        throw new Error("Cannot find author");
      }
      return findAuthor;
    },
  },

  Text: {
    sender: (parent) => {
      return Sender.find((sender) => sender.id === parent.senderId);
    },
  },

  result: {
    __resolveType(obj) {
      if (obj.name) return "User";
      if (obj.content) return "Post";
      if (obj.code) return "AppError";
    },
  },

  Current: {
    __resolveType(obj) {
      if (obj.content && obj.senderId) return "Text";
      if (obj.username) return "Sender";
    },
  },

  Comments: {
    post: (parent) => {
      const findPost = Posts.find((post) => post.id === parent.postId);
      if (!findPost) {
        throw new Error("Cannot find Post");
      }
      return findPost;
    },
    author: (parent) => {
      const ans = Users.find((user) => user.id === parent.authorId);
      if (!ans) {
        throw new Error("Cannot find user");
      }
      return ans;
    },
  },
};
