
import {  getUserInfo } from '../../utils/api';
import './messenger.css';
import { useEffect, useState } from 'react';
import { ChatEngine ,getOrCreateChat} from 'react-chat-engine';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// import { io } from "socket.io-client";

export default function Messenger() {
    const {email,name} = useParams();
    const [user,setUser] = useState(null);
    const navigate = useNavigate();
    const navigateToDashboard = () => {
      navigate('/dashboard');
    };
    const createDirectChat=(creds) =>{
      getOrCreateChat(
        creds,
        { is_direct_chat: true, usernames: [name] },
      )
    }
    // const renderChatForm=(creds)=> {
    //   return (
    //     <div>
    //       <input 
		// 			placeholder='Username' 
		// 			value={username} 
		// 			onChange={(e) => setUsername(e.target.value)} 
		// 		/>
    //       <button onClick={() => createDirectChat(creds)}>
    //         Create
    //       </button>
    //     </div>
    //   )
    // }
    // useEffect = (()=>{
    //   createChat({email: user.email,name: user.name,chatName:name})
    //   .then(({data})=>{
    //       console.log(data);
    //   })
    //   .catch((err)=>{
    //     console.log(err);
    //   })
    // },[user]);
    const setUserValue = async()=>{
        const setValue = async ()=>{
        await getUserInfo()
        .then(({data})=>{
            setUser(data)
            console.log("userdata"+data)
        }).catch((err)=>{
            console.log(err);
        })
        }
        await setValue();
    };
    
    useEffect(() => {
        setUserValue();
        console.log(user)
      }, [user]);
    

    return(
        <>
        <div className = "navigateBack">
          <ArrowBackIcon fontSize="large" className = "backButton" onClick = {navigateToDashboard} />
        </div>
      <ChatEngine
          height='100vh'
          userName= 'dummyP'
          userSecret= 'kpranathi05@gmail.com'
          projectID='5a6ea840-faf7-4265-ae99-539592b37035'
          renderNewChatForm={(creds) => createDirectChat(creds)}
        />
        </>
    )
}

    