import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import "../../styles/DashBoard.css";
import FollowBtn from "../FollowBtn";
import PostComment from "../Comments/PostComment";
import LikePost from "../likes/LikePost";

const Post = () => {
  const [posts, setPosts] = useState([]); // changed to array


  
  const fetchPost = async () => {
    try {
      const res = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/Post/fetchPost.php"
      );
      const data = await res.json();

      if (data.success) {
        setPosts(data.posts); // only set the posts array
      }
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  console.log(posts)
  return (
    <>
      {posts.length > 0 ? (
        <div className="all-post">
          {posts.map((postItem, index) => (
          <div className="posts" key={index}>
            <div className="post-container">
              <div className="post-header">
                <img
                  src={
                    postItem.pfp
                      ? `http://localhost/React/eevent/src/uploads/pfp/${postItem.pfp}`
                      : "http://localhost/React/eevent/src/uploads/pfp/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.avif"
                  }
                  alt={postItem.displayName}
                />
                <div className="user-info">
                  <h2>{postItem.displayName}</h2>
                  <p>@{postItem.username}</p>
                </div>
                <FollowBtn profileUserId={postItem.user_id} />
              </div>

              <p className="post-text">{postItem.caption}</p>

              {postItem.image_url && (
                <div className="image-wrapper">
                  <img
                    src={
                      postItem.image_url
                        ? `http://localhost/React/eevent/src/${postItem.image_url}`
                        : "http://localhost/React/eevent/src/uploads/pfp/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.avif"
                    }
                    alt="post"
                    className="post-image-feed"
                  />
                </div>
              )}

              <div className="post-actions">
                <div className="social">
                  <span>
                    <FontAwesomeIcon icon={faEye} /> <strong>234k</strong>
                  </span>
                  <span>
                    <LikePost post={postItem} />
                  </span>
                  <span>
                    <PostComment postItem={postItem}/>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Post;
