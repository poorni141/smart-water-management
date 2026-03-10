import React from 'react';
import './Sidebar.css';

function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'leaks', label: 'Leak Detection', icon: '💧' },
    { id: 'efficiency', label: 'Distribution', icon: '⚡' },
    { id: 'alerts', label: 'Alerts & Events', icon: '🚨' },
    { id: 'forecast', label: 'Demand Forecast', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <aside className="sidebar fixed-sidebar">
      <div className="sidebar-header flex-center">
        <div className="logo-icon flex-center">🌊</div>
        <h2 className="text-gradient brand-title">AquaSmart</h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {navItems.map(item => (
            <li key={item.id}>
              <button
                className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile flex-center">
          <div className="avatar">JD</div>
          <div className="user-info">
            <p className="user-name">John Doe</p>
            <p className="user-role">System Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
