import React, {useState, useContext } from "react";
import "font-awesome/css/font-awesome.min.css";
import "font-awesome/css/font-awesome.min.css";
import { auth, db } from "../Config/FirbaseConfig";
import { signOut } from "firebase/auth";
import { collection } from "firebase/firestore";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { Room1 } from "./Room1";
import { contextNode } from "./Context";
import { Allusers } from "./Allusers";


const collecionsArr = ["Room1", "Room2" , 'Room3'];

export const Chat = () => {
  const { messages, setMessages } = useContext(contextNode);
  const [selectedCollection, setSelectedCollection] = useState(collecionsArr[0]);
  console.log('room', selectedCollection)
  const mystyle = {
    background: 'blue',
    color:'#000'
  }

  const signout = () => {
    signOut(auth).then(() => console.log("singout successfully"));
    localStorage.removeItem("token").catch((err) => console.log("err", err));
  };
  return (
    <div className="main-section">
      <Tab.Container id="left-tabs-example"  defaultActiveKey="link-1">
        <Row>
          <Col sm={4}>
            <Nav variant="pills" className="flex-column">
              {collecionsArr.map((item, index) => (
                
                <Nav.Item key={index}>
                  {console.log('index' , index)}
                  <Nav.Link
                  // style={{backgroundColor:'white', color:'black'}}
                 style={{backgroundColor: index ? 'gray':'blue'}}
                    eventKey="link-1"
                    onClick={() => {
                      setSelectedCollection(collecionsArr[index]);
          
                    }}
                  >
                    {/* <Sidebar room={item} /> */}
                    {item}
                    {console.log('item' , item)}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane eventKey="link-1">
                <Room1
                  signout={signout}
                  messages={messages}
                  auth={auth}
                  createCollection={collection(db, selectedCollection)}
                  room = {selectedCollection}
                />
                <Allusers
                  currentCollection={selectedCollection}
                  createCollection={collection(db, selectedCollection)}
                  updateMessages={(msgs) => setMessages(msgs)}
                />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};
