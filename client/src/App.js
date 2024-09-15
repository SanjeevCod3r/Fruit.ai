import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Faq from './components/Faq';
import Chatbot from './components/Chatbot';
import Translator from './components/Translator';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/translator" element={<Translator />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
