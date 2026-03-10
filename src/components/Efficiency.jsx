import React from 'react';
import { useData } from '../context/DataContext';
import './Features.css';

function Efficiency() {
  const { efficiencyData } = useData();

  return (
    <div className="feature-module animate-fade-in">
      <div className="module-header flex-between">
        <h2 className="text-gradient">Distribution Efficiency & Analytics</h2>
        <div className="flex-center" style={{ gap: '1rem' }}>
          <button className="btn-outline active">Today</button>
          <button className="btn-outline">7 Days</button>
          <button className="btn-outline">30 Days</button>
        </div>
      </div>

      <div className="flex-between" style={{ gap: '1.5rem', alignItems: 'stretch' }}>
        <div className="glass-panel" style={{ flex: '2', padding: '1.5rem' }}>
          <h4 style={{ marginBottom: '1.5rem' }}>Flow Dynamics (Liters / Hour)</h4>
          <div className="flex-center" style={{ height: '300px', width: '100%', position: 'relative', borderBottom: '1px solid var(--border-color)', borderLeft: '1px solid var(--border-color)' }}>
              {/* Animated Mock Bars */}
              <div className="bar-chart-container" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', width: '100%', height: '100%', padding: '0 1rem' }}>
                  {efficiencyData.flowBars.map((height, i) => (
                    <div key={i} className="mock-bar" style={{ height: `${height}%`, width: '40px', background: `linear-gradient(180deg, var(--accent-blue), var(--accent-cyan))` }}></div>
                  ))}
              </div>
          </div>
          <div className="flex-between" style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem', padding: '0 1rem' }}>
            <span>00:00</span><span>04:00</span><span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span><span>23:59</span>
          </div>
        </div>

        <div className="glass-panel" style={{ flex: '1', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4>Efficiency Metrics</h4>
          
          <div className="metric-box flex-between" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--border-radius-md)' }}>
            <div>
              <p className="text-muted" style={{ margin: 0, fontSize: '0.8rem' }}>Non-Revenue Water (NRW)</p>
              <h3 style={{ margin: 0, color: 'var(--accent-cyan)' }}>{efficiencyData.nrw}%</h3>
            </div>
            <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-green)' }}>-1.2% ↓</span>
          </div>

          <div className="metric-box flex-between" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--border-radius-md)' }}>
             <div>
              <p className="text-muted" style={{ margin: 0, fontSize: '0.8rem' }}>Energy / Cubic Meter</p>
              <h3 style={{ margin: 0, color: 'var(--accent-yellow)' }}>{efficiencyData.energyPerCb} kWh</h3>
            </div>
          </div>

           <div className="metric-box flex-between" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--border-radius-md)' }}>
             <div>
              <p className="text-muted" style={{ margin: 0, fontSize: '0.8rem' }}>Pump Active Time</p>
              <h3 style={{ margin: 0, color: 'var(--accent-purple)' }}>{efficiencyData.pumpTime} hrs</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Efficiency;
