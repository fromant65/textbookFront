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
              <div className="user-list-item" key={user.username}>
                {user.username}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserList;
