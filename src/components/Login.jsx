import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   const [role, setRole] = useState('user'); // Default role is 'user'

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a request to the server for authentication
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Assuming the server responds with user data on successful login
      const userData = response.data;

      // Notify the parent component about successful login
    //   onLogin(userData);
    if(userData.role==='admin') navigate('/admin')
    if(userData.role==='user') navigate('/user')
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure (show an error message, etc.)
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* <div>
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div> */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
