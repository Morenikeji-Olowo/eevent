import React, { useState, useEffect } from "react";
import '../styles/Explore.css'
function FollowBtn({ profileUserId }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const STATUS_URL = "http://localhost/React/eevent/src/BackEnd/src/FollowSystem/getFollowStatus.php";
  const TOGGLE_URL = "http://localhost/React/eevent/src/BackEnd/src/FollowSystem/toogleFollow.php";

  // Fetch initial follow state
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(STATUS_URL, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profileUserId }),
        });
        const data = await res.json();
        setIsFollowing(data.isFollowing);
      } catch (err) {
        console.error("Error fetching follow status:", err);
      }
    };
    fetchStatus();
  }, [profileUserId]);

  const toggleFollow = async () => {
    try {
      const res = await fetch(TOGGLE_URL, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiverId: profileUserId }),
      });
      const data = await res.json();
      if (data.success) setIsFollowing(data.isFollowing);
    } catch (err) {
      console.error("Error toggling follow:", err);
    }
  };

  return (
    <div className="follow-user-btn">
      <button onClick={toggleFollow}>
      {isFollowing ? "Following" : "Follow"}
    </button>
    </div>
  );
}

export default FollowBtn;
