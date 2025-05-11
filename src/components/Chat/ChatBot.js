import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! I am your virtual assistant. How can I help you today?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputValue, sender: 'user' }]);
    
    // Bot response
    setTimeout(() => {
      const botResponses = [
        "I can help you with license applications renewals, and status checks.",
        "You can upload documents through the 'Apply for License' section.",
        "Approval usually takes 3-5 business days after document submission.",
        "For rejected applications, you'll receive a reason and can reapply.",
        "You can check your application status anytime in the dashboard."
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { text: randomResponse, sender: 'bot' }]);
    }, 1000);

    setInputValue('');
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h5 className="mb-0">Virtual Assistant</h5>
            <button 
              onClick={() => setIsOpen(false)} 
              className="btn btn-sm btn-close btn-close-white"
              aria-label="Close"
            ></button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="chatbot-input">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type your question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                className="btn btn-primary"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-toggle btn btn-primary rounded-circle"
      >
        <i className="bi bi-chat-dots"></i>
      </button>
    </div>
  );
}

export default ChatBot;