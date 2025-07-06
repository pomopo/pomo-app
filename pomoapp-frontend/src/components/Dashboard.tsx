import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // 外部CSSでスタイル適用

const Dashboard = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="dashboard">
      <h1 className="title">DASHBOARD</h1>
      <div className="timer">🕒 {seconds}s</div>
    </div>
  );
};

export default Dashboard;
