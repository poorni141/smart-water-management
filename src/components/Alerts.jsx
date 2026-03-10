import React from 'react';
import { useData } from '../context/DataContext';
import './Features.css';

function Alerts() {
  const { alerts, criticalAlertsCount, warningAlertsCount } = useData();

  return (
    <div className="feature-module animate-fade-in">
      <div className="module-header flex-center">
        <h2 className="text-gradient" style={{ backgroundImage: 'linear-gradient(90deg, var(--accent-red), var(--accent-yellow))' }}>
          Alerts & Event Log
        </h2>
        <div className="flex-center" style={{ gap: '0.5rem' }}>
           <span className="badge" style={{ padding: '0.3rem 0.6rem', background: 'var(--accent-red)', color: 'white' }}>{criticalAlertsCount} Critical</span>
           <span className="badge" style={{ padding: '0.3rem 0.6rem', background: 'var(--accent-yellow)', color: 'black' }}>{warningAlertsCount} Warnings</span>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
         <div className="flex-between" style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Event Description</span>
            <div style={{ display: 'flex', gap: '4rem' }}>
              <span style={{ width: '100px', fontWeight: 600, color: 'var(--text-secondary)' }}>Location</span>
              <span style={{ width: '100px', fontWeight: 600, color: 'var(--text-secondary)' }}>Status</span>
              <span style={{ width: '80px', textAlign: 'right', fontWeight: 600, color: 'var(--text-secondary)' }}>Time</span>
            </div>
         </div>
         
         <div style={{ display: 'flex', flexDirection: 'column' }}>
           {alerts.map(alert => (
             <div key={alert.id} className="alert-row flex-between animate-fade-in">
                <div className="flex-center" style={{ gap: '1rem', justifyContent: 'flex-start' }}>
                  <div className={`alert-icon ${alert.type}`}>
                    {alert.type === 'critical' && '🚨'}
                    {alert.type === 'warning' && '⚠️'}
                    {alert.type === 'info' && '🗓️'}
                  </div>
                  <span className={`alert-desc ${alert.type === 'critical' ? 'text-primary font-bold' : 'text-primary'}`}>
                    {alert.desc}
                  </span>
                </div>
                
                <div style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
                  <span style={{ width: '100px', fontSize: '0.9rem' }}>{alert.loc}</span>
                  <span className={`status-badge ${alert.status.toLowerCase()}`} style={{ width: '100px' }}>{alert.status}</span>
                  <span style={{ width: '80px', textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{alert.time}</span>
                </div>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
}

export default Alerts;
