import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../css/Navbar.css";
import { getUsername } from "../getUsername";

const Profile = ({ username }) => {
  //Username es una prop opcional que hace referencia a quién es el dueño del perfil
  const [user, setUser] = useState("");
  useEffect(() => {
    const setProfileUser = async () => {
      //En caso de que prop no esté definida, quiere decir que accedimos a nuestro propio perfil
      const profileUser = username ? username : await getUsername();
      setUser(profileUser);
    };
    setProfileUser();
  }, []);

  return (
    <>
      <Navbar />
      <section className="page-profile">
        <article className="profile-data">{user}</article>
        <article className="profile-posts">ProfilePosts</article>
      </section>
    </>
  );
};

export default Profile;
