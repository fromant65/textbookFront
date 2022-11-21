import React, { useContext, useState } from "react";
import formatearFecha from "../formatearFecha";
import CommentOptions from "./CommentOptions";
import { CommentContext } from "./ShowComments";

const Comment = () => {
  const { _id, user, date, content } = useContext(CommentContext);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const handleCommentOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };
  return (
    <>
      {isDeleted ? (
        ""
      ) : (
        <>
          <button className="comment-options" onClick={handleCommentOptions}>
            ...
          </button>
          {isOptionsOpen ? (
            <CommentOptions setIsOptionsOpen setIsDeleted={setIsDeleted} />
          ) : (
            ""
          )}
          <div className="comment-user">{user}</div>
          <div className="comment-date">{formatearFecha(date)}</div>
          <div className="comment-content">{content}</div>
        </>
      )}
    </>
  );
};

export default Comment;
