import React, { useContext, useState } from "react";
import "../css/EditCard.css";
import { serverLink } from "../App";
import { PostContext } from "./Post";

const EditCard = ({ setIsEditOpen }) => {
  const { content_, setContent, postId } = useContext(PostContext);
  const [newContent, setNewContent] = useState(content_);
  const handleEditContent = async () => {
    const location = `${serverLink}/home/editar-post`;
    const req = await fetch(location, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: newContent,
        postid: postId,
      }),
    });
    const res = await req.json();
    if (res.success) setContent(newContent);
    setIsEditOpen(false);
  };
  return (
    <div className="edit-card-background">
      <div className="edit-card-container">
        <button
          className="edit-post-close"
          onClick={() => setIsEditOpen(false)}
        >
          X
        </button>
        <input
          className="edit-post-input"
          type="text"
          value={newContent}
          onChange={(e) => {
            setNewContent(e.target.value);
          }}
        />
        <button className="edit-post-submit" onClick={handleEditContent}>
          Editar Post
        </button>
      </div>
    </div>
  );
};

export default EditCard;
