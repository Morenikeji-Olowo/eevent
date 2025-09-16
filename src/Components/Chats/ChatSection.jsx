import React, { useState } from "react";
import FirendList from "./firendList";
import Messages from "./Messages";
import '../../styles/chatSection.css'

const ChatSection = () => {
    const [selectedFriend, setSelectedFriend] = useState(null)
  return (
    <div className="chat-container">
      <div className="leftPanel">
        <FirendList setSelectedFriends={setSelectedFriend} />
      </div>
      <div className="rightPanel">
        <Messages selectedFriend={selectedFriend} />
      </div>
    </div>
  );
};

export default ChatSection;
