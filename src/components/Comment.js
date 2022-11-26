import React, { useEffect, useState } from "react";
import formatearFecha from "../formatearFecha";
import CommentOptions from "./CommentOptions";
import { getUsername } from "../getUsername";

export const CommentContext = React.createContext();

const Comment = ({ date, user, content, _id, postId }) => {
  const [clientUsername, setClientUsername] = useState("");
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [content_, setContent] = useState(content);
  useEffect(() => {
    const getUsername_ = async () => {
      const username = await getUsername();
      setClientUsername(username);
    };
    getUsername_();
  }, []);

  const handleCommentOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };
  return (
    <>
      {isDeleted ? (
        document.getElementById(_id).setAttribute("style", "display:none")
      ) : (
        <>
          <CommentContext.Provider
            value={{
              date,
              user,
              content,
              _id,
              postId,
              setIsOptionsOpen,
              setIsDeleted,
              setContent,
              clientUsername,
            }}
          >
            <button className="comment-options" onClick={handleCommentOptions}>
              ...
            </button>
            {isOptionsOpen ? <CommentOptions /> : ""}
            <div className="comment-user">{user}</div>
            <div className="comment-date">{formatearFecha(date)}</div>
            <div className="comment-content">{content_}</div>
          </CommentContext.Provider>
        </>
      )}
    </>
  );
};

export default Comment;
