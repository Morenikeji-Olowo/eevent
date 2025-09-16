import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "../../styles/Explore.css";
import { data, useNavigate } from "react-router-dom";
import FollowBtn from "../FollowBtn";

const Explore = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleUserClick = (userId) => {
    // Navigate to the user's profile or perform any action
    navigate(`/dashBoard/searchUserResult/${userId}`);
  };

  useEffect(() => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(
          `http://localhost/React/Eevent/src/BackEnd/src/Explore/findUsers.php?q=${query}`
        );
        const data = await res.json();
        setSearchResults(data);
      } catch (err) {
        console.error(err);
      }
    }, 300); // debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <>
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {searchResults.length > 0 ? (
        <div className="search-results">
          {searchResults.map((search, index) => (
            <div key={index} className="user-card">
              <div className="user-avatar">
                <img
                  src={
                    search.pfp
                      ? `http://localhost/React/eevent/src/uploads/pfp/${search.pfp}`
                      : "http://localhost/React/eevent/src/uploads/pfp/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.avif"
                  }
                  alt={search.displayName}
                />
              </div>
              <div className="user-info">
                <div className="user-text-info">
                  <h3>@{search.username}</h3>
                  <p>{search.displayName}</p>
                </div>
                <div className="follow-user-btn">
                  <FollowBtn profileUserId={search.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found</p>
      )}
    </>
  );
};

export default Explore;
