import React from "react";
import { auth } from "../Config/FirbaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const Signin = () => {
  const signinWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        localStorage.setItem("token", res.user.accessToken);
        // console.log("token", res.user.accessToken);
      })
      .catch((err) => console.log(err));
    // console.log("provider", provider);
  };

  return (
    <div>
      <button onClick={signinWithGoogle}>SignnwithGoogle</button>
    </div>
  );
};
