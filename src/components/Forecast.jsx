import React from 'react';
import { useData } from '../context/DataContext';
import './Features.css';

function Forecast() {
  const { metrics, forecast72h } = useData();

  const demandValues = (forecast72h ?? []).map(p => p.demand);
  const capValues = (forecast72h ?? []).map(p => p.capacity);
  const minY = demandValues.length ? Math.min(...demandValues, ...capValues) : 35000;
  const maxY = demandValues.length ? Math.max(...demandValues, ...capValues) : 52000;
  const span = Math.max(1, maxY - minY);

  const demandPath = (() => {
    if (!forecast72h?.length) return '';
    const w = 100;
    const h = 100;
    const pad = 6;
    const n = forecast72h.length;
    const xStep = (w - pad * 2) / Math.max(1, n - 1);
    return forecast72h
      .map((p, i) => {
        const x = pad + i * xStep;
        const y = pad + (h - pad * 2) * (1 - (p.demand - minY) / span);
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(' ');
  })();

  const capacityY = (() => {
    const cap = forecast72h?.[0]?.capacity ?? 50000;
    const pad = 6;
    const h = 100;
    return pad + (h - pad * 2) * (1 - (cap - minY) / span);
  })();

  const currentDemand = forecast72h?.[0]?.demand ?? metrics.flowRate;
  const peakDemand = demandValues.length ? Math.max(...demandValues) : currentDemand;
  const capacity = forecast72h?.[0]?.capacity ?? 50000;
  const headroom = Math.max(0, capacity - peakDemand);

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
              <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0 }}>
                 <path d="M6,94 L6,6" stroke="rgba(255,255,255,0.10)" strokeWidth="0.6" />
                 <path d="M6,94 L94,94" stroke="rgba(255,255,255,0.10)" strokeWidth="0.6" />

                 {demandPath && (
                   <>
                     <path d={`${demandPath} L94,94 L6,94 Z`} fill="url(#blue-grad)" opacity="0.22"></path>
                     <path d={demandPath} fill="none" stroke="var(--accent-blue)" strokeWidth="0.9" className="draw-line"></path>
                   </>
                 )}

                 <path d={`M6,${capacityY.toFixed(2)} L94,${capacityY.toFixed(2)}`} stroke="var(--accent-green)" strokeWidth="0.7" strokeDasharray="2,2"></path>
                 
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
           <div className="flex-between" style={{ paddingTop: '0.75rem', gap: '1rem', flexWrap: 'wrap' }}>
              <span className="badge" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
                Current demand: {currentDemand.toLocaleString()} L/min
              </span>
              <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-blue)' }}>
                Peak (72h): {peakDemand.toLocaleString()} L/min
              </span>
              <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)' }}>
                Capacity headroom: {headroom.toLocaleString()} L/min
              </span>
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
