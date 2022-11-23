import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../css/Navbar.css";
import { getUsername } from "../getUsername";
import ProfileComponent from "../components/ProfileComponent";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState("");
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const { username } = useParams();
  useEffect(() => {
    const setProfileUser = async () => {
      //En caso de que prop no esté definida, quiere decir que accedimos a nuestro propio perfil
      const profileUser = username ? username : await getUsername();
      setIsOwnProfile(!username);
      setUser(profileUser);
    };
    setProfileUser();
  }, []);
  return (
    <>
      <Navbar />
      <ProfileComponent user={user} isOwnProfile={isOwnProfile} />
    </>
  );
};

export default Profile;
