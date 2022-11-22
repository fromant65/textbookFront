import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../css/Navbar.css";
import { getUsername } from "../getUsername";

const Profile = ({ username }) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const setProfileUser = async () => {
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
