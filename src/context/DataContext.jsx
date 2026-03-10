import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const randomInRange = (min, max) => Math.random() * (max - min) + min;
  const roundTo = (v, digits = 1) => Number(v.toFixed(digits));

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

  // 24h synthetic pressure series (hourly)
  const [pressure24h, setPressure24h] = useState(() => {
    const points = Array.from({ length: 24 }, (_, i) => ({
      t: i,
      pressure: roundTo(randomInRange(2.6, 4.9), 2),
    }));
    return points;
  });

  // 72h synthetic demand forecast series (every 6 hours -> 13 points including 0)
  const [forecast72h, setForecast72h] = useState(() => {
    const points = Array.from({ length: 13 }, (_, i) => {
      const hour = i * 6;
      const base = 42000 + 2500 * Math.sin((i / 12) * Math.PI * 2);
      const noise = randomInRange(-1200, 1200);
      const demand = clamp(base + noise, 36000, 52000);
      const capacity = 50000;
      return { hour, demand: Math.round(demand), capacity };
    });
    return points;
  });

  // Simulation Loop: periodically update data slightly to feel "alive"
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Update Metrics
      setMetrics(prev => ({
        ...prev,
        flowRate: clamp(prev.flowRate + (Math.random() > 0.5 ? 1 : -1) * Math.floor(randomInRange(10, 80)), 40000, 52000),
        efficiency: roundTo(clamp(Number(prev.efficiency) + (Math.random() > 0.5 ? 0.1 : -0.1), 90, 99), 1),
        energy: Math.round(clamp(prev.energy + (Math.random() > 0.55 ? 1 : -1) * randomInRange(5, 25), 900, 1700)),
      }));

      // 2. Update Zones (fluctuate pressure and flow slightly)
      setZones(prevZones => prevZones.map(zone => {
        const pressureShift = (Math.random() > 0.5 ? 0.05 : -0.05);
        const flowShift = (Math.random() > 0.5 ? 2 : -2);
        return {
          ...zone,
          pressure: roundTo(Math.max(2.0, Number(zone.pressure) + pressureShift), 2),
          flow: Math.round(Math.max(50, Number(zone.flow) + flowShift))
        };
      }));

      // 3. Occasionally update flow bars
      if (Math.random() > 0.7) {
        setEfficiencyData(prev => ({
          ...prev,
          flowBars: prev.flowBars.map(b => clamp(b + (Math.random() > 0.5 ? 5 : -5), 20, 100)),
          nrw: roundTo(clamp(prev.nrw + (Math.random() > 0.6 ? -0.1 : 0.1), 6, 18), 1),
          energyPerCb: roundTo(clamp(prev.energyPerCb + (Math.random() > 0.5 ? -0.01 : 0.01), 0.32, 0.68), 2),
          pumpTime: roundTo(clamp(prev.pumpTime + (Math.random() > 0.6 ? -0.1 : 0.1), 10, 22), 1),
        }));
      }

      // 4. Update pressure series (slide window and add new point)
      setPressure24h(prev => {
        const last = prev[prev.length - 1]?.pressure ?? 3.8;
        const drift = randomInRange(-0.12, 0.12);
        const next = roundTo(clamp(last + drift, 2.2, 5.2), 2);
        const nextSeries = [...prev.slice(1), { t: prev[prev.length - 1].t + 1, pressure: next }];
        return nextSeries;
      });

      // 5. Update forecast slightly (keep shape but nudge demand)
      setForecast72h(prev => prev.map((p, idx) => {
        if (idx === 0) {
          return { ...p, demand: Math.round(clamp(metrics.flowRate + randomInRange(-800, 800), 36000, 52000)) };
        }
        const wiggle = randomInRange(-250, 250);
        return { ...p, demand: Math.round(clamp(p.demand + wiggle, 34000, 54000)) };
      }));

      // 6. Randomly generate a new alert sometimes (very rarely)
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
  const infoAlertsCount = alerts.filter(a => a.type === 'info' && a.status !== 'Resolved').length;
  const systemStatus = criticalAlertsCount > 0 ? 'Critical' : warningAlertsCount > 0 ? 'Warning' : 'Optimal';

  const value = {
    metrics,
    zones,
    alerts,
    efficiencyData,
    pressure24h,
    forecast72h,
    criticalAlertsCount,
    warningAlertsCount,
    infoAlertsCount,
    systemStatus
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
