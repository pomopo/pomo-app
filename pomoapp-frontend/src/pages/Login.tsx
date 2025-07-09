import React, { useState } from 'react'; // React本体と「状態管理用のフック」を読み込み
import styles from './Login.module.css'; // CSSモジュール（別ファイル）をインポート
import clsx from 'clsx'; // 条件付きでクラス名を合成するための便利ツール
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // useStateフックで状態を定義。フォームの入力値やエラー表示を管理する
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showDanger, setShowDanger] = useState(false); // エラー表示のON/OFF
  const [errorMessage, setErrorMessage] = useState(''); // エラーメッセージの中身
  const navigate = useNavigate();

  // フォームが送信されたときに実行される処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ページリロードを防ぐ（フォームのデフォ動作を止める）

    try {
      // ログインAPIにPOSTリクエストを送信（入力データをJSON形式で送る）
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        setShowDanger(false);
        setErrorMessage('');
        navigate('/dashboard');
      } else {
        // 失敗：エラーメッセージを表示
        const data = await res.json();
        setShowDanger(true);
        setErrorMessage(data.detail || 'ログイン失敗');
      }
    } catch (err) {
      // ネットワークエラーなどで例外が発生したとき
      console.error(err);
      setShowDanger(true);
      setErrorMessage('ネットワークエラー');
    }
  };

  return (
    <div className={styles.container}>
      {/* フォーム全体（エラー時に見た目を変えるために clsx を使って条件付きクラス付与） */}
      <form
        className={clsx(styles.form, showDanger && styles.errorMode)}
        onSubmit={handleSubmit}
      >
        <h2 className={styles.title}>LOGIN</h2>

        {/* ユーザー名入力フィールド */}
        <div className={styles.inputWrapper}>
          <span className={styles.icon}>👤</span>
          <input
            type="text"
            placeholder="Username"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)} // 入力があるたびにstateを更新
          />
        </div>

        {/* パスワード入力フィールド */}
        <div className={styles.inputWrapper}>
          <span className={styles.icon}>🔒</span>
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 同じくstate更新
          />
        </div>

        {/* エラーメッセージ表示部分 */}
        {showDanger && <p className={styles.errorText}>{errorMessage}</p>}

        {/* 送信ボタン */}
        <button type="submit" className={styles.button}>
          Enter
        </button>
      </form>
    </div>
  );
};

export default Login;
