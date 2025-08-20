import { bookModule } from "../modules/books/index.js";
import { messageModule } from "../modules/message/index.js";
import { Author } from "../modules/books/dataSource.js";
import { blogModule } from "../modules/blog/index.js";
import { Post, User } from "../modules/blog/dataSource.js";
import { chatModule } from "../modules/chat/index.js";
import { Sender } from "../modules/chat/dataSource.js";

export const resolvers = {
    Query:{
        ...messageModule.Query,
        ...blogModule.Query,
        ...bookModule.Query
    },
    Mutation:{
        ...messageModule.Mutation,
        ...bookModule.Mutation,
        ...blogModule.Mutation,
        ...chatModule.Mutation
    },

    Subscription:{
        ...messageModule.Subscription,
        ...blogModule.Subscription,
        ...chatModule.Subscription
    },

    Book:{
        author:(parent)=>{
            return Author.find(author =>author.id ===parent.authorId)
        }
    },

    Post:{
        author:(parent)=>{
            console.log(parent)
            return User.find(user => user.id === parent.authorId)
        }
    },

    Comment:{
        post:(parent)=>{
            return Post.find(post => post.id === parent.postId)
        },
            author:(parent)=>{
            console.log(parent)
            const ans =  User.find(user => user.id === parent.authorId)
            console.log("ans is",ans);
            return ans;
        }
    },

    Text:{
        sender:(parent)=>{
            console.log('calling sender parent',parent);
            return Sender.find(sender => sender.id === parent.senderId)
        }
    },




    result:{
        __resolveType(obj){
            if(obj.name){
                console.log('calling user')
                return 'User'
            }

            if(obj.content){
                console.log('calling post')
                return 'Post'
            }

            if(obj.code){
                console.log('calling error')
                return 'AppError'
            }
        }
    }
};