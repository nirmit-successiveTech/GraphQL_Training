import { Sender, Text } from "./dataSource.js";
import jwt from "jsonwebtoken";
import { allChat } from "../../config/serverConfig.js";
import { senderModel } from "../../models/senderModel.js";
import { textModel } from "../../models/TextModel.js";


export const chatMutationResolver = {
  postChat: async(_, { content, senderId }, { verifyUser, pubsub }) => {
    if (!verifyUser) {
      throw new Error("User does not exist");
    }
    console.log("postChat",verifyUser);
    const decodedId = verifyUser.id;
    if (decodedId !== senderId) {
      throw new Error("user not logged In");
    }
   
    const newText =  new textModel({content,senderId});
    await newText.save();

    allChat.push(newText);
    Text.push(newText);
    pubsub.publish("CHAT_POSTED", {
      chatPosted: newText,
    });
    return newText;
  },

  signup: async (_, { username, password,role }) => {
    try {
      const newUser = new senderModel({ username, password,role });
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log("error registering users", error);
    }
  },

  login: async (_, { username, password }) => {
    const userExist = await senderModel.findOne({ username, password });
    if(!userExist){
      throw new Error("User does not exist");
    }
    await senderModel.findByIdAndUpdate(
      userExist.id,
      { status: "online" },
      { new: true }
    );
      const token = jwt.sign({ id: userExist.id }, "secret_key123", {
        expiresIn: "2 hr",
      });
      console.log("caling token", token);
      return { token, status: 1 };    
  },

  logout: async(_, __, { verifyUser, pubsub }) => {
    if (!verifyUser) {
      throw new Error("User not authenticated");
    }
    console.log("calling logout");
    const logoutUser = await senderModel.findById(verifyUser.id)
    const decodedUser = Sender.find((sender) => sender.id === verifyUser.id);
    if (!logoutUser) {
      throw new Error("User does not exist");
    }
    
    await senderModel.findByIdAndUpdate(logoutUser.id,{status:"offline"})

    pubsub.publish("USER_OFFLINE", {
      chatPosted: decodedUser,
    });
    return decodedUser;
  },
};
