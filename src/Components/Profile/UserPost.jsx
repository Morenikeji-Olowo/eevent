import React, { useState } from "react";
import "../../styles/ProfileInfo.css";
import PostPreview from "./PostPreview";

const UserPost = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState(null); // store the clicked post

  if (!posts || posts.length === 0) {
    return <p className="no-posts">No posts yet</p>;
  }

  return (
    <div className="post-container-user">
      {posts.map((post) => (
        <div
          className="post-card"
          key={post.post_id}
          onClick={() => setSelectedPost(post)} // set clicked post
        >
          {/* Show image only if post has one */}
          {post.image_url && (
            <img
              src={`http://localhost/React/eevent/src/${post.image_url}`}
              alt="user-post"
              className="post-image"
            />
          )}

          {/* Caption + Date */}
          <div className="post-info">
            <p className="post-caption">{post.caption}</p>
            <span className="post-date">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}

      {/* Overlay - shows only when a post is selected */}
      {selectedPost && (
        <PostPreview 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} // pass a close handler
        />
      )}
    </div>
  );
};

export default UserPost;
