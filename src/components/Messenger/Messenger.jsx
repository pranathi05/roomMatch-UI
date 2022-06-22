import Conversation from '../Conversation/Conversation.jsx';
import Message from '../Message/Message.jsx';
import Sidebar from '../Sidebar/Sidebar';
import './messenger.css';

export default function Messenger() {

    return(
        <>
        <div className = "messenger">
            <div className='chatMenu'>
                <div className="chatMenuWrapper">
                    <input placeholder="Search for friends" className="chatMenuInput"></input>
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                </div>
            </div>
            <div className='chatBox'>
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                        <Message own={false}/>
                        <Message own={true}/>
                    </div>
                    <div className="chatBoxBottom">
                        <textarea placeholder="write something....." className="chatMessageInput"></textarea>
                        <button className='chatSubmitButton'>Send</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}