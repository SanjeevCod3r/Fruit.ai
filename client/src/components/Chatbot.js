import React, { useState, useEffect } from 'react'; // Ensure useEffect is imported
import axios from 'axios'; // Ensure axios is imported
import '../css/Chatbot.css';
function FullScreenChatbot({ email }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Predefined bot responses for various messages
  const botResponses = {
    hi: ['Hello! Welcome!', 'Hi! How can I help you today?'],
    hii: ['Hello! Welcome!', 'Hi! How can I help you today?'],
    hello: ['Hi! Welcome to FruitBot.', 'Hello! How may I assist you?'],
    'what is your name': ['I am FruitBot, your virtual assistant!', 'My name is FruitBot, nice to meet you!'],
    'how are you': ['I am just a bot, but I am doing great!', 'Doing well, how about you?'],
    'what can you do': ['I can assist you with various tasks like answering questions, guiding you through fruit-related queries, and more!', 'I am here to help you! Ask me anything about fruits or general queries!'],
    thanks: ['You are welcome!', 'Glad I could help!'],
    bye: ['Goodbye! Have a great day!', 'See you soon!'],
    default: ['Sorry, I did not understand that.', 'Could you please rephrase?'],
  };

  const sendMessage = () => {
    if (input.trim()) {
      const now = new Date();
      const time = now.toLocaleTimeString();

      // Add the user's message to the chat
      setMessages([...messages, { text: input, user: 'You', time }]);

      const userInput = input.trim().toLowerCase();
      setInput('');

      // Simulate bot response after a short delay
      setTimeout(() => {
        const botReply = botResponses[userInput] || botResponses['default'];
        const randomReply = botReply[Math.floor(Math.random() * botReply.length)];
        setMessages((prev) => [
          ...prev,
          { text: randomReply, user: 'FruitBot', time: new Date().toLocaleTimeString() },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="chat-fullscreen-container">
      <div className="chat-header">
        <h2>FruitBot Chat</h2>
        <div className="profile-section">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="profile-pic"
          />
          <span className="user-email">{email}</span>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.user === 'You' ? 'user-bubble' : 'bot-bubble'}`}>
            <p>{msg.text}</p>
            <span className="chat-time">{msg.time}</span>
          </div>
        ))}
      </div>
      <div className="chat-input-section">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

function App() {
  const [userEmail, setUserEmail] = useState('dummy@example.com');

  useEffect(() => {
    //axios.get('http://localhost:8000/api/users/alluser')
    axios.get('https://fruitai-server3.onrender.com/api/users/alluser')
      .then(response => {
        const email = response.data.length > 0 ? response.data[0].email : 'dummy@example.com';
        setUserEmail(email);
      })
      .catch(error => {
        console.error('Error fetching email:', error);
        setUserEmail('dummy@example.com');
      });
  }, []);

  return (
    <div className="App">
      <FullScreenChatbot email={userEmail} />
    </div>
  );
}

export default App;
