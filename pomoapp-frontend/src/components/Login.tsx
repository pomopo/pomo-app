import React, { useState } from 'react';
import styles from './Login.module.css';
import clsx from 'clsx';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showDanger, setShowDanger] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setShowDanger(false);
        setErrorMessage('');
        alert(data.message); // "success" を表示
      } else {
        const data = await res.json();
        setShowDanger(true);
        setErrorMessage(data.detail || 'ログイン失敗');
      }
    } catch (err) {
  console.error(err); // ログ出力（開発中に便利）
  setShowDanger(true);
  setErrorMessage('ネットワークエラー');
}
  };

  return (
    <div className={styles.container}>
      <form
        className={clsx(styles.form, showDanger && styles.errorMode)}
        onSubmit={handleSubmit}
      >
        <h2 className={styles.title}>LOGIN</h2>

        <div className={styles.inputWrapper}>
          <span className={styles.icon}>👤</span>
          <input
            type="text"
            placeholder="Username"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.inputWrapper}>
          <span className={styles.icon}>🔒</span>
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {showDanger && (
          <p className={styles.errorText}>{errorMessage}</p>
        )}

        <button type="submit" className={styles.button}>Enter</button>
      </form>
    </div>
  );
};

export default Login;
