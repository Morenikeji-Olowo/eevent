import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/GetFollowers.css";

const GetFollowing = ({ user_id }) => {
  const [followingList, setFollowingList] = useState([]);
  const [view, setView] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchFollowing = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/Profile/followingList.php",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user_id }), // ✅ matches PHP
        }
      );

      const response = await res.json();

      if (response.success) {
        setFollowingList(response.allFollowing);
      } else {
        toast.error(response.message || "Failed to load followers");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error: Could not fetch followers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (view) fetchFollowing();
  }, [view]);

  return (
    <>
      <div onClick={() => setView((prev) => !prev)} className="view-followers">
        Following
      </div>

      {view && (
        <div
          className="followers-list-overlay-container"
          onClick={() => setView((prev) => !prev)}
        >
          {loading && <h2>Loading...</h2>}

          <div
            className="followers-list-overlay"
            onClick={(e) => e.stopPropagation()}
          >
            {followingList.length > 0 ? (
                <div className="followingList">
                                  {followingList.map((item, index) => (
                <div className="each-follower" key={index}>
                  <img
                    src={
                      item.pfp
                        ? `http://localhost/React/eevent/src/uploads/pfp/${item.pfp}`
                        : "http://localhost/React/eevent/src/uploads/pfp/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.avif"
                    }
                    alt={item.username}
                  />
                  <div className="follower-info">
                    <h2>{item.displayName}</h2>
                    <p>@{item.username}</p>
                  </div>
                </div>
              ))}
                </div>
            ) : (
              <p>No followers found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GetFollowing;
