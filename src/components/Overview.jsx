import React, { useEffect } from 'react';
import { useData } from '../context/DataContext';
import './Overview.css';

function Overview() {
  
  const { metrics, zones, pressure24h, criticalAlertsCount, warningAlertsCount, infoAlertsCount } = useData();
  useEffect(() => {

    const interval = setInterval(() => {

      metrics.flowRate = Math.floor(Math.random() * 700);
      metrics.efficiency = 90 + Math.floor(Math.random() * 10);
      metrics.energy = 1000 + Math.floor(Math.random() * 300);

    }, 2000);

    return () => clearInterval(interval);

  }, []);
  // Highlight any active leaks based on risk level
  const activeLeaksCount = zones.filter(z => z.status === 'alert').length;

  const pressureValues = (pressure24h ?? []).map(p => p.pressure);
  const minP = pressureValues.length ? Math.min(...pressureValues) : 2.5;
  const maxP = pressureValues.length ? Math.max(...pressureValues) : 5.0;

  const pressurePath = (() => {
    if (!pressureValues.length) return '';
    const w = 100;
    const h = 60;
    const pad = 6;
    const span = Math.max(0.001, maxP - minP);
    const n = pressureValues.length;
    const xStep = (w - pad * 2) / Math.max(1, n - 1);
    return pressureValues
      .map((v, i) => {
        const x = pad + i * xStep;
        const y = pad + (h - pad * 2) * (1 - (v - minP) / span);
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(' ');
  })();

  const donut = (() => {
    const total = criticalAlertsCount + warningAlertsCount + infoAlertsCount;
    const safeTotal = total || 1;
    const r = 20;
    const c = 2 * Math.PI * r;
    const segments = [
      { key: 'critical', label: 'Critical', value: criticalAlertsCount, color: 'var(--accent-red)' },
      { key: 'warning', label: 'Warning', value: warningAlertsCount, color: 'var(--accent-yellow)' },
      { key: 'info', label: 'Info', value: infoAlertsCount, color: 'var(--accent-cyan)' },
    ];
    let offset = 0;
    const rings = segments.map(seg => {
      const len = (seg.value / safeTotal) * c;
      const dash = `${len.toFixed(2)} ${(c - len).toFixed(2)}`;
      const el = (
        <circle
          key={seg.key}
          r={r}
          cx="25"
          cy="25"
          fill="transparent"
          stroke={seg.color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={dash}
          strokeDashoffset={(-offset).toFixed(2)}
          opacity={seg.value > 0 ? 1 : 0.25}
        />
      );
      offset += len;
      return el;
    });
    return { total, segments, rings };
  })();

  const displayMetrics = [
    { id: 1, label: 'Total Flow Rate', value: metrics.flowRate.toLocaleString(), unit: 'L/min', trend: '+2.4%', status: 'good' },
    { id: 2, label: 'Active Leaks Detected', value: activeLeaksCount.toString(), unit: 'Zones', trend: activeLeaksCount > 0 ? '+1' : '0', status: activeLeaksCount > 0 ? 'warning' : 'good' },
    { id: 3, label: 'Network Efficiency', value: metrics.efficiency, unit: '%', trend: '+0.5%', status: metrics.efficiency > 93 ? 'good' : 'warning' },
    { id: 4, label: 'Energy Consumption', value: metrics.energy.toLocaleString(), unit: 'kWh', trend: '-5.2%', status: 'good' },
  ];

  return (
    <div className="overview-container animate-fade-in">
      <div className="metrics-grid">
        {displayMetrics.map(metric => (
          <div key={metric.id} className="metric-card glass-panel">
            <div className="metric-header flex-between">
              <h4 className="metric-label">{metric.label}</h4>
              <span className={`metric-trend ${metric.status === 'warning' ? 'text-warning' : 'text-success'}`}>
                {metric.trend}
              </span>
            </div>
            <div className="metric-body">
              <span className="metric-value">{metric.value}</span>
              <span className="metric-unit">{metric.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-card glass-panel main-chart">
          <div className="chart-header flex-between">
            <h4>System Pressure Analytics (24h)</h4>
            <button className="btn-outline">Export</button>
          </div>
          <div className="chart-placeholder flex-center" style={{ flexDirection: 'column', gap: '0.75rem' }}>
            <svg width="100%" height="180" viewBox="0 0 100 60" preserveAspectRatio="none" style={{ maxWidth: '100%' }}>
              <defs>
                <linearGradient id="pressureLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--accent-cyan)" />
                  <stop offset="100%" stopColor="var(--accent-blue)" />
                </linearGradient>
              </defs>
              <path d="M6,54 L6,6" stroke="rgba(255,255,255,0.10)" strokeWidth="0.6" />
              <path d="M6,54 L94,54" stroke="rgba(255,255,255,0.10)" strokeWidth="0.6" />
              {pressurePath && (
                <>
                  <path d={`${pressurePath} L94,54 L6,54 Z`} fill="url(#pressureLine)" opacity="0.12" />
                  <path d={pressurePath} fill="none" stroke="url(#pressureLine)" strokeWidth="1.2" />
                </>
              )}
            </svg>
            <p className="text-muted" style={{ zIndex: 2 }}>
              Live range: {minP.toFixed(2)}–{maxP.toFixed(2)} bar
            </p>
          </div>
        </div>
        
        <div className="chart-card glass-panel side-chart">
          <div className="chart-header">
            <h4>Alert Distribution</h4>
          </div>
          <div className="chart-placeholder flex-center" style={{ flexDirection: 'column', gap: '1rem' }}>
             <svg width="120" height="120" viewBox="0 0 50 50" style={{ display: 'block' }}>
               <circle r="20" cx="25" cy="25" fill="transparent" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
               <g transform="rotate(-90 25 25)">
                 {donut.rings}
               </g>
               <text x="25" y="27" textAnchor="middle" fontSize="7" fill="var(--text-primary)" style={{ fontWeight: 700 }}>
                 {donut.total}
               </text>
               <text x="25" y="34" textAnchor="middle" fontSize="4.2" fill="var(--text-muted)">
                 Active
               </text>
             </svg>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', width: '100%', maxWidth: '220px' }}>
               {donut.segments.map(s => (
                 <div key={s.key} className="flex-between" style={{ fontSize: '0.85rem' }}>
                   <span className="text-muted" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                     <span style={{ width: 10, height: 10, background: s.color, borderRadius: 2, opacity: s.value > 0 ? 1 : 0.35 }}></span>
                     {s.label}
                   </span>
                   <span className="text-primary" style={{ fontWeight: 700 }}>{s.value}</span>
                 </div>
               ))}
             </div>
             {criticalAlertsCount > 0 && <p className="text-danger" style={{ zIndex: 2, fontWeight: 'bold' }}>Critical Alerts Active</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
