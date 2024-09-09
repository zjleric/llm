import { useState } from 'react';
import './App.css';
import './normal.css';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';

function App() {
  
  // add state for input and chat log
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    let newChatLog = [...chatLog, {user: 'user', message: `${input}`}];
    setChatLog(newChatLog);
    setInput("");

    const url = "http://127.0.0.1:5000";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: input
      })
    });
    
    const data = await response.json();
    const message = data.message;
    console.log(message);

    newChatLog = [...newChatLog, {user: 'llm', message: message}];
    setChatLog(newChatLog);

  }

  return (
    <div className="App">
      <aside className="side-menu">
        <div className="side-menu-button">
          <span 
          className="side-menu-button-span">
            +
          </span>
          New Chat
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {
            chatLog.map((message) => (
              <ChatMessage message={message}></ChatMessage>
            ))
          }
        </div>

        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
            rows="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="chat-input-textarea"
            // placeholder="Type your message here"
            ></input>
            <button className="submit">Send
            </button> 
          </form>
        </div>
      
      </section>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  
  return (
    <div className={message.user === "llm" ? "chat-message-llm" : "chat-message"}>
      <div className="chat-message-center">
        {
          message.user === "llm" ? (
            <Avatar 
            sx={{ bgcolor: deepPurple[500] }} 
            className="avatar-llm"
            >L</Avatar>
          ) : (
            <Avatar className="avatar">E</Avatar>
          )
        }      
        <div className="message">
          {message.message}
        </div>
      </div>
    </div>
  )
}

export default App;
