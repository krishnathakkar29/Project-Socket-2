import React from "react";
// import Avatar from 'react-avatar'
import { Avatar } from "@mui/material";

const Client = ({ username }) => {
  return (
    <div className="client">
      <Avatar
        name={username}
        sx={{
          width: "50px",
          height: "50px",
        }}
      />

      <span className="userName">{username}</span>
    </div>
  );
};

export default Client;
