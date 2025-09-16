import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../../styles/Nav.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { useAtom } from "jotai";
import { navNavigationState } from "../../utils/jotai/atoms";

const Nav = () => {
  const [navState, setNavState] = useAtom(navNavigationState)
  return (
    <div className="nav">
      <div className="nav-container">
        <div className="nav-controls">
          {/* NavLink will add "active" class when route matches */}
          <NavLink 
            to="/dashBoard/feed" 
        className={`nav-control ${navState === "feed" ? "active-tab" : ""}`}
        onClick={()=>setNavState("feed")}
          >
            
            <h2>Feed</h2>
            <div className="line-below"></div>
          </NavLink>

          <NavLink 
            to="/dashBoard/event-feed" 
        className={`nav-control ${navState === "event" ? "active-tab" : ""}`}
        onClick={()=> setNavState("event")}

          >
            <h2>Events</h2>
            <div className="line-below"></div>
          </NavLink>

        </div>

        {/* Add plus icon */}
        <div className="actions">
          <div className="plus-icon">
            <Link to="/dashBoard/create-post">
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>
          <div className="chat-icon">
            <Link to="/dashBoard/chat-section">
              <FontAwesomeIcon icon={faComment} fontSize={'1.6rem'} color="black"/>
            </Link>
          </div>
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/dashBoard/explore">
            <h3>explore</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
