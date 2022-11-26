import React, { useContext, useState } from "react";
import { CommentContext } from "./Comment";
import EditCommentCard from "./EditCommentCard";
import "../css/CommentOptions.css";
import { serverLink } from "../App";

const CommentOptions = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const {
    _id: commentId,
    //date,
    user,
    //content,
    postId,
    //setIsOptionsOpen,
    setIsDeleted,
    //setContent,
    clientUsername,
  } = useContext(CommentContext);

  const deletePost = async () => {
    const location = `${serverLink}/home/eliminar-comentario`;
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
    if (res.success) setIsDeleted(true);
  };
  return (
    <>
      {clientUsername === user ? (
        <div className="comment-options-container">
          <div className="comment-options-menu">
            <button className="comment-option" onClick={deletePost}>
              Eliminar comentario
            </button>
            <button
              className="comment-option"
              onClick={() => setIsEditOpen(!isEditOpen)}
            >
              Editar comentario
            </button>
          </div>
          {isEditOpen ? <EditCommentCard setIsEditOpen={setIsEditOpen} /> : ""}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CommentOptions;
