import React from 'react';
import { useData } from '../context/DataContext';
import './Features.css';

function LeakDetection() {
  const { zones, criticalAlertsCount } = useData();

  return (
    <div className="feature-module animate-fade-in">
      <div className="module-header flex-center">
        <h2 className="text-gradient">Acoustic & Pressure Analysis</h2>
        {criticalAlertsCount > 0 && <span className="badge badge-pulse">{criticalAlertsCount} Active Alert{criticalAlertsCount !== 1 ? 's' : ''}</span>}
      </div>

      <div className="zone-grid flex-center" style={{ flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
         <div className="network-map flex-center glass-panel w-full" style={{ height: '300px', width: '100%', marginBottom: '2rem', position: 'relative' }}>
            <div className="map-grid"></div>
            
            {/* Dynamic Sensor Nodes based on actual zone data mapping (mocked positions) */}
            <div className={`sensor ${zones[0]?.status || 'normal'}`} style={{ top: '20%', left: '30%' }}></div>
            <div className={`sensor ${zones[1]?.status || 'normal'} ${zones[1]?.status === 'alert' ? 'pulse-red' : ''}`} style={{ top: '50%', left: '60%' }}></div>
            <div className={`sensor ${zones[2]?.status || 'normal'}`} style={{ top: '70%', left: '25%' }}></div>
            <div className={`sensor ${zones[3]?.status || 'normal'}`} style={{ top: '40%', left: '80%' }}></div>
            
            <div className="pipe pipe-h" style={{ top: '22%', left: '32%', width: '28%' }}></div>
            <div className="pipe pipe-v" style={{ top: '22%', left: '60%', height: '28%' }}></div>
            <div className={`pipe pipe-h ${zones[1]?.status === 'alert' ? 'leak' : ''}`} style={{ top: '52%', left: '27%', width: '33%' }}></div>
            
            <p className="text-muted" style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>Live Sensor Network</p>
         </div>

         <div className="w-full flex-between" style={{ gap: '1rem', width: '100%', flexWrap: 'wrap' }}>
            {zones.map(zone => (
              <div key={zone.id} className={`zone-card glass-panel ${zone.status === 'alert' ? 'border-glow-red' : ''}`}>
                <div className="flex-between" style={{ marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0 }}>{zone.name}</h4>
                  <span className={`status-dot ${zone.status}`}></span>
                </div>
                <div className="zone-stats">
                  <div className="stat-row">
                    <span className="text-muted">Pressure (bar)</span>
                    <span className="text-primary">{zone.pressure}</span>
                  </div>
                  <div className="stat-row">
                    <span className="text-muted">Flow (L/s)</span>
                    <span className="text-primary">{zone.flow}</span>
                  </div>
                  <div className="stat-row">
                    <span className="text-muted">Risk Profile</span>
                    <span className={zone.status === 'alert' ? 'text-danger' : 'text-primary'}>{zone.risk}</span>
                  </div>
                </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}

export default LeakDetection;
