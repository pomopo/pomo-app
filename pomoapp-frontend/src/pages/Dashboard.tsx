import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TimeDisplay from '../components/TimeDisplay';
import FallingWords from '../components/FallingWords';
import './Dashboard.css';

const Dashboard = () => {
  const [word, setWord] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word }),
      });

      const data = await response.json();
      console.log('サーバーからの応答:', data.message);
      setResponseMessage(data.message);
    } catch (err) {
      console.error('送信エラー:', err);
    }

    setWord('');
  };

  // FallingWordsコンポーネントを使用するので、この関数は不要になります

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="dashboard-content center">
          {responseMessage && <FallingWords words={responseMessage} />}

          <h2 className="title">DASHBOARD</h2>

          <TimeDisplay />

          <form className="word-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="単語を入力"
              className="word-input"
            />
            <button type="submit" className="submit-button">
              送信
            </button>
          </form>

          {responseMessage && (
            <div className="response-box">
              <p className="response-text">{responseMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
