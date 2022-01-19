import React, { useState, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import "font-awesome/css/font-awesome.min.css";
import { auth, db } from "../Config/FirbaseConfig";
import { signOut } from "firebase/auth";
import { collection, onSnapshot, query, orderBy ,limit } from "firebase/firestore";
import { SendMessages } from "./SendMessages";
import { Messages } from "./Messages";
import { Allusers } from "./Allusers";
import { Sidebar } from "./Sidebar";
import {Tab, Container, Row, Col, Nav, } from 'react-bootstrap'

export const Chat = () => {
  const [messages, setMessages] = useState([]);

  //   console.log("createCollection", createCollection);
  //   console.log("Messages", messages);
  
  useEffect(() => {
    const messagesCollection = collection(db, "room1");
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
<div className="main-section">
<Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row>
    <Col sm={4}>
      <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey="first"><Sidebar /></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second">Room 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="third">Room 3</Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
    <Col sm={8}>
      <Tab.Content>
        <Tab.Pane eventKey="first">
        <div className="chat">
      <div className="signout">
        <button className="btn btn-primary signout" onClick={signout}>
          Logout
        </button>
      </div>
     <div className="flex">
      {/* <div><i className="fa fa-users"></i></div> */}
     <h6 className="text-center">Group Chat</h6>
    {/* <Allusers messages={messages}/> */}
     </div>
      <div className="msgs">
        {messages?.map(({ id, text, photoURL, uid, today , displayName }) => {
          return (
            <div>
              <div
                key={id}
                className={`msg ${
                  uid === auth.currentUser.uid ? "sent" : "received"
                }`}
              >
                <div className="top">
                  <div><img src={photoURL} alt=""></img></div>
                <div>{uid === auth.currentUser.uid ? <span className="me">Me</span>: <span className="other">{displayName}</span>}</div>
                </div>
               <div> <span className="msg-tex">{text}</span></div>
    
                <span className="time">{today}</span>
              </div>
              <Messages messages={messages} />
            </div>
          );
        })}
      </div>
      <SendMessages />
    </div>
        </Tab.Pane>
        <Tab.Pane eventKey="second">
        <div className="chat">second</div>
        </Tab.Pane>
        <Tab.Pane eventKey="third">
        <div className="chat">third</div>
        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>

</div>
  );
};
