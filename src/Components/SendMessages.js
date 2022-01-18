import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../Config/FirbaseConfig";
import firebase from "firebase/compat/app";
// import 'firebase/compat/auth';
import "firebase/compat/firestore";

export const SendMessages = () => {
  var today = new Date(),
    time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  console.log("currentitme", time);
  const [msg, setMsg] = useState("");

  const createCollection = collection(db, "userMsg");
  const creatMessage = () => {
    const { uid, photoURL ,displayName } = auth.currentUser;
    console.log("authcurrenuser", auth.currentUser.displayName);
    console.log("uidss", uid);
    console.log("uidss", photoURL);
    addDoc(createCollection, {
      text: msg,
      photoURL,
      uid,
      time,
      displayName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMsg("");
  };
  return (
    <div className="send-msg">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Messsage..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
      </div>
      <button className="createbtn" onClick={creatMessage}>
        Send
      </button>
    </div>
  );
};
