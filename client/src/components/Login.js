import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaFingerprint } from 'react-icons/fa';
import '../css/loginsignup.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Dummy login for testing purposes
    if (email === 'admin' && password === 'password') {
      if (rememberMe) {
        const dummyData = { email: 'admin', name: 'Admin User' };
        localStorage.setItem('user', JSON.stringify(dummyData));
      }
      navigate('/home');
      return;
    }
    
    try {
      //const response = await axios.post('http://localhost:8000/auth/login', { email, password });
      const response = await axios.post('https://fruitai-server3.onrender.com/auth/login', { email, password });
      if (response.status === 200) {
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        navigate('/home');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <p>By signing in, you are agreeing to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a></p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <div className="options">
          <label className="remember-me-label">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>Remember</span>
          </label>
          <a href="/forgot-password" className="forgot-password">Forget password?</a>
        </div>
        <button onClick={handleLogin} className="login-button">Login</button>
        <div className="social-login">
          <p>or connect with</p>
          <div className="social-icons">
            <a href="https://facebook.com" className="social-icon"><FaFacebookF /></a>
            <a href="https://instagram.com" className="social-icon"><FaInstagram /></a>
            <a href="https://linkedin.com" className="social-icon"><FaLinkedinIn /></a>
          </div>
          <FaFingerprint className="fingerprint-icon" />
        </div>
        <a href="/signup" className="signup-link">Register</a>
      </div>
    </div>
  );
}

export default Login;
