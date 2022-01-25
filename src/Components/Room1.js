import React from "react";
import { SendMessages } from "./SendMessages";
import { Messages } from "./Messages";

export const Room1 = (props) => {
  const { signout, messages, auth, createCollection, room } = props;
  console.log("all msgs ", messages);
  console.log("selectedCollection", room);
  return (
    <div className="chat">
      <div className="signout">
        <button className="btn btn-primary signout" onClick={signout}>
          Logout
        </button>
      </div>
      <div className="flex">
        {/* <div><i className="fa fa-users"></i></div> */}
        <h6 className="text-center" style={{ textTransform: "capitalize", fontSize: '20px' }}>
          {room}
        </h6>
        {/* <Allusers messages={messages}/> */}
      </div>
      <div className="msgs">
        {messages?.map(({ id, text, photoURL, uid, today, displayName }) => {
          return (
            <div>
              <div
                key={id}
                className={`msg ${
                  uid === auth.currentUser.uid ? "sent" : "received"
                }`}
              >
                <div className="top">
                  <div>
                    <img src={photoURL} alt=""></img>
                  </div>
                  <div>
                    {uid === auth.currentUser.uid ? (
                      <span className="me">Me</span>
                    ) : (
                      <span className="other">{displayName}</span>
                    )}
                  </div>
                </div>
                <div>
                  {" "}
                  <span className="msg-tex">{text}</span>
                </div>

                <span className="time">{today}</span>
              </div>
              <Messages messages={messages} />
            </div>
          );
        })}
      </div>
      <SendMessages createCollection={createCollection} />
    </div>
  );
};
