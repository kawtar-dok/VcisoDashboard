import React, { useEffect } from "react";
import "./MessageShow.css";
import Chat from "./container/Chat";
import Sidebar from "./container/Sidebar";
import { Route, Routes } from "react-router-dom";
import Login from "./container/Login";
import { useStateValue } from "./Contex/StateProvider";
import { auth } from "./config/firebase";
import { useParams } from "react-router-dom";

function MessageShow() {
  const [{ user }, dispatch] = useStateValue();
  const {id} = useParams();
  useEffect(() => {
    console.log(id);
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div className="app">
     
      {!user ? (
        <Login />
      ) : (
        <div className="app__container">
          <Sidebar />
          <Chat />
        </div>
      )}
    </div>
  );
}

export default MessageShow;
