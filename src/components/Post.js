import React, { useEffect, useState } from "react";
import "../css/Post.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import ShowComments from "./ShowComments";
import formatearFecha from "../formatearFecha";
import PostOptions from "./PostOptions";
import { serverLink } from "../App";

export const PostContext = React.createContext();

const Post = ({ user, author, content, date, likes, postId }) => {
  //User es el usuario que tiene abierta la sesión actual; author es el autor del post
  const [like, setLike] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [content_, setContent] = useState(content);
  const _date = new Date(date);
  const handleNewLike = async () => {
    if (!user) return;
    if (like) likes.pop();
    else likes.push(user);
    const location = `${serverLink}/home/like`;
    fetch(location, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postid: postId,
        userid: user,
      }),
    });
    setLike(!like);
  };

  useEffect(() => {
    if (likes) {
      likes.filter((username) => username === user);
      if (likes.length === 1) setLike(true);
      else setLike(false);
    }
  }, [user, likes]);
  return (
    <>
      {isDeleted ? (
        ""
      ) : (
        <PostContext.Provider
          value={{
            user,
            author,
            content_,
            setContent,
            date,
            likes,
            postId,
            like,
            isCommentsOpen,
            isOptionsOpen,
            isDeleted,
            setIsDeleted,
          }}
        >
          <div className="post-container">
            <div className="options-container">
              <button
                className="post-options"
                onClick={() => {
                  setIsOptionsOpen(!isOptionsOpen);
                }}
              >
                ...
              </button>
              <div className="options-menu">
                {isOptionsOpen ? <PostOptions /> : ""}
              </div>
            </div>

            <div className="post-author">{author}</div>
            <div className="post-date">{formatearFecha(_date)}</div>
            <div className="post-content">{content_}</div>
            <div className="post-interactions">
              <div
                className="post-likes"
                onClick={() => {
                  handleNewLike();
                }}
              >
                {like ? <AiFillHeart /> : <AiOutlineHeart />} {likes?.length}{" "}
                {likes?.length === 1 ? "like" : "likes"}
              </div>
              <div
                className="post-comments"
                onClick={() => {
                  setIsCommentsOpen(postId);
                }}
              >
                Comments
              </div>
            </div>
          </div>
        </PostContext.Provider>
      )}

      {isCommentsOpen ? (
        <ShowComments
          postId={postId}
          isCommentsOpen={isCommentsOpen}
          setIsCommentsOpen={setIsCommentsOpen}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Post;
