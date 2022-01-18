import React, { useState, useEffect } from "react";
// import 'font-awesome/css/font-awesome.min.css';
import "font-awesome/css/font-awesome.min.css";
import { auth, db } from "../Config/FirbaseConfig";
import { signOut } from "firebase/auth";
import { collection, onSnapshot, query, orderBy ,limit } from "firebase/firestore";
import { SendMessages } from "./SendMessages";

export const Chat = () => {
  const [messages, setMessages] = useState([]);

  //   console.log("createCollection", createCollection);
  //   console.log("Messages", messages);
  
  useEffect(() => {
    const messagesCollection = collection(db, "userMsg");
    const queryCollection= query(messagesCollection ,orderBy('createdAt') , limit(50) )

    const unsubscribe = onSnapshot(
      queryCollection, (snapshot) => {
        if (!snapshot.empty) {
          const updatedMessages = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          setMessages(updatedMessages);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsubscribe();
  }, []);

  const signout = () => {
    signOut(auth).then(() => console.log("singout successfully"));
    localStorage.removeItem("token").catch((err) => console.log("err", err));
  };
  return (
    <div className="chat">
      <div className="signout">
        <button className="btn btn-primary signout" onClick={signout}>
          Logout
        </button>
      </div>
      <h4 className="text-center">Chat app</h4>
      <div className="msgs">
        {messages?.map(({ id, text, photoURL, uid, time , displayName }) => {
          return (
            <div>
              <div
                key={id}
                className={`msg ${
                  uid === auth.currentUser.uid ? "sent" : "received"
                }`}
              >
                <div><img src={photoURL} alt=""></img></div>
                <div><span className="name">{displayName}</span></div>
               <div> <span className="msg-tex">{text}</span></div>
    
                <span className="time">{time}</span>
              </div>
            </div>
          );
        })}
      </div>
      <SendMessages />
    </div>
  );
};
