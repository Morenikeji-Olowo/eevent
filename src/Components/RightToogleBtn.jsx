import React from "react";
import "../styles/RightToogleBtn.css";
import { useAtom } from "jotai";
import { rightSideCollapsed } from "../utils/jotai/atoms";

const RightToogleBtn = () => {
  const [collapsed, setCollapsed] = useAtom(rightSideCollapsed);

  return (
    <div className="right-toggle-btn-container">
      <button
        className="collapse-btn"
        onClick={() => setCollapsed((prev) => !prev)}
      >
      </button>
    </div>
  );
};

export default RightToogleBtn;
