import React from "react";
import "../../styles/PostPreview.css";
import DeletePost from "../Delete/DeletePost";

const PostPreview = ({ post, onClose }) => {
  return (
    <div className="overlay-container" onClick={onClose}>
      <div className="overlay" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {/* Left Side - Image + Caption */}
        <div className="left-side-profile">
          {post.image_url && (
            <img
              src={`http://localhost/React/eevent/src/${post.image_url}`}
              alt="overlay"
              className="overlay-image"
            />
          )}
          <div className="caption-date">
            <p className="overlay-caption">{post.caption}</p>
            <span className="overlay-date">
              {new Date(post.created_at).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Right Side - Comments */}
        <div className="right-side-comment">
          <h3>Comments</h3>
          {/* You can later map through post.comments here */}
          <p style={{ color: "#888" }}>No comments yet...</p>
        </div>

        <DeletePost postId={post.post_id}/>
      </div>
    </div>
  );
};

export default PostPreview;
