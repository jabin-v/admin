import Sidebar from "../../components/sidebar/Sidebar";
import socketIOClient from "socket.io-client";
import "./style.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetMessageRecieved,
  setChatRooms,
  setMessgeRecieved,
  setSocket,
  setSocketGlobal,
} from "../../features/chat/chatSlice";
import UserChat from "../../components/userChat/UserChat";
import {
  selectCurrentRoles,
  selectCurrentToken,
} from "../../features/auth/authSlice";

const Chat = ({ socket }) => {
  const chatRooms = useSelector((state) => state.chats.chatRooms);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer admin-chat">
        {Object.entries(chatRooms).map((chatRoom, index) => (
          <UserChat
            idk={index}
            chatRoom={chatRoom}
            roomIndex={index + 1}
            socketUser={chatRoom[0]}
            socket={socket}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Chat;
