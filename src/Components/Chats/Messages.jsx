import React, { useEffect, useRef, useState } from "react";
import "../../styles/chatSection.css";
import { toast } from "react-toastify";

const Messages = ({ selectedFriend }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messageRef = useRef(null);

  useEffect(()=>{
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message])
  useEffect(() => {
    if (!selectedFriend) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost/React/Eevent/src/BackEnd/src/Chats/getMessages.php?friend_id=${selectedFriend.user_id}`,
          { credentials: "include" }
        );

        const text = await res.text();
        try {
          const data = JSON.parse(text);
          if (data.success) {
            setMessages(data.messages);
            setMessage("");
          } else console.log("Error fetching messages:");
        } catch (e) {
          console.error(" Invalid JSON from PHP:", text);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();
  }, [selectedFriend]);

  const sendMessage = async () => {
    if (!message.trim() || !selectedFriend) return;

    try {
      const res = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/Chats/sendMessages.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ message, friend_id: selectedFriend.user_id }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setMessage("");
        setMessages((prev) => [...prev, data.newMessage]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!selectedFriend) return <p>Select a friend to start chatting</p>;
  console.log(messages);
  return (
    <div className="chat-window">
      <div className="user-info-message">
        <img
          src={
            selectedFriend.pfp
              ? `http://localhost/React/eevent/src/uploads/pfp/${selectedFriend.pfp}`
              : "http://localhost/React/eevent/src/uploads/pfp/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.avif"
          }
          alt=""
        />
        <p>{selectedFriend.displayName}</p>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-bubble ${
              msg.sender_id === selectedFriend.user_id ? "received" : "sent"
            }`}
          >
            <div className="message-info">
              <img
                src={
                  msg.sender_pfp
                    ? `http://localhost/React/eevent/src/uploads/pfp/${msg.sender_pfp}`
                    : "http://localhost/React/eevent/src/uploads/pfp/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.avif"
                }
                alt=""
                className="message-pfp"
              />
              <p>{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="send-message">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <div ref={messageRef} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Messages;
