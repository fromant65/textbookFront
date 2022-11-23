import React, { useEffect, useState } from "react";
import { serverLink } from "../App";
import Post from "./Post";
import { getUsername } from "../getUsername";
import "../css/ProfileComponent.css";
import UserList from "./UserList";

const ProfileComponent = ({ user, isOwnProfile }) => {
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [isFollowersOpen, setIsFollowersOpen] = useState(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  useEffect(() => {
    if (userInfo?.followers) {
      setFollowers(userInfo.followers.length);
    }
    if (userInfo?.following) {
      setFollowing(userInfo.following.length);
    }
  }, [userInfo]);

  const showFollowers = () => {
    if (userInfo?.followers) {
      setIsFollowersOpen(true);
    }
  };

  const showFollowing = () => {
    if (userInfo?.following) {
      setIsFollowingOpen(true);
    }
  };

  //Seguir o dejar de seguir al usuario
  const toggleFollow = () => {
    if (userInfo?.followers && !isOwnProfile) {
      fetch(`${serverLink}/profile/seguir`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userFollowed: user,
          client: username,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res?.success === "Follower added") {
            const newUserInfo = userInfo;
            newUserInfo.followers.push({ username: username });
            setFollowers(followers + 1);
            setUserInfo(newUserInfo);
            setIsFollowed(true);
          }
          if (res?.success === "Follower removed") {
            const newUserInfo = userInfo;
            let newFollowers = [];
            for (let follower in newUserInfo.followers) {
              if (newUserInfo.followers[follower].username === username) {
                continue;
              }
              newFollowers.push(newUserInfo.followers[follower]);
            }
            setFollowers(followers - 1);
            setUserInfo({ ...newUserInfo, followers: newFollowers });
            setIsFollowed(false);
          }
        });
    }
  };

  //Determinar si el cliente sigue al usuario del perfil

  useEffect(() => {
    if (userInfo.followers && !isOwnProfile) {
      const followed = userInfo.followers.filter(
        (user) => user.username === username
      ).length
        ? true
        : false;
      setIsFollowed(followed);
    }
  }, [userInfo]);

  //Obtener información de usuario del perfil
  useEffect(() => {
    if (user) {
      const getUserInfo = async () => {
        const req = await fetch(`${serverLink}/user-info/${user}`);
        const res = await req.json();
        setUserInfo(res.user);
        //console.log(res.user);
      };
      getUserInfo();
    }
  }, [user]);

  //Obtener posts del usuario
  useEffect(() => {
    if (user) {
      const getUserPosts = async () => {
        const req = await fetch(`${serverLink}/user-publicaciones/${user}`);
        const res = await req.json();
        setPosts(res);
      };
      getUserPosts();
    }
  }, [user]);

  //Obtener username del cliente
  useEffect(() => {
    const getUsername_ = async () => {
      setUsername(await getUsername());
    };
    getUsername_();
  }, []);

  return (
    <>
      {userInfo && posts ? (
        <section className="page-profile">
          <article className="profile-data">
            <div className="profile-username">{userInfo.username}</div>
            <div className="profile-fullname">{userInfo.fullname}</div>
            <div className="profile-email">{userInfo.email}</div>
            <div className="profile-social-container">
              <div className="profile-followers" onClick={showFollowers}>
                Followers: {followers}
              </div>
              <div className="profile-following" onClick={showFollowing}>
                Following: {following}
              </div>
            </div>
            {isOwnProfile ? (
              ""
            ) : (
              <button className="profile-follow" onClick={toggleFollow}>
                {isFollowed ? "Stop Following" : "Follow"}
              </button>
            )}
          </article>
          <article className="profile-posts">
            {posts
              .slice(0)
              .reverse()
              .map((post) => {
                return (
                  <div key={post._id}>
                    <Post
                      user={username}
                      author={post.user}
                      content={post.content}
                      date={post.date}
                      likes={post.likes}
                      postId={post._id}
                    />
                  </div>
                );
              })}
          </article>
          {isFollowersOpen ? (
            <UserList
              users={userInfo.followers}
              setIsOpen={setIsFollowersOpen}
              text="Personas que lo siguen"
            />
          ) : (
            ""
          )}
          {isFollowingOpen ? (
            <UserList
              users={userInfo.following}
              setIsOpen={setIsFollowingOpen}
              text="Personas seguidas"
            />
          ) : (
            ""
          )}
        </section>
      ) : (
        <div>No se pudo cargar la info del usuario</div>
      )}
    </>
  );
};

export default ProfileComponent;
