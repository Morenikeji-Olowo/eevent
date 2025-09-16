import React, { useEffect, useState } from "react";
import "../../styles/chatSection.css";
import { useNavigate } from "react-router-dom";

const FirendList = ({ setSelectedFriends }) => {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  const fetchFriends = async () => {
    try {
      const res = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/Chats/findFriends.php",
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success) {
        setFriends(data.friends);
        console.log(data.friends);
      }
    } catch (err) {
      console.log("Error fetching friends:", err);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <div className="friends-list">
      <h2>Your Friends</h2>
      {friends.length === 0 ? (
        <p>No friends yet</p>
      ) : (
        <ul>
          {friends.map((friend) => (
            <div
              key={friend.user_id}
              onClick={() => setSelectedFriends(friend)}
              className="user-chats"
            >
              <img
                src={
                  friend.pfp
                    ? `http://localhost/React/eevent/src/uploads/pfp/${friend.pfp}`
                    : "http://localhost/React/eevent/src/uploads/pfp/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.avif"
                }
                alt=""
              />
              <p>{friend.displayName}</p>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FirendList;
