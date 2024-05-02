import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuid();
    setRoomId(id);
    toast.success("Created New Room");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Room ID & username is required");
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = (e) => {
    if(e.code === "Enter"){
      joinRoom()
    }
  }

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
            onKeyUp={handleInputEnter}
          />

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="inputBox"
            placeholder="Username"
            onKeyUp={handleInputEnter}
          />

          <button className="btn joinBtn" onClick={joinRoom}>
            Join
          </button>
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
