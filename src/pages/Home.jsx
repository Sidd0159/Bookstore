import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard'
import UserDashboard from '../components/UserDashboard'

const Home = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Make a request to check if the user is authenticated
        const response = await axios.get('http://localhost:5000/check-auth');
        const userData = response.data;

        // Set user data in state
        setUser(userData);
      } catch (error) {
        // Handle error or redirect to login page
        console.error('Authentication error:', error);
      } finally {
        // Set loading to false once the authentication check is complete
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // User is not authenticated, redirect to login page
    return navigate("/login")
  }

  return (
    <div>
      {user.role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <UserDashboard />
      )}
    </div>
  );
};

export default Home;
