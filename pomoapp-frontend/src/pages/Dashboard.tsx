import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';

const Dashboard = () => {
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [weekdayClass, setWeekdayClass] = useState('');
  const [word, setWord] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const weekdayJp = now.toLocaleDateString('ja-JP', { weekday: 'long' });
      const time = now.toTimeString().split(' ')[0];

      const weekdayMap: Record<string, string> = {
        日曜日: 'sun',
        月曜日: 'mon',
        火曜日: 'tue',
        水曜日: 'wed',
        木曜日: 'thu',
        金曜日: 'fri',
        土曜日: 'sat',
      };

      setDateStr(`${year}/${month}/${day}（${weekdayJp}）`);
      setTimeStr(time);
      setWeekdayClass(weekdayMap[weekdayJp]);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

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

  const renderFallingWords = () => {
    if (!responseMessage) return null;

    const words = responseMessage.split(/[\s、。．,、]+/);
    const instances = 10;
    const fallingWords = [];

    for (let i = 0; i < instances; i++) {
      for (let j = 0; j < words.length; j++) {
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const delay = Math.random() * 20;

        fallingWords.push(
          <div
            key={`${i}-${j}`}
            className="falling-word"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              animationDelay: `${delay}s`,
            }}
          >
            {words[j]}
          </div>
        );
      }
    }

    return <div className="falling-layer">{fallingWords}</div>;
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="dashboard-content center">
          {renderFallingWords()}

          <h2 className="title">DASHBOARD</h2>

          <div className={`timer large ${weekdayClass}-color`}>
            <div>{dateStr}</div>
            <div>{timeStr}</div>
          </div>

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
