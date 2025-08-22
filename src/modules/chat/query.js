import { allChat } from "../../config/serverConfig.js";
import { senderModel } from "../../models/senderModel.js";
export const ChatQueryResolver = {
  chatHistory: async (_, __, { verifyUser }) => {
    try {
      if (!verifyUser) {
        throw new Error("User does not exist to access chats");
      }
      const decodedUser = await senderModel.findById(verifyUser.id);

      if (decodedUser.role == "admin") {
        return allChat;
      }
    } catch (error) {
      throw new Error("Only admin can access the chats");
    }
  },
};
