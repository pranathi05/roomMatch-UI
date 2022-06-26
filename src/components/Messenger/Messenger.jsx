import Conversation from '../Conversation/Conversation.jsx';
import Message from '../Message/Message.jsx';
import {  getUserInfo } from '../../utils/api';
import './messenger.css';
import { useEffect, useState , useRef} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { io } from "socket.io-client";

export default function Messenger() {
    const [userId,setUserId] = useState(null);
    const [user,setUser] = useState(null);
    const [conversations,setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState("");
    const scrollRef = useRef();
    // const socket = useRef();

    // useEffect(() => {
    //   socket.current = io("ws://localhost:8900");
    //   socket.current.on("getMessage", (data) => {
    //     setArrivalMessage({
    //       sender: data.senderId,
    //       text: data.text,
    //       createdAt: Date.now(),
    //     });
    //   });
    // }, []);
  
    // useEffect(() => {
    //   arrivalMessage &&
    //     currentChat?.members.includes(arrivalMessage.sender) &&
    //     setMessages((prev) => [...prev, arrivalMessage]);
    // }, [arrivalMessage, currentChat]);
  
    // useEffect(() => {
    //   socket.current.emit("addUser", user._id);
    // }, [user]);

    const setUserValue = async()=>{
        const setValue = async ()=>{
        await getUserInfo()
        .then(({data})=>{
            setUserId(data?._id)
            setUser(data)
        }).catch((err)=>{
            console.log(err);
        })
        }
        await setValue();
    };
    
    useEffect(() => {
        setUserValue();
        console.log(userId)
        const getConversations = async () => {
          try {
            const res = await axios.get("http://localhost:3020/api/conversation/" + userId);
            setConversations(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getConversations();
        console.log(conversations)
      }, [userId,conversations]);

    useEffect(() => {
        const getMessages = async () => {
            try {
            const res = await axios.get("http://localhost:3020/api/message/" + currentChat?._id);
            setMessages(res.data);
            } catch (err) {
            console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    const handleSubmit =async (e)=>{
        e.preventDefault();
        const message = {
            sender: userId,
            text: newMessage,
            conversationId: currentChat._id
        }
        try{
            const res = await axios.post("http://localhost:3020/api/message",message);
            setMessages([...messages,res.data]);
            setNewMessage("")
        }catch(err){
            console.log(err)
        }
    }
    const navigate = useNavigate();
    const navigateToDashboard = () => {
      navigate('/dashboard');
    };
    console.log(messages)
    return(
        <>
        <div className = "chat">
        <div className = "navigateBack">
          <ArrowBackIcon fontSize="large" className = "backButton" onClick = {navigateToDashboard} />
        </div>
        {conversations !== null ? <div className = "messenger" >
            <div className='chatMenu'>
                <div className="chatMenuWrapper">
                    <input placeholder=" Search for friends" className="chatMenuInput"></input>
                    {conversations.map((c)=>(
                       <div onClick={() => setCurrentChat(c)}>
                            <Conversation conversation={c} currentUser={user} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {
                    messages.length !== 0  ? (messages.map((m) => (
                      <div ref={scrollRef}>
                        <Message message={m} own = {m.sender === userId} />
                      </div>))): <div className = "noConversationText">Start the conversation...</div>
                  }
                
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e)=>setNewMessage(e.target.value)}
                    value= {newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick = {handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        </div>: <div>loading..</div>}
        </div>
        </>
    )
}

// const getConvo = async ()=>{
    //     console.log('Hello from convo: ',userId);
    //     const res = await axios.get('http://localhost:3020/api/conversation/'+userId);
    //     console.log(res);
    //     if(res.data !== null){
    //         setConversations(res.data);
    //     }
    // }
    // getUserInfo()
    //         .then(({data})=>{
    //             console.log(data)
    //             if(data !== null){
    //                 setUserId(data?._id);
    //                 console.log(userId)
    //             }
                
    //         }).catch((err)=>{
    //             console.log(err);
    //         })
    // useEffect(()=>{
    //     const getConversations = async ()=>{

    //     }
    // })
    // const getConversations = async () =>{
    //     await getConvo();
    //     console.log(conversations)
    // }
    // useEffect(()=>{
    //     if(userId !== null)
    //     {
    //         console.log(userId) 
    //         getConversations();
    //     }
        
    // },[userId])
    // useEffect(()=>{
    //     if(!conversations){
    //         setNum(200);
    //     }
    // },[conversations])
    