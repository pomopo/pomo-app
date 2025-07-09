import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';

const Dashboard = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="dashboard-content">
          <h2 className="title">DASHBOARD</h2>
          <div className="timer">🕒 {seconds}s</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
