import mongoose from "mongoose";

const textSchema = new mongoose.Schema({
    content:{
        type:String
    },
    senderId:{
        type:String
    }
});

export const textModel = mongoose.model("Text",textSchema)

  