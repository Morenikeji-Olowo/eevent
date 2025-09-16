import React, { useState } from "react";
import "../../styles/ProfileInfo.css";
import AddHighlight from "../HighLights/AddHighlight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faGridHorizontal,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import UserPost from "./UserPost";
import UserEvents from "./UserEvents";
import FetchHighLight from "../HighLights/FetchHighLight";
import GetFollowers from "./GetFollowers";
import GetFollowing from "./GetFollowing";

const ProfileCard = ({
  user,
  followersCount,
  followingCount,
  postsCount,
  eventsCount,
  posts,
  events,
}) => {
  const [tabState, setTabState] = useState("posts");
  if (!user) {
    return <p>Loading profile...</p>; // Prevent crash while fetching
  }
  return (
    <div className="profile-info-container">
      <div className="top-section-profile">
        {console.log(user)}
        <div className="left-profile-img">
          <img
            src={
              user.pfp !== null
                ? `http://localhost/React/eevent/src/uploads/pfp/${user?.pfp}`
                : "http://localhost/React/eevent/src/uploads/pfp/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.avif"
            }
            alt="pfp"
          />
        </div>
        <div className="right-side-profile">
          <h1>{user.displayName}</h1>
          <h4>@{user.username}</h4>

          <div className="interactivity">
            <div className="interact">
              <strong>{postsCount}</strong>
              <p>posts</p>
            </div>
            <div className="interact">
              <strong>{followingCount}</strong>
              <GetFollowing user_id={user.user_id} />
            </div>
            <div className="interact">
              <strong>{followersCount}</strong>
              <GetFollowers user_id={user.user_id} />
            </div>
            <div className="interact">
              <strong>{eventsCount}</strong>
              <p>events</p>
            </div>
          </div>

          <div className="bio">
            <p>{user.bio}</p>
          </div>
          <div className="edit-btn">
            <button>edit profile</button>
          </div>
        </div>
      </div>

      <section className="highlight-section">
        <h2>Highlights</h2>
        <div className="highlights-profile">
          <AddHighlight />
          <div className="fetched-highlight">
            <FetchHighLight />
          </div>
        </div>
      </section>

      <section className="profile-tabs">
        <button
          className={tabState === "posts" ? "tab-btn active" : "tab-btn"}
          onClick={() => setTabState("posts")}
        >
          <FontAwesomeIcon fontSize={"2rem"} icon={faGridHorizontal} />
        </button>

        <button
          className={tabState === "events" ? "tab-btn active" : "tab-btn"}
          onClick={() => setTabState("events")}
        >
          <FontAwesomeIcon fontSize={"2rem"} icon={faTicket} />
        </button>

        <button
          className={tabState === "saved" ? "tab-btn active" : "tab-btn"}
          onClick={() => setTabState("saved")}
        >
          <FontAwesomeIcon fontSize={"2rem"} icon={faBookmark} />
        </button>
      </section>

      <section className="tab-display">
        {tabState === "posts" && <UserPost posts={posts} />}

        {tabState === "events" && <UserEvents events={events} />}

        {tabState === "saved" && <div>saved</div>}
      </section>
    </div>
  );
};

export default ProfileCard;
