import React from 'react';
import { useData } from '../context/DataContext';
import './Overview.css';

function Overview() {
  const { metrics, zones, criticalAlertsCount } = useData();

  // Highlight any active leaks based on risk level
  const activeLeaksCount = zones.filter(z => z.status === 'alert').length;

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
          <div className="chart-placeholder flex-center">
            {/* Mock Chart Area */}
            <div className="mock-chart-line"></div>
            <p className="text-muted" style={{ zIndex: 2 }}>Real-time Visualization Engine Active</p>
          </div>
        </div>
        
        <div className="chart-card glass-panel side-chart">
          <div className="chart-header">
            <h4>Alert Distribution</h4>
          </div>
          <div className="chart-placeholder flex-center" style={{ flexDirection: 'column', gap: '1rem' }}>
             <div className="mock-donut"></div>
             {criticalAlertsCount > 0 && <p className="text-danger" style={{ zIndex: 2, fontWeight: 'bold' }}>Critical Alerts Active</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
