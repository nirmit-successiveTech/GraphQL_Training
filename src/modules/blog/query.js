

import { Post } from "./dataSource.js";
import { Comment } from "./dataSource.js";
import { User } from "./dataSource.js";

export const UserQueryResolver={
    user:()=>User,
    posts:()=>Post,
    comments:()=>Comment,

    getUser:(_,{id})=>User.find(user => user.id===parseInt(id)),
    getPost:(_,{id})=>Post.find(post => post.id===parseInt(id)),
    getComment:(_,{id})=>Comment.find(comment => comment.id===parseInt(id))

}