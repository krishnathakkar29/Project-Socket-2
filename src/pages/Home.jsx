import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuid();
    setRoomId(id);
    toast.success("Created New Room")
  };
  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img src="./code-sync-logo.png" alt="logo" className="homePageLogo" />
        <h4 className="mainLabel">Paste Your Room ID here</h4>
        <div className="inputGroup">
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="inputBox"
            placeholder="Room ID"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="inputBox"
            placeholder="Username"
          />
          <button className="btn joinBtn">Join</button>
        </div>
        <span className="createInfo">
          If you don't have an invite then create &nbsp;
          <a onClick={createNewRoom} href="" className="createNewBtn">
            New Room
          </a>
        </span>
      </div>

      <footer>
        <h4>
          Built by <a href="https://github.com/krishnathakkar29">KT</a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
