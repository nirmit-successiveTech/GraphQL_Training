import { bookModule } from "../modules/books/index.js";
import { messageModule } from "../modules/message/index.js";
import { Authors, Books } from "../modules/books/dataSource.js";
import { blogModule } from "../modules/blog/index.js";

import { Comments, Posts, Users } from "../modules/blog/dataSource.js";

export const resolvers = {
    Query:{
        ...messageModule.Query,
        ...blogModule.Query,
        ...bookModule.Query
    },
    Mutation:{
        ...messageModule.Mutation,
        ...bookModule.Mutation,
        ...blogModule.Mutation
    },

    Books:{
        author:(parent)=>{
            const findAuthor = Authors.find(author =>author.id === parent.authorId)
            if(!findAuthor){
                throw new Error("Cannot find author")
            }
            return findAuthor;
        }
    },

    Posts:{
        author:(parent)=>{
            const findUser = Users.find(user => user.id === parent.authorId);
            if(!findUser){
                throw new Error("Cannot find User")
            }
            return findUser
        }
    },

    Comments:{
        post:(parent)=>{
            const findPost = Posts.find(post => post.id === parent.postId);
            if(!findPost){
                throw new Error("Cannot find Post");
            }
            return findPost
        },
        author:(parent)=>{
            const ans =  Users.find(user => user.id === parent.authorId);
            if(!ans){
                throw new Error("Cannot find user")
            }
            return ans;
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