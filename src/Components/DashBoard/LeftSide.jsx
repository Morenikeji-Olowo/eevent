import React, { useEffect, useState } from "react";
import "../../styles/DashBoard.css";
import avatar from "../../assets/images/hero_caster.avif";
import hightlight1 from "../../assets/images/626810eed40e8545511c4bf8a5727a2e.jpg";
import hightlight2 from "../../assets/images/3bac259bdd3797a9761e3de0709403d8.jpg";
import hightlight3 from "../../assets/images/24d4bf34b25f206902323ed49dc2400b.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendar,
  faHome,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import Logout from "../Logout";
import { fetchDetailsOfUser } from "../../utils/fetchUserData/fetchData";
import { useNavigate } from "react-router-dom";
import FetchHighLight from "../HighLights/FetchHighLight";
import GetFollowers from "../Profile/GetFollowers";
import GetFollowing from "../Profile/GetFollowing";

const LeftSide = () => {
  const [active, setActive] = useState("Home");
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [events, setEvents] = useState(0);
  const handleClick = (label) => {
    setActive(label);

    switch (label) {
      case "Profile":
        navigate("/dashBoard/profile-info");
        break;
      case "Plan Event":
        navigate("/dashBoard/plan-event");
        break;
      case "Home":
        navigate("/dashBoard/feed");
        break;
      case "Settings":
        navigate("/dashBoard/settings");
        break;
    }
  };
  // LeftSide.jsx
  const fetchStats = () => {
    fetch(
      "http://localhost/React/Eevent/src/BackEnd/src/FollowSystem/getFollowersStats.php",
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFollowers(data.followers);
          setFollowing(data.following);
          setEvents(data.event);
        }
      });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchDetailsOfUser()
      .then((res) => {
        if (res.success) {
          setUserDetails(res.data);
        } else {
          toast.error(res.message || "Failed to fetch user data");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="left-sidebar">
      <div className="profile-section">
        <img
          src={
            userDetails.pfp
              ? `http://localhost/React/eevent/src/uploads/pfp/${userDetails.pfp}`
              : avatar
          }
          alt="User Avatar"
          className="avatar"
        />{" "}
        <h2>{userDetails.displayName}</h2>
        <p>@{userDetails.username}</p>
        <p className="bio-data">{userDetails.bio}</p>
        <div className="stats">
          <span>
            <strong>472</strong> 
            <div>Posts</div>
          </span>
          <span>
            <strong>{following}</strong> 
            <GetFollowing user_id={userDetails.user_id} />
          </span>
          <span>
            <strong>{followers}</strong>{" "}
            <GetFollowers user_id={userDetails.user_id} />
          </span>
          <span>
            <strong>{events}</strong> 
            <div>Events</div>
          </span>
        </div>
      </div>

      <div className="highlights">
        <p>Highlights</p>
        <FetchHighLight />
      </div>

      <nav className="nav-links">
        <button
          className={active === "Profile" ? "active" : ""}
          onClick={() => handleClick("Profile")}
        >
          <FontAwesomeIcon icon={faUser} fontSize={15} /> Profile
        </button>
        <button
          className={active === "Plan Event" ? "active" : ""}
          onClick={() => handleClick("Plan Event")}
        >
          <FontAwesomeIcon icon={faCalendar} fontSize={15} /> Plan Event
        </button>
        <button
          className={active === "Home" ? "active" : ""}
          onClick={() => handleClick("Home")}
        >
          <FontAwesomeIcon icon={faHome} fontSize={15} /> Home
        </button>
        <button
          className={active === "Settings" ? "active" : ""}
          onClick={() => handleClick("Settings")}
        >
          <FontAwesomeIcon icon={faCog} fontSize={15} /> Settings
        </button>
        <button
          className={active === "Settings" ? "active" : ""}
          onClick={() => handleClick("Settings")}
        >
          <FontAwesomeIcon icon={faCog} fontSize={15} /> Manage Events
        </button>
      </nav>
      <Logout />
    </div>
  );
};

export default LeftSide;
