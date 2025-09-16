import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import "../../styles/PostComment.css";

const PostComment = ({ postItem }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [commentNumber, setCommentNumber] = useState(null);
  const [commentClicked, setCommentClicked] = useState(false);
  const lastCommentRef = useRef();

  const getCommentNo = async () => {
    try {
      const res = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/Post/commentCount.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ post_Id: postItem.post_id }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setCommentNumber(data.count);
      }
    } catch (err) {
      console.log("Error fetching count:", err);
    }
  };

  const getComments = async () => {
    try {
      const res = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/Post/getComments.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ post_Id: postItem.post_id }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setComments(data.allComments);
      }
    } catch (err) {
      console.log("Error fetching comments:", err);
    }
  };

  const addComment = async () => {
    if (!comment.trim()) return;

    try {
      const res = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/Post/postComments.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            commentText: comment,
            post_Id: postItem.post_id,
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setComment("");
        setComments((prev) => [...prev, data.comment]);
        setCommentNumber((prev) => (prev !== null ? prev + 1 : 1));
      }
    } catch (err) {
      console.log("Error adding comment:", err);
    }
  };

  useEffect(() => {
    getCommentNo(); // load count on mount
  }, []);

  useEffect(() => {
    if (commentClicked) {
      getComments();
    }
  }, [commentClicked, postItem]);

  useEffect(() => {
    lastCommentRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  return (
    <>
      <div>
        <FontAwesomeIcon icon={faComment} fontSize={"1.2rem"} color="black"/>
      </div>

      <div className="view-comments" onClick={() => setCommentClicked((prev) => !prev)}>
      <strong>{commentNumber ?? 0}</strong>
        </div>
      {commentClicked && (
        <div className="comment-container" onClick={()=> setCommentClicked((prev)=>!prev)}>
          <div
            className="comment-overlay"
            onClick={(e) => e.stopPropagation()}
          >


            <h2>Comments</h2>
            <div className="all-comments">
              {comments.length === 0 ? (
                <h1>No comments yet</h1>
              ) : (
                comments.map((item) => (
                  <div className="each-comment" key={item.comment_id}>
                    <img
                      src={
                        item.pfp
                          ? `http://localhost/React/eevent/src/uploads/pfp/${item.pfp}`
                          : "http://localhost/React/eevent/src/uploads/pfp/default-avatar.png"
                      }
                      alt=""
                    />
                    <div className="each-comment-text">
                      <p>@{item.username}</p>
                      <h3>{item.comment_text}</h3>
                    </div>
                  </div>
                ))
              )}
              <div ref={lastCommentRef} />
            </div>

            <div className="post-comment-controls">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="post-comment-input"
                placeholder="Write a comment..."
                required
              />
              <button onClick={addComment}>Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostComment;
