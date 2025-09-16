import React, { useState, useEffect } from "react";
import "../../styles/LikePost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const LikePost = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [allLikes, setAllLikes] = useState([]);
  const [overlay, setOverlay] = useState(false);
  const [likeNo, setLikeNo] = useState(0);

  const checkIfLiked = async () => {
  try {
    const res = await fetch(
      "http://localhost/React/Eevent/src/BackEnd/src/Post/hasLiked.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ post_Id: post.post_id }),
      }
    );
    const data = await res.json();
    if (data.success) {
      setIsLiked(data.liked); // true or false from backend
    }
  } catch (err) {
    console.log("Error checking like:", err);
  }
};

  // fetch like count
  const getLikeNo = async () => {
    try {
      const res = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/Post/likeCount.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ post_Id: post.post_id }),
        }
      );
      const data = await res.json();
      if (data.success) setLikeNo(data.count);
    } catch (err) {
      console.log("Error fetching like count:", err);
    }
  };

useEffect(() => {
  getLikeNo();      // fetch count
  checkIfLiked();   // check if user liked
}, []);


  // like/unlike
  const likePost = async () => {
    try {
      const res = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/Post/likePost.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ post_Id: post.post_id }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setIsLiked(data.action === "liked");
        getLikeNo(); // refresh count
      }
    } catch (err) {
      console.log("Error toggling like:", err);
    }
  };

  // fetch all likes
  const fetchLikes = async () => {
    try {
      const res = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/Post/getLikes.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ post_Id: post.post_id }),
        }
      );
      const data = await res.json();
      if (data.success) setAllLikes(data.allLikes);
    } catch (err) {
      console.log("Error fetching likes:", err);
    }
  };

  return (
    <>
      <div className="like-post">
        <div className="like-btn" onDoubleClick={likePost}>
          <FontAwesomeIcon
            icon={faHeart}
            fontSize="1.2rem"
            color={isLiked ? "red" : "black"}
          />
        </div>
      </div>

      <div
        onClick={() =>
          setOverlay((prev) => {
            if (!prev) fetchLikes();
            return !prev;
          })
        }
        className="view-likes"
      >
        <strong>{likeNo}</strong>
      </div>

      {overlay && (
        <div
          className="likes-container"
          onClick={() => setOverlay(false)}
        >
          <div className="likes-overlay" onClick={(e) => e.stopPropagation()}>
            <h2>Likes</h2>
            <div className="all-likes">
              {allLikes.length === 0 ? (
                <h1>No likes yet</h1>
              ) : (
                allLikes.map((item) => (
                  <div className="each-like" key={item.like_id}>
                    <img
                      src={
                        item.pfp
                          ? `http://localhost/React/eevent/src/uploads/pfp/${item.pfp}`
                      : "http://localhost/React/eevent/src/uploads/pfp/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.avif"
                      }
                      alt=""
                    />
                    <div className="each-like-text">
                      <p>@{item.username}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LikePost;
