import { useState, useRef, useEffect } from 'react';
import Client from '../Components/Client';
import './CSS/Editorpage.css';
import ACTIONS from '../Actions';
import toast from 'react-hot-toast';
import { useLocation , useNavigate, Navigate,useParams} from 'react-router-dom';
import { initSocket } from '../socket';
import {Box} from "@chakra-ui/react";
import CodeEditor from '../Components/CodeEditor';


const EditorPage = () => {
  const [clients, setClients] = useState([]);
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
        // Filter out duplicate usernames
        const uniqueClients = clients.filter((client, index, self) =>
            index === self.findIndex((c) => c.username === client.username)
        );
    
        // Update the state with unique clients
        setClients(uniqueClients);
    
        // Notify user about the join event for each unique username
        uniqueClients.forEach((client) => {
            if (client.username !== location.state?.username) {
                toast.success(`${client.username} joined the room`);
                console.log(`${client.username} joined the room`);
            }
        });
    
        console.log(uniqueClients);
    });


    //listning for disconected
    socketRef.current.on(ACTIONS.DISCONNECTED,({socketId,username})=>{
         toast.success(`${username} left the room`)
         setClients((prev)=>{
          return prev.filter(client => client.socketId != socketId);
         })
    })

    };
    init();
  }, []);
  
  async function copyroomId(){
    try{
       await  navigator.clipboard.writeText(roomId);
       toast.success('room id has been copied to your clipboard')
    }
    catch(err){
      toast.err('could not copy room id');
      console.error(err);
    }
  }

  function leaveroom(){
    reactNavigator('/');
  }
  
  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mainwrap">
      <div className="aside">
        <div className="asideInner">
          <h3>Collaborators</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn" onClick={copyroomId}>Copy ROOM ID</button>
        <button className="btn leaveBtn" onClick={leaveroom}>Leave</button>
      </div>
      <Box minH="100vh" zIndex={1000} bg="#0f0a19" color="gray.500" px={6} py={8}>
        <CodeEditor socketRef = {socketRef} roomId={roomId}/>
      </Box>
    </div>
  );
};

export default EditorPage;
