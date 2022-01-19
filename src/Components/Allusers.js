import React from "react";

export const Allusers = ({ messages }) => {
  return (
    <div>
      {messages?.map(({ displayName }) => {
        return <span>{displayName}</span>;
      })}
    </div>
  );
};
