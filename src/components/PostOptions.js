import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "./Post";
import EditCard from "./EditCard";
import "../css/PostOptions.css";

const PostOptions = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { postId, user, author, setIsDeleted } = useContext(PostContext);

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
    console.log(isEditOpen);
  }, []);

  return (
    <div className="post-options-container">
      {user === author ? (
        <>
          <button
            className="post-option"
            onClick={() => setIsEditOpen(!isEditOpen)}
          >
            Editar post
          </button>
          <button className="post-option" onClick={deletePost}>
            Eliminar
          </button>
          {isEditOpen ? <EditCard setIsEditOpen={setIsEditOpen} /> : ""}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default PostOptions;
