import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/loginsignup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      //const response = await axios.post('http://localhost:8000/auth/signup', { email, password });
      const response = await axios.post('https://fruitai-server3.onrender.com/auth/signup', { email, password });
      if (response.status === 200) {
        alert('Signup successful! Redirecting to login...');
        navigate('/'); // Redirect to login after successful signup
      } else {
        alert('Signup failed');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="signup-input"
        />
        <button onClick={handleSignup} className="signup-button">Register</button>
        <a href="/" className="login-link">Already have an account? Login</a>
      </div>
    </div>
  );
}

export default Signup;
