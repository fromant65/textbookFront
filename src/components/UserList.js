import React from "react";
import "../css/UserList.css";
const UserList = ({ users, setIsOpen, text }) => {
  return (
    <div className="user-list-container">
      <div className="user-list-card">
        <button onClick={() => setIsOpen(false)} className="user-list-close">
          X
        </button>
        <div className="user-list-title">{text}</div>
        <div className="user-list">
          {users.map((user) => {
            return (
              <a
                href={`/profile/${user.username}`}
                className="user-list-item"
                key={user.username}
              >
                {user.username}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserList;
