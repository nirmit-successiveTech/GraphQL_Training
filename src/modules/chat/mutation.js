import { Sender, Text } from "./dataSource.js";
import jwt from "jsonwebtoken";
import { allChat } from "../../config/serverConfig.js";

export const chatMutationResolver = {
  postChat: (_, { content, senderId }, { verifyUser, pubsub }) => {
    if (!verifyUser) {
      throw new Error("User does not exist");
    }
    const decodedId = verifyUser.id;
    if (decodedId !== senderId) {
      throw new Error("user not logged In");
    }

    const newChat = {
      id: String(Text.length + 1),
      content,
      senderId,
    };

    allChat.push(newChat);
    Text.push(newChat);
    pubsub.publish("CHAT_POSTED", {
      chatPosted: newChat,
    });
    return newChat;
  },

  login: (_, { username, password }) => {
    const userExist = Sender.find(
      (sender) => sender.password === password && sender.username === username
    );

    userExist.status = "online";

    if (userExist) {
      const token = jwt.sign({ id: userExist.id }, "secret_key123", {
        expiresIn: "2 hr",
      });
      return { token, status: 1 };
    } else {
      return { token: "", status: 0 };
    }
  },

  logout: (_, __, { verifyUser, pubsub }) => {
    if (!verifyUser) {
      throw new Error("User not authenticated");
    }
    const decodedUser = Sender.find((sender) => sender.id === verifyUser.id);
    if (!decodedUser) {
      throw new Error("User does not exist");
    }
    decodedUser.status = "offline";

    pubsub.publish("USER_OFFLINE", {
      chatPosted: decodedUser,
    });
    return decodedUser;
  },
};
