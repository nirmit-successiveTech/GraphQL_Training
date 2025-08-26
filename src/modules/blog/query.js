
import { Comments, Posts, Users } from "./dataSource.js";

export const UserQueryResolver={
<<<<<<< HEAD
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
=======
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
>>>>>>> 33c364b0465378a1702641d37d1f43fdbac2344c

}