import React, { useState, useEffect } from "react";
import "../css/MakePost.css";
import { getUsername } from "../getUsername";

const MakePost = () => {
  const [postText, setPostText] = useState("");
  const [isPost, setIsPost] = useState(false);
  const handlePost = async (e) => {
    e.preventDefault();
    const user = await getUsername();
    const fechaPublicacion = new Date();
    //Hacemos la publicación
    const location = "http://localhost:3500/home/publicar";
    const req = await fetch(location, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user,
        content: postText,
        date: fechaPublicacion,
      }),
      credentials: "include",
    });
    const res = await req.json();
    if (res.success) {
      setIsPost(true);
    } else {
      setIsPost(false);
    }
    setPostText("");
  };
  useEffect(() => {
    if (postText) document.getElementById("publicar").disabled = false;
    else document.getElementById("publicar").disabled = true;
  });
  return (
    <div>
      <div>
        <form className="crear-publicacion" onSubmit={(e) => handlePost(e)}>
          <textarea
            name="publicacion"
            id="publicacion"
            className="publicacion"
            cols="30"
            rows="2"
            placeholder="¿Qué estás pensando?"
            value={postText}
            onChange={(e) => {
              setPostText(e.target.value);
            }}
          ></textarea>
          <div className="submit-container">
            <button type="submit" id="publicar" className="publicar">
              Publicar
            </button>
          </div>
        </form>
      </div>
      <div>{isPost ? "Post hecho" : ""}</div>
    </div>
  );
};

export default MakePost;
