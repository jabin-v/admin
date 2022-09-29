import React, { Fragment, useEffect, useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  addChat,
  resetMessageRecieved,
  setMessgeRecieved,
} from "../../features/chat/chatSlice";
import "./userChat.css";

const UserChat = ({ idk, chatRoom, roomIndex, socketUser,socket }) => {

 
  [window["toast" + roomIndex], window["closeToast" + roomIndex]] =
    useState(true);

  const close = () => {
    window["closeToast" + roomIndex](false);
  };


  const dispatch=useDispatch();


  //admin chat reply

const adminSubmitChatMsg=(e,elem)=>{
  e.preventDefault();

  if(e.keyCode && e.keyCode !==13){
    return
  }

  const msg=document.getElementById(elem);

  let v=msg.value.trim();

  if(v === ""||v===null || v===false || !v){
    return
  }



  // @@@@@@@@@@@chnage this after  socketuser come in t0 action@@@@@@@@@@@//
  dispatch(addChat({message:{
    admin:msg.value
  },user:socketUser}))

  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@resetting message state @@@@@@@@@@@@

  resetMessageRecieved();



  //@@@@@@@@@@@@@@@@admin send message to client@@@@@@@@@@@@@@@@@@@@@@@//

  socket.emit("admin sends message to client",{
    user:socketUser,
    message:v
  })

  dispatch(resetMessageRecieved())
  msg.focus();
  setTimeout(() => {
    msg.value=""
    
  }, 200);

  

  const chatMessages=document.querySelector(`.cht-msg${socketUser}`);

  if(chatMessages){
    chatMessages.scrollTop=chatMessages.scrollHeight;
  }
}

//user send scrolltop
useEffect(()=>{
  const chatMessages=document.querySelector(`.cht-msg${socketUser}`);

  if(chatMessages){
    chatMessages.scrollTop=chatMessages.scrollHeight;
  }
})



  return (
    <>
      <Toast
        show={window["toast" + roomIndex]}
        onClose={() => close()}
        className="ms-4 mb-5 toast"
        style={{ maxHeight: "600px" }}
      >
        <Toast.Header>
          <strong className="me-auto">chat {socketUser}</strong>
        </Toast.Header>
        <Toast.Body>
          <div 
          style={{ maxHeight: "300px", overflow: "auto" }}
          className={`cht-msg${socketUser}`}
          >
            {chatRoom[1].map((msg, idx) => (
              <div key={idx}>
                {msg.client && (
                  <p className="bg-primary p-2 ms-4 " >
                    <b>User wrote : </b>
                    {msg.client}
                  </p>
                )}
                {msg.admin && (
                  <p  >
                    <b>You : </b>
                    {msg.admin}
                  </p>
                )}
              </div>
            ))}
          </div>
          <Form>
            <Form.Group
            controlId={`adminChatMsg${roomIndex}`}
             className="mb-3">
              <Form.Label>Write your message</Form.Label>
              <Form.Control 
              onKeyUp={(e)=>adminSubmitChatMsg(e,`adminChatMsg${roomIndex}`)}
              as="textarea" rows={2} />
            </Form.Group>
            <Button 
            onClick={(e)=>adminSubmitChatMsg(e,`adminChatMsg${roomIndex}`)}
            variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default UserChat;
