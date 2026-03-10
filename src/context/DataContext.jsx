import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // Helper to generate random numbers in range
  const randomInRange = (min, max) => (Math.random() * (max - min) + min).toFixed(1);

  // Synthetic State
  const [metrics, setMetrics] = useState({
    flowRate: 45210,
    leaksDetected: 3,
    efficiency: 94.2,
    energy: 1240
  });

  const [zones, setZones] = useState([
    { id: 'Z-01', name: 'Downtown Main', status: 'normal', pressure: 4.2, flow: 125, risk: 'Low' },
    { id: 'Z-02', name: 'Westside Grid', status: 'alert', pressure: 2.8, flow: 180, risk: 'High' },
    { id: 'Z-03', name: 'Industrial Park', status: 'normal', pressure: 4.5, flow: 340, risk: 'Medium' },
    { id: 'Z-04', name: 'North Suburbs', status: 'warning', pressure: 3.6, flow: 85, risk: 'Elevated' }
  ]);

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'critical', desc: 'Sudden pressure drop detected in Main Line A', time: 'Just now', loc: 'Zone Z-02', status: 'Unresolved' },
    { id: 2, type: 'warning', desc: 'Abnormal flow rate anomaly', time: '15 mins ago', loc: 'Pump Station 4', status: 'Investigating' },
    { id: 3, type: 'info', desc: 'Scheduled maintenance block activated', time: '2 hours ago', loc: 'Reservoir B', status: 'Active' },
    { id: 4, type: 'warning', desc: 'Water quality sensor (pH) variance', time: '4 hours ago', loc: 'Zone Z-05', status: 'Resolved' },
  ]);

  const [efficiencyData, setEfficiencyData] = useState({
    flowBars: [60, 80, 40, 90, 75, 45, 85],
    nrw: 12.4,
    energyPerCb: 0.48,
    pumpTime: 18.5
  });

  // Simulation Loop: periodically update data slightly to feel "alive"
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Update Metrics
      setMetrics(prev => ({
        ...prev,
        flowRate: Math.max(40000, Math.min(50000, prev.flowRate + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 50))),
        efficiency: Math.max(90, Math.min(99, parseFloat(prev.efficiency) + (Math.random() > 0.5 ? 0.1 : -0.1))).toFixed(1),
      }));

      // 2. Update Zones (fluctuate pressure and flow slightly)
      setZones(prevZones => prevZones.map(zone => {
        const pressureShift = (Math.random() > 0.5 ? 0.05 : -0.05);
        const flowShift = (Math.random() > 0.5 ? 2 : -2);
        return {
          ...zone,
          pressure: Math.max(2.0, parseFloat(zone.pressure) + pressureShift).toFixed(2),
          flow: Math.max(50, parseFloat(zone.flow) + flowShift).toFixed(0)
        };
      }));

      // 3. Occasionally update flow bars
      if (Math.random() > 0.7) {
        setEfficiencyData(prev => ({
          ...prev,
          flowBars: prev.flowBars.map(b => Math.max(20, Math.min(100, b + (Math.random() > 0.5 ? 5 : -5))))
        }));
      }

      // 4. Randomly generate a new alert sometimes (very rarely)
      if (Math.random() > 0.95) {
        const newAlert = {
          id: Date.now(),
          type: Math.random() > 0.7 ? 'warning' : 'info',
          desc: Math.random() > 0.5 ? 'Minor pressure variance detected' : 'Automated pump calibration start',
          time: 'Just now',
          loc: `Zone Z-0${Math.floor(Math.random() * 5) + 1}`,
          status: 'Active'
        };
        setAlerts(prev => [newAlert, ...prev].slice(0, 8)); // keep max 8
      }

    }, 3000); // update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Compute derived state
  const criticalAlertsCount = alerts.filter(a => a.type === 'critical' && a.status !== 'Resolved').length;
  const warningAlertsCount = alerts.filter(a => a.type === 'warning' && a.status !== 'Resolved').length;
  const systemStatus = criticalAlertsCount > 0 ? 'Critical' : warningAlertsCount > 0 ? 'Warning' : 'Optimal';

  const value = {
    metrics,
    zones,
    alerts,
    efficiencyData,
    criticalAlertsCount,
    warningAlertsCount,
    systemStatus
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
