import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyA1sUD0_QaSkoBO70ckdvkguu5ACoa0KuI",
  authDomain: "mychatapp-84fd3.firebaseapp.com",
  projectId: "mychatapp-84fd3",
  storageBucket: "mychatapp-84fd3.appspot.com",
  messagingSenderId: "551098613612",
  appId: "1:551098613612:web:6fb64b52df2f956c933d49",
  measurementId: "G-EC5G23V85L"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
