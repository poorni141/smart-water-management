import React from 'react';
import { useData } from '../context/DataContext';
import './TopNav.css';

function TopNav({ activeTab }) {
  const { systemStatus, criticalAlertsCount, warningAlertsCount } = useData();

  const tabTitles = {
    overview: 'Dashboard Overview',
    leaks: 'Leak Detection Engine',
    efficiency: 'Distribution Efficiency',
    alerts: 'Real-time Alerts System',
    forecast: 'Demand Forecasting',
    settings: 'System Settings'
  };

  const totalAlerts = criticalAlertsCount + warningAlertsCount;
  const isOnline = systemStatus !== 'Critical';

  return (
    <header className="top-nav">
      <div className="nav-title-group">
        <h3>{tabTitles[activeTab] || 'Dashboard Overview'}</h3>
        <p className="nav-subtitle">Smart Water Infrastructure Monitor</p>
      </div>

      <div className="nav-actions flex-center">
        <div className="system-status" style={{ 
          background: isOnline ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          borderColor: isOnline ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'
        }}>
          <span className={`status-indicator pulse ${isOnline ? 'online' : 'critical'}`}
                style={{ backgroundColor: isOnline ? 'var(--accent-green)' : 'var(--accent-red)', boxShadow: isOnline ? 'var(--glow-green)' : 'var(--glow-red)' }}
          ></span>
          <span className="status-text" style={{ color: isOnline ? 'var(--accent-green)' : 'var(--accent-red)' }}>
            Network {systemStatus}
          </span>
        </div>
        
        <button className="icon-btn notification-btn">
          <span className="bell-icon">🔔</span>
          {totalAlerts > 0 && <span className="badge">{totalAlerts}</span>}
        </button>
      </div>
    </header>
  );
}

export default TopNav;
