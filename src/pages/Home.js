import React, { useEffect, useState } from "react";
import "../css/Home.css";
import Navbar from "../components/Navbar";
import MakePost from "../components/MakePost";
import Post from "../components/Post";
import { getUsername } from "../getUsername";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const req = await fetch("http://localhost:3500/login", {
        credentials: "include",
      });
      const res = await req.json();
      console.log(res);
      setUser(res.user);
    };
    fetchUser();
  }, []);
  useEffect(() => {
    const fetchPost = async () => {
      const req = await fetch("http://localhost:3500/home/ultima-publicacion", {
        credentials: "include",
      });
      const res = await req.json();
      console.log(res);
      setPosts([...posts, res.post]);
    };
    fetchPost();
  }, []);
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
                  comments={post.comments}
                  postId={post._id}
                ></Post>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
