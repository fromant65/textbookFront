import React, { useContext, useState } from "react";
import { CommentContext } from "./Comment";

const EditCommentCard = ({ setIsEditOpen }) => {
  const { _id, content, postId, setContent } = useContext(CommentContext);
  const [newContent, setNewContent] = useState(content);
  const handleEditContent = async () => {
    const location = "http://localhost:3500/home/editar-comentario";
    const req = await fetch(location, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: newContent,
        postid: postId,
        commentid: _id,
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

export default EditCommentCard;
