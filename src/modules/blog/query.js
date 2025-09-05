
import { Comments, Posts, Users } from "./dataSource.js";

export const UserQueryResolver={

    users:()=>Users,
    posts:()=>Posts,
    comments:()=>Comments,

    getUser:(_,{id})=>Users.find(user => user.id===parseInt(id)),
    getPost:(_,{id})=>Posts.find(post => post.id===parseInt(id)),
    getComment:(_,{id})=>{
        const value = Comments.find(comment => comment.id===parseInt(id))

        if(!value){
            throw new Error("Comment not found")

        }
        return value;

    }


}