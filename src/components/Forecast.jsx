import React from 'react';
import { useData } from '../context/DataContext';
import './Features.css';

function Forecast() {
  const { metrics } = useData();

  return (
    <div className="feature-module animate-fade-in">
      <div className="module-header">
        <h2 className="text-gradient">Demand Forecasting & AI Predictions</h2>
        <p className="text-muted">72-Hour predictive models based on historical usage and weather patterns.</p>
      </div>

      <div className="flex-between" style={{ gap: '1.5rem', alignItems: 'stretch' }}>
        <div className="glass-panel" style={{ flex: '3', padding: '1.5rem', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
           <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
              <h4>Predicted Demand vs Supply Capacity</h4>
              <div className="flex-center" style={{ gap: '1rem' }}>
                 <div className="flex-center" style={{ gap: '0.3rem', fontSize: '0.8rem' }}>
                   <span style={{ width: '12px', height: '12px', background: 'var(--accent-blue)', borderRadius: '2px' }}></span> Predicted Demand
                 </div>
                 <div className="flex-center" style={{ gap: '0.3rem', fontSize: '0.8rem' }}>
                   <span style={{ width: '12px', height: '12px', border: '1px dashed var(--accent-green)', borderRadius: '2px' }}></span> Supply Capacity
                 </div>
              </div>
           </div>

           <div className="forecast-chart-area" style={{ flex: 1, position: 'relative', borderLeft: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
              {/* Mock Area Chart */}
              <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0 }}>
                 <path d="M0,80 Q10,70 20,85 T40,60 T60,50 T80,40 T100,55 L100,100 L0,100 Z" fill="url(#blue-grad)" opacity="0.3"></path>
                 <path d="M0,80 Q10,70 20,85 T40,60 T60,50 T80,40 T100,55" fill="none" stroke="var(--accent-blue)" strokeWidth="0.5" className="draw-line"></path>
                 
                 <path d="M0,20 L100,20" stroke="var(--accent-green)" strokeWidth="0.5" strokeDasharray="2,2"></path>
                 
                 <defs>
                   <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="var(--accent-cyan)"/>
                     <stop offset="100%" stopColor="transparent"/>
                   </linearGradient>
                 </defs>
              </svg>
           </div>
           <div className="flex-between text-muted" style={{ padding: '0.5rem 0 0', fontSize: '0.8rem' }}>
              <span>Today (Flow: {metrics.flowRate.toLocaleString()})</span><span>+24h</span><span>+48h</span><span>+72h</span>
           </div>
        </div>

        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem', flex: 1 }}>
             <h4 style={{ marginBottom: '1rem' }}>Influencing Factors</h4>
             <div className="factor-list">
               <div className="flex-between" style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                 <span className="text-secondary">Expected Temp</span>
                 <span className="text-primary font-bold">32°C (High)</span>
               </div>
               <div className="flex-between" style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                 <span className="text-secondary">Precipitation</span>
                 <span className="text-primary font-bold">0%</span>
               </div>
               <div className="flex-between" style={{ padding: '0.5rem 0' }}>
                 <span className="text-secondary">Day Type</span>
                 <span className="text-primary font-bold">Weekend</span>
               </div>
             </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(14, 165, 233, 0.05))', borderColor: 'rgba(6, 182, 212, 0.2)' }}>
            <h4>AI Recommendation</h4>
            <p className="text-muted" style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>
              Increase pressure in Zone Z-03 and Z-04 by 15% between 06:00 - 09:00 to meet anticipated morning demand spike.
            </p>
            <button className="btn-outline" style={{ marginTop: '0.5rem', width: '100%', borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}>Apply Schedule</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forecast;
