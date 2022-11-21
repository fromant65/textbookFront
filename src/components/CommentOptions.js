import React, { useContext } from "react";
import { PostContext } from "./Post";
import { CommentContext } from "./ShowComments";

const CommentOptions = ({ setIsOptionsOpen, setIsDeleted }) => {
  const { _id: commentId, postId } = useContext(CommentContext);
  const deletePost = async () => {
    const location = "http://localhost:3500/home/eliminar-comentario";
    console.log(commentId, postId);
    const req = await fetch(location, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postid: postId,
        commentid: commentId,
      }),
    });
    const res = await req.json();
    console.log(res);
    if (res.success) setIsDeleted(true);
  };
  return (
    <div className="comment-options-container">
      <button onClick={deletePost}>Eliminar comentario</button>
      <button>Editar comentario</button>
    </div>
  );
};

export default CommentOptions;
