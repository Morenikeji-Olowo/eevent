import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../../styles/EventComments.css";
import { buildCommentTree } from "../../utils/commentTree";

const EventComments = ({ eventId }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const sendComment = async () => {
    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/Event/addEventComment.php",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event_Id: eventId, commentItem: comment }),
        }
      );

      const response = await res.json();

      if (response.success) {
        toast.success("Comment sent");
        setComment("");
        await getComment(); // refresh so new comment shows with date + pfp
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const getComment = async () => {
    try {
      const res = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/Event/getEventComments.php",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event_Id: eventId }),
        }
      );

      const response = await res.json();

      if (response.success) {
        const tree = buildCommentTree(response.comments);
        setAllComments(tree);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sendReply = async (parentId) => {
    if (!replyText.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/Event/addEventComment.php",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event_Id: eventId,
            commentItem: replyText,
            parent_id: parentId,
          }),
        }
      );

      const response = await res.json();

      if (response.success) {
        toast.success("Reply sent");
        setReplyText("");
        setReplyTo(null);
        await getComment();
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderComments = (comments) =>
    comments.map((c) => (
      <div key={c.comment_id} className="event-comment-item">
        <div className="event-comment-left">
          <img
            src={
              c.pfp
                ? `http://localhost/React/eevent/src/uploads/pfp/${c.pfp}`
                : "http://localhost/React/eevent/src/uploads/pfp/default-avatar.png"
            }
            alt=""
          />
          <div className="event-comment-text">
            <p>
              <b>{c.username}</b>
            </p>
            <p>{c.comment_text}</p>
            <button onClick={() => setReplyTo(c.comment_id)}>reply</button>
          </div>

          {replyTo === c.comment_id && (
            <div className="reply-box">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
              />
              <button onClick={() => sendReply(c.comment_id)}>Send</button>
            </div>
          )}
        </div>
        <small>{formatDate(c.created_at)}</small>

        {/* Nested replies */}
        {c.replies.length > 0 && (
          <div className="event-replies">{renderComments(c.replies)}</div>
        )}
      </div>
    ));

  useEffect(() => {
    getComment();
  }, [eventId]);

return (
  <div className="event-comment-section">
    <h2>Comments</h2>
    <div className="event-comment-container">
      <div className="events-comments">
        {allComments.length === 0 ? (
          <h3>No comments yet...</h3>
        ) : (
          renderComments(allComments)
        )}
      </div>
    </div>

    <div className="send-comment">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Comment on this event..."
      />
      <button onClick={sendComment}>Send</button>
    </div>
  </div>
);

};

export default EventComments;
