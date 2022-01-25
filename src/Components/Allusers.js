import React, { useEffect, useContext } from "react";

import { onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { contextNode } from "./Context";

export const Allusers = (props) => {
  const { createCollection, updateMessages, currentCollection } = props;
  console.log("createcollection", createCollection);
  const { setMessages } = useContext(contextNode);

  useEffect(() => {
    const queryCollection = query(
      createCollection,
      orderBy("createdAt"),
      limit(50)
    );

    const unsubscribe = onSnapshot(
      queryCollection,
      (snapshot) => {
        if (!snapshot.empty) {
          const updatedMessages = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          setMessages(updatedMessages);
          updateMessages(updatedMessages);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsubscribe();
  }, [currentCollection]);

  return <div></div>;
};
