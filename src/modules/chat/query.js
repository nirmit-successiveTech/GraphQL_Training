
import { allChat } from "../../config/serverConfig.js";

export const ChatQueryResolver ={
    chatHistory:()=>allChat
}