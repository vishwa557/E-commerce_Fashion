import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css';

function LoginPage({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login/login', {
        email,
        password,
      });
      const resData = response.data;
      const userToken = resData.token;
      const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // Set expiration time to 24 hours from now
      document.cookie = `token=${userToken}; path=/; SameSite=None; Secure; expires=${expirationTime.toUTCString()}`;
      

      window.location.href = "/"; // redirect to home page

    } catch (error) {
      const errorMessage = error.response?.data?.errors?.email || error.response?.data?.errors?.password || 'Invalid Email and Password, please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-right" onSubmit={handleSubmit}>
        <div className='group'>
          <label htmlFor="email">Email:</label>
          <input
            className='my-input'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor="password">Password:</label>
          <input
            className='my-input'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className='error'>{error}</div>}
        <button type="submit">Login</button>
        <p>If you don't have an account, <a href="/auth">create account</a></p>
      </form>
    </div>
  );
}

export default LoginPage;
