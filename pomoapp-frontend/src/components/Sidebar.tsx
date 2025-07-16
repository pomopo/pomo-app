// src/components/Sidebar.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <aside className="sidebar">
      <ul>
        <li 
          className={location.pathname === '/dashboard' ? 'active' : ''}
          onClick={() => handleNavigation('/dashboard')}
        >
          Dashboard
        </li>
        <li 
          className={location.pathname === '/kiro' ? 'active' : ''}
          onClick={() => handleNavigation('/kiro')}
        >
          Kiro
        </li>
        <li>Settings</li>
        <li>Stats</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
