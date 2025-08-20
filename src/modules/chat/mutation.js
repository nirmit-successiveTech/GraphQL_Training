import { Sender, Text } from "./dataSource.js";
import jwt from 'jsonwebtoken';

export const chatMutationResolver = {
  postChat: (_, { content, senderId }, { verifyUser,pubsub}) => {
    if(!verifyUser){
      console.log("no user");
      throw new Error("User does not exist")
    }
    const decodedId = verifyUser.id;
    if(decodedId!==senderId){
      throw new Error("user not logged In")
    }
    console.log('decodedId',decodedId)
    const newChat = {
      id: String(Text.length + 1),
      content,
      senderId,
    };

    Text.push(newChat);
    pubsub.publish("CHAT_POSTED", {
      chatPosted: newChat,
    });
    return newChat;
  },

  login:(_,{username,password})=>{
    console.log('starting...........',password)
    const userExist =  Sender.find(sender => 
      sender.password === password
    )
    console.log('calling userexist',userExist)
    if(userExist){
      const token = jwt.sign({id:userExist.id},"secret_key123",{expiresIn:"2 hr"})
      console.log('caling token',token)
      return {token,status:1}
    }else{
      return {token:"",status:0}
    }
  }

};
