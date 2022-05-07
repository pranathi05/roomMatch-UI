import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import Profile from '../Profile/Profile';
import Sidebar from '../Sidebar/Sidebar';
import './styles.css';
const Home = () => {
  return (
    <div className='home-component'>
      <Sidebar />
      {window.location.pathname?.includes('dashboard') ? (
        <Dashboard />
      ) : (
        <Profile />
      )}
    </div>
  );
};

export default Home;
