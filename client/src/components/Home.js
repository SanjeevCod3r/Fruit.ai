import React from 'react';

import '../css/Home.css'; 

function Home() {
  return (
    <div className="home-container">
      <h2 className="title">Fruit.AI</h2>
      <p className="tagline">"Be Healthy!"</p>
      <div className="grid-container">
        <div className="box chat-box">
          <i className="bi bi-chat-dots"></i>
          <a href="/chatbot">Chat</a>
        </div>
        <div className="box translator-box">
          <i className="bi bi-translate"></i>
          <a href="/translator">Translator</a>
        </div>
        <div className="box faq-box">
          <i className="bi bi-question-circle"></i>
          <a href="/faq">FAQs</a>
        </div>
        <div className="box about-box">
          <i className="bi bi-info-circle"></i>
          <a href="/about">About</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
