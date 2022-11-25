import React, { useEffect, useState } from "react";
import { serverLink } from "../App";
import Navbar from "../components/Navbar";
import "../css/Search.css";

const Search = () => {
  const [userQuery, setUserQuery] = useState("");
  const [queryResult, setQueryResult] = useState([]);

  const handleSearch = async (e) => {
    const req = await fetch(`${serverLink}/search-user/${userQuery}`);
    const res = await req.json();
    setQueryResult(res);
    if (res.length) {
      document
        .querySelector(".search-results")
        .classList.remove("page-results-not-available");
    } else {
      document
        .querySelector(".search-results")
        .classList.add("page-results-not-available");
    }
  };

  useEffect(() => {
    handleSearch();
  }, [userQuery]);
  return (
    <>
      <Navbar />
      <div className="search-page">
        <div className="search-page-input">
          <input
            type="text"
            placeholder="Buscar por username"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
          />
        </div>
        <div className="search-page-results page-results-not-available">
          {queryResult.map((user) => {
            return (
              <a
                className="search-page-result"
                key={user.username}
                href={`/profile/${user.username}`}
              >
                {user.username}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Search;
