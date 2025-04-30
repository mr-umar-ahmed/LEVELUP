import { useState } from "react";
import "./Chatbot.css";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Fake AI response for now — later connect OpenRouter
    const aiReply = {
      sender: "ai",
      text: "Great job! Stay consistent and keep pushing 💪",
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, aiReply]);
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      <h3>💬 AI Assistant</h3>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          placeholder="Ask something..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
