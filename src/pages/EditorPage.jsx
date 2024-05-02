import React, { useEffect, useRef, useState } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";

const EditorPage = () => {
  const socketRef = useRef();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
    };

    init();
  }, []);

  const [clients, setClients] = useState([
    { socketId: 1, username: "Krishna" },
    { socketId: 2, username: "John" },
  ]);
  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img src="/code-sync-logo.png" alt="" />
          </div>

          <h3>Connected</h3>

          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn">Copy Room ID</button>
        <button className="btn leaveBtn">Leave</button>
      </div>

      <div className="editorWrap">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
