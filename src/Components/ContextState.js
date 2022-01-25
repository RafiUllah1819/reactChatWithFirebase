import React, {useState } from "react";
import { contextNode } from "./Context";

export const ContextState = (props) => {
  const [messages, setMessages] = useState([]);
  const contextValue = {
    messages,
    setMessages
  };
  return (
    <div>
      <contextNode.Provider value={contextValue}>
        {props.children}
      </contextNode.Provider>
    </div>
  );
};
