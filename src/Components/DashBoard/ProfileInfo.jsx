import React, { useEffect, useState } from "react";
import "../../styles/ProfileInfo.css";
import ProfileCard from "../Profile/ProfileCard";

const ProfileInfo = () => {
  const [user, setUser] = useState(null);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);

  const fetchUserData = async () => {
    try {
      const res = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/Profile/fetchUserProfileDetails.php",
        { credentials: "include" }
      );

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
        setFollowersCount(data.followersCount);
        setFollowingCount(data.followingCount);
        setPostsCount(data.postsCount);
        setEventsCount(data.eventsCount);
        setPosts(data.posts);
        setEvents(data.events);

        console.log(data.user);
        console.log(data.followersCount);
        console.log(data.followingCount);
        console.log(data.postsCount);
        console.log(data.eventsCount);
        console.log(data.posts);
        console.log(data.events);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.log("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <ProfileCard
      user={user}
      followersCount={followersCount}
      followingCount={followingCount}
      postsCount={postsCount}
      eventsCount={eventsCount}
      posts={posts}
      events={events}
    />
  );
};

export default ProfileInfo;
