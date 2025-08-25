import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../../Components/DashBoard/Nav/Nav";
import SideBar from "../../Components/DashBoard/SideBar/SideBar";
import "./DashBoard.css";

const DashBoard = () => {
  const [toogle, setToogle] = useState(false);

const handleToogle = () => {
  setToogle(prev => !prev); // toggles between true/false
};

  return (
    <div className="dashboard">
      <div className="nav">
        <Nav  handleToogle={handleToogle} />
      </div>
      <div className="content-wrapper">
        <div className={`side-bar ${toogle === true ? "active" : "hide"} `}>
          <SideBar />
              </div>
              
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
