import React, { useState } from "react";
import "../../styles/DashBoard.css";
import Nav from "../../Components/DashBoard/Nav";
import LeftSide from "../../Components/DashBoard/LeftSide";
import RightSide from "../../Components/DashBoard/RightSide";
import { Outlet } from "react-router-dom";
import RightToogleBtn from "../../Components/RightToogleBtn";
import { useAtom } from "jotai";
import {rightSideCollapsed } from "../../utils/jotai/atoms";

const DashBoard = () => {
  const [collapsed, setCollapsed] = useAtom(rightSideCollapsed);

  return (
    <>
      <div className="nav-bar">
        <Nav />
      </div>

      <div className="dashboard-container">
        <div className="left-side-dashboard">
          <LeftSide />
        </div>
        
        <div className="middle-side">
          <Outlet />
        </div>
        <RightToogleBtn/>

        {!collapsed && (
          <div className="right-side-dashboard">
            <RightSide />
          </div>
        )}
      </div>
    </>
  );
};

export default DashBoard;
