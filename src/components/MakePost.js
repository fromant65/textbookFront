import React, { useState, useEffect } from "react";
import "../css/MakePost.css";
import { getUsername } from "../getUsername";
import Post from "./Post";

const MakePost = () => {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  useEffect(() => {
    const getUser = async () => {
      const username = await getUsername();
      setUser(username);
    };
    getUser();
  }, []);
  const handlePost = async (e) => {
    e.preventDefault();
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
    if (res.post) {
      setPosts([res.post, ...posts]);
    } else {
      console.log("Hubo un error al postear: " + res.message);
    }
    setPostText("");
  };
  useEffect(() => {
    if (postText) document.getElementById("publicar").disabled = false;
    else document.getElementById("publicar").disabled = true;
  });
  return (
    <div className="makePost-container">
      <article>
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
      </article>
      <article className="new-posts-container">
        {posts.map((post) => {
          return (
            <div key={post._id}>
              <Post
                user={user}
                author={post.user}
                content={post.content}
                date={post.date}
                likes={post.likes}
                postId={post._id}
              ></Post>
            </div>
          );
        })}
      </article>
    </div>
  );
};

export default MakePost;
