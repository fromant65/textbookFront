import React, { useEffect, useState } from "react";
import "../css/Post.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IconContext } from "react-icons";

const Post = ({ user, author, content, date, likes, comments, postId }) => {
  //User es el usuario que tiene abierta la sesión actual; author es el autor del post
  const [like, setLike] = useState(false);
  const handleNewLike = async () => {
    if (!user) return;
    if (like) likes.pop();
    else likes.push(user);
    const location = "http://localhost:3500/home/like";
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
    likes.filter((username) => username === user);
    if (likes.length === 1) setLike(true);
    else setLike(false);
  }, []);
  return (
    <div className="post-container">
      <button className="post-options">...</button>
      <div className="post-author">{author}</div>
      <div className="post-date">{date}</div>
      <div className="post-content">{content}</div>
      <div className="post-interactions">
        <div
          className="post-likes"
          onClick={() => {
            handleNewLike();
          }}
        >
          {like ? <AiFillHeart /> : <AiOutlineHeart />} {likes.length}{" "}
          {likes.length === 1 ? "like" : "likes"}
        </div>
        <div className="post-comments">Comments</div>
      </div>
    </div>
  );
};

export default Post;
