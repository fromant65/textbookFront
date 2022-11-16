import React, { useEffect, useState } from "react";

const PostOptions = ({ postId, user, author, setIsDeleted }) => {
  const postEditHandler = () => {};
  const deletePost = async () => {
    const location = "http://localhost:3500/home/eliminar-post";
    const req = await fetch(location, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postid: postId,
      }),
    });
    const res = await req.json();
    if (res.success) setIsDeleted(true);
  };

  useEffect(() => {
    console.log(user === author);
  }, []);

  return (
    <div className="post-options-container">
      {user === author ? (
        <>
          <button className="post-option" onClick={postEditHandler}>
            Editar post
          </button>
          <button className="post-option" onClick={deletePost}>
            Eliminar
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default PostOptions;
