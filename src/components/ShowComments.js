import React, { useEffect, useState } from "react";
import "../css/ShowComments.css";
import { getUsername } from "../getUsername";
import Comment from "./Comment";

export const CommentContext = React.createContext();

const ShowComments = ({ postId, isCommentsOpen, setIsCommentsOpen }) => {
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  const getComments = async (postId) => {
    const location = `http://localhost:3500/home/getcomentarios/${postId}`;
    const req = await fetch(location, { credentials: "include" });
    const res = await req.json();
    const comentarios = res.comentarios;
    setComments(comentarios);
  };

  useEffect(() => {
    getComments(postId);
  }, []);

  const makeComment = async (postId) => {
    const location = `http://localhost:3500/home/comentar`;
    const user = await getUsername();
    const date = new Date();
    const req = await fetch(location, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user,
        content: commentContent,
        date: date,
        postid: postId,
      }),
      credentials: "include",
    });
    const res = await req.json();
    const comment = res.comment;
    setCommentContent("");
    setComments([...comments, comment]);
  };

  useEffect(() => {
    if (commentContent.length > 0) {
      document.querySelector(".submit-comment").disabled = false;
    } else {
      document.querySelector(".submit-comment").disabled = true;
    }
  });

  return (
    <div className="comments-background">
      <div className="comments-container">
        <button
          className="close-comments"
          onClick={() => {
            setIsCommentsOpen(null);
          }}
        >
          X
        </button>
        <div className="comments-list">
          {comments.map((comment) => {
            const date = new Date(comment.date);
            const user = comment.user;
            const content = comment.content;
            const _id = comment._id;
            return (
              <div key={_id} className="comment-container">
                <CommentContext.Provider
                  value={{ date, user, content, _id, postId }}
                >
                  <Comment />
                </CommentContext.Provider>
              </div>
            );
          })}
        </div>
        <form
          action=""
          className="post-comment-form"
          onSubmit={(e) => {
            e.preventDefault();
            makeComment(postId);
          }}
        >
          <input
            type="text"
            className="input-comment"
            value={commentContent}
            onChange={(e) => {
              setCommentContent(e.target.value);
            }}
            placeholder="comentar..."
          />
          <button type="submit" className="submit-comment" disabled={true}>
            Comentar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShowComments;
