import React, { useEffect, useState } from "react";
import { serverLink } from "../App";
import Post from "./Post";
import { getUsername } from "../getUsername";

const ProfileComponent = ({ user, isOwnProfile }) => {
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");

  const getFollowers = () => {
    if (userInfo?.followers) {
      return userInfo.followers.length;
    } else {
      return 0;
    }
  };

  const getFollowing = () => {
    if (userInfo?.following) {
      return userInfo.following.length;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    if (user) {
      const getUserInfo = async () => {
        const req = await fetch(`${serverLink}/user-info/${user}`);
        const res = await req.json();
        setUserInfo(res.user);
        //console.log(res.user);
      };
      console.log(isOwnProfile);
      getUserInfo();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const getUserPosts = async () => {
        const req = await fetch(`${serverLink}/user-publicaciones/${user}`);
        const res = await req.json();
        setPosts(res);
        console.log(res);
      };
      getUserPosts();
    }
  }, [user]);

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
              <div>Followers: {getFollowers()}</div>
              <div>Following: {getFollowing()}</div>
              <>
                {isOwnProfile ? (
                  ""
                ) : (
                  <button className="profile-follow">Follow</button>
                )}
              </>
            </div>
          </article>
          <article className="profile-posts">
            {posts.map((post) => {
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
        </section>
      ) : (
        <div>No se pudo cargar la info del usuario</div>
      )}
    </>
  );
};

export default ProfileComponent;
