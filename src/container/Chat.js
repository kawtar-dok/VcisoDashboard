/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, Mic, Mood, MoreVert, Search } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import "./Chat.css";
import Message from "./Message";
import db from "../config/firebase";
import { useStateValue } from "../Contex/StateProvider";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import useMutationObserver from "@rooks/use-mutation-observer";
import EmojiPicker from "emoji-picker-react";
import { timeFromNow } from "../utils/utils";

function Chat({ roomId }) {
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [{ user }] = useStateValue();
  const { id } = useParams();
  const messageRef = useRef();

  useMutationObserver(messageRef, () => {
    messageRef.current.scrollTop = messageRef.current.scrollHeight;
  });

  useEffect(() => {
    console.log(id)
    if (id) {
      db.collection("rooms")
        .doc(id)
        .onSnapshot((snapshot) => setRoomName(snapshot.data()?.name));

      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [id]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      db.collection("rooms").doc(id).collection("messages").add({
        name: user?.displayName,
        email: user?.email,
        message: input,
        photoURL: user?.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setInput("");
  };

  const emojiHandler = (e, emoji) => setInput((prevInput) => prevInput + emoji.emoji);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={messages[messages.length - 1]?.data?.photoURL} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>{messages[0] && timeFromNow(messages[messages.length - 1]?.data?.timestamp)}</p>
        </div>
       
      </div>
      <div className="chat__body" ref={messageRef}>
        {messages.map(({ id, data }) => (
          <Message
            key={id}
            name={data.name}
            email={data.email}
            message={data.message}
            timestamp={data.timestamp}
          />
        ))}
      </div>
      <div className={`chat__emojiPicker ${clicked ? "" : ""}`}></div>
      <div className="chat__footer">
        <IconButton onClick={() => setClicked(!clicked)}>
          <Mood className="chat__footerMood" />
        </IconButton>
        <IconButton>
          <AttachFile className="chat__footerAttach" />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button style={{ display: "none" }} onClick={sendMessage} type="submit">
            Send Messege
          </button>
        </form>
        <IconButton>
          <Mic className="chat__footerMic" />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
