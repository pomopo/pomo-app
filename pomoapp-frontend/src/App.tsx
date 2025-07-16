import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Kiro from './pages/Kiro';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ログインはフルスクリーンで単体表示 */}
        <Route path="/" element={<Login />} />

        {/* ダッシュボード用ルート */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Kiro Pomodoro Timer */}
        <Route path="/kiro" element={<Kiro />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
