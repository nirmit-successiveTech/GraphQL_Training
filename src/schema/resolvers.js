
import { bookModule } from "../modules/books/index.js";
import { messageModule } from "../modules/message/index.js";
import { Author } from "../modules/books/dataSource.js";
import { blogModule } from "../modules/blog/index.js";
import { Post, User } from "../modules/blog/dataSource.js";
export const resolvers = {
    Query:{
        ...messageModule.Query,
        ...blogModule.Query,
        ...bookModule.Query
    },
    Mutation:{
        ...messageModule.Mutation,
        ...bookModule.Mutation
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
        }
    },

    Comment:{
        author:(parent)=>{
            console.log(parent)
            const ans =  User.find(user => user.id === parent.authorId)
            console.log("ans is",ans);
            return ans;
        }
    }
};