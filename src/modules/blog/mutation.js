import { Comment, Post, User } from "./dataSource.js";

const delay = (ms)=>{
   return new Promise((resolve,_)=>{
      setTimeout(()=>{
         resolve("resolved")
      },ms)
   })
}


export const blogMutation = {
  postUser:async (_, { name, email }) => {
   await delay(1000)
    const newUser = {
      id: String(User.length + 1),
      name,
      email,
    };
    User.push(newUser);
    return newUser;
  },

  deleteComment: async(_, { id }) => {
   await delay(1000)
    const commentId = Comment.findIndex(
      (comment) => comment.id === parseInt(id)
    );
    Comment.splice(commentId, 1);
    console.log("comment id is", commentId);
    return commentId + 1;
  },

  postComment: async(_, {content,authorId,postId},{pubsub}) => {
   await delay(3000)
     const newComment = {
      id: String(Comment.length+1),
      content,
      authorId: parseInt(authorId),
      postId: parseInt(postId),
    };
    Comment.push(newComment);
      pubsub.publish("COMMENT_POSTED",{
      commentPosted:newComment
    })
    return newComment
  },

  postPost:async(_,{title,content,authorId})=>{
   await delay(2000)
   const newPost = {
      id:String(Post.length+1),
      title,
      content,
      authorId:parseInt(authorId)
   }
   Post.push(newPost);
   return newPost
  }
};
