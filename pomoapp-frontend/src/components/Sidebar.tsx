// src/components/Sidebar.tsx
import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>Dashboard</li>
        <li>Settings</li>
        <li>Stats</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
