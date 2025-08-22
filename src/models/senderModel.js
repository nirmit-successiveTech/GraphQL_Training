import mongoose from "mongoose";
const senderSchema = new mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String,
        default:"user"
    },
    status:{
        type:String,
        default:"offline"
    }
})

export const senderModel = mongoose.model("Sender",senderSchema);


       