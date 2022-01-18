import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { Chat } from "./Components/Chat";
import { Signin } from "./Components/Signin";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Config/FirbaseConfig";

function App() {
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  // console.log("userCr", user);
  return <div className="App">{user ? <Chat /> : <Signin />}</div>;
}

export default App;
