import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './Kiro.css';

type TimerStatus = 'idle' | 'running' | 'paused';

const Kiro = () => {
  // Timer state
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const initialTime = 25 * 60;

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (status === 'running' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setStatus('idle');
      alert('Pomodoro completed! 🍅');
    }

    return () => clearInterval(interval);
  }, [status, timeLeft]);

  // Timer controls
  const startTimer = () => setStatus('running');
  const stopTimer = () => setStatus('idle');
  const resetTimer = () => {
    setStatus('idle');
    setTimeLeft(initialTime);
  };

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="kiro-content">
          <div className="kiro-header">
            <span className="tomato-icon">🍅</span>
            <h1 className="kiro-title">Kiro Pomodoro Timer</h1>
          </div>

          {/* Timer Display */}
          <div className="timer-display">
            <div className="time-text">{formatTime(timeLeft)}</div>
          </div>

          {/* Timer Controls */}
          <div className="timer-controls">
            <button
              className="control-btn"
              onClick={status === 'running' ? stopTimer : startTimer}
            >
              <span className="checkbox">☐</span> {status === 'running' ? 'Stop' : 'Start'}
            </button>
            <button
              className="control-btn"
              onClick={resetTimer}
            >
              <span className="checkbox">☐</span> Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kiro;