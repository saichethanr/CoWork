import React, { useState, useRef, useEffect } from 'react';
import Client from '../Components/Client';
import './CSS/Editorpage.css';
import Editor from "@monaco-editor/react";
import ACTIONS from '../Actions';
import toast from 'react-hot-toast';
import { useLocation , useNavigate, Navigate,useParams} from 'react-router-dom';
import { initSocket } from '../socket';
const EditorPage = () => {
  const [clients, setClients] = useState([]);

  const files = {
    "script.py": {
      name: "script.py",
      language: "python",
      value: "Here is some python text"
    },
    "index.html": {
      name: "index.html",
      language: "html",
      value: "<html></html>"
    }
  };

  const [fileName, setFileName] = useState("script.py");
  const editorRef = useRef(null);
  const file = files[fileName];

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function getEditorValue() {
    alert(editorRef.current.getValue());
  }

  const reactNavigator = useNavigate();
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();

  function handleErrors(e) {
    console.log('socket error', e);
    toast.error('Socket connection failed, try again later.');
    reactNavigator('/');
}

  useEffect(() => {
    const init = async () => {
      
      const socket = await initSocket();
      socketRef.current = socket;
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

  
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      
      socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} joined the room`);
          console.log(`${username} joined the room`);
        }
        console.log(clients);
        setClients(clients);
      });
    };
    init();
  }, []);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mainwrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoImage" src="/COWORK.png" alt="logo" />
          </div>
          <h3>Collaborators</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn">Copy ROOM ID</button>
        <button className="btn leaveBtn">Leave</button>
      </div>
      <div className="editorwrap">
        <button onClick={() => setFileName("index.html")}>
          Switch to index.html
        </button>
        <button onClick={() => setFileName("script.py")}>
          Switch to script.py
        </button>
        <button onClick={getEditorValue}>
          Get Editor Value
        </button>
        <Editor
          height="100vh"
          width="100%"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          path={file.name}
          defaultLanguage={file.language}
          defaultValue={file.value}
          options={{
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  );
};

export default EditorPage;
