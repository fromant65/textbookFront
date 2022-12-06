import React, { useEffect, useState } from "react";
import "../css/Home.css";
import Navbar from "../components/Navbar";
import MakePost from "../components/MakePost";
import Post from "../components/Post";
import CargarMas from "../components/CargarMas";
import { serverLink } from "../App";

const Home = () => {
  const [lastPost, setLastPost] = useState(0);
  const [posts, setPosts] = useState([]);
  const [isCargando, setIsCargando] = useState(false);
  const [user, setUser] = useState("");
  const [cantidadCargas, setCantidadCargas] = useState(0);
  useEffect(() => {
    const fetchUser = async () => {
      const req = await fetch(`${serverLink}/login`, {
        credentials: "include",
      });
      const res = await req.json();
      setUser(res.user);
    };
    fetchUser();
  }, []);
  useEffect(() => {
    const fetchPost = async () => {
      const req = await fetch(`${serverLink}/home/ultima-publicacion`, {
        credentials: "include",
      });
      const res = await req.json();
      setLastPost(res.post.orderId);
    };
    fetchPost();
  }, []);
  const cargarMas = async (lastPost) => {
    setIsCargando(true);
    document
      .getElementById("cargar-mas-spinner")
      .classList.remove("cargando-hidden");
    document
      .getElementById("cargar-mas-spinner")
      .classList.add("cargando-visible");
    const req = await fetch(`${serverLink}/home/publicaciones`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postid: lastPost,
        userid: user,
      }),
    });
    const res = await req.json();
    console.log(res);
    setPosts([...posts, ...res.posts]);
    setLastPost(res.lastId - 1);
    document
      .getElementById("cargar-mas-spinner")
      .classList.remove("cargando-visible");
    document
      .getElementById("cargar-mas-spinner")
      .classList.add("cargando-hidden");
    setIsCargando(false);
    setCantidadCargas(cantidadCargas + 1);
  };
  useEffect(() => {
    if (lastPost <= 1) {
      document.getElementById("cargar-mas").disabled = true;
    } else {
      document.getElementById("cargar-mas").disabled = false;
    }
  }, [lastPost]);

  useEffect(() => {
    if (lastPost && cantidadCargas == 0 && user) {
      cargarMas(lastPost);
    }
  }, [lastPost, cantidadCargas, user]);
  return (
    <>
      <Navbar />
      <div className="page-home">
        <MakePost />
        <div className="posts-home">
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
        </div>
        <CargarMas
          lastPost={lastPost}
          cargarMas={cargarMas}
          isCargando={isCargando}
        />
      </div>
    </>
  );
};

export default Home;
