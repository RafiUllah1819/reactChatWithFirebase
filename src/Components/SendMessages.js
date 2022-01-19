import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../Config/FirbaseConfig";
import firebase from "firebase/compat/app";

import "firebase/compat/firestore";

export const SendMessages = () => {
  const handleKeyUP = (event) => {
    if (event.key === "Enter") {
      creatMessage();
    }
  };

  var today = new Date();
  today = today.toLocaleString("en-US", {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
    minute60: true,
  });
  // console.log("todayTime", today);

  const [msg, setMsg] = useState("");

  const createCollection = collection(db, "room1");
  const creatMessage = () => {
    if (msg.length < 1) {
      console.log("not sending msg");
    } else {
      const { uid, photoURL, displayName } = auth.currentUser;
      addDoc(createCollection, {
        text: msg,
        photoURL,
        uid,
        today,
        displayName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setMsg("");
    }
  };
  return (
    <div className="send-msg">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Type Messsage..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyPress={handleKeyUP}
        />
      </div>
      <button className="createbtn" onClick={creatMessage}>
        Send
      </button>
    </div>
  );
};
