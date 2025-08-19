

import { Post } from "./dataSource.js";
import { Comment } from "./dataSource.js";
import { User } from "./dataSource.js";

export const UserQueryResolver={
    user:()=>User,
    posts:(_,{limit,offset,nature})=>{
        Post.sort((a,b)=>{
          return nature==="asc"? Number(a.id)-Number(b.id):Number(b.id)-Number(a.id) 
        })

        return Post.slice(offset,limit+offset)
    },
    comments:()=>Comment,

    getUser:(_,{id})=>{
        const user = User.find(user => user.id===parseInt(id));
        if(!user){
            return {
            message: `User with ID ${id} not found`,
            code: 404
        };
        }

        return user
    },
    getPost:(_,{id})=>Post.find(post => post.id===parseInt(id)),
    getComment:(_,{id})=>Comment.find(comment => comment.id===parseInt(id))

}