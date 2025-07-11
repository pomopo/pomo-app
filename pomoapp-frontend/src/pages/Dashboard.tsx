import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';

const Dashboard = () => {
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [weekdayClass, setWeekdayClass] = useState('');
  const [word, setWord] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const weekdayJp = now.toLocaleDateString('ja-JP', { weekday: 'long' });
      const time = now.toTimeString().split(' ')[0]; // hh:mm:ss

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('送信された単語:', word);
    setWord('');
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="dashboard-content center">
          <h2 className="title">DASHBOARD</h2>

          {/* 英字クラス名を使って色分け */}
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
