import React from 'react';
import Overview from './Overview';
import LeakDetection from './LeakDetection';
import Efficiency from './Efficiency';
import Alerts from './Alerts';
import Forecast from './Forecast';
import './Dashboard.css';

function Dashboard({ activeTab }) {
  const renderContent = () => {
    switch(activeTab) {
      case 'overview': return <Overview />;
      case 'leaks': return <LeakDetection />;
      case 'efficiency': return <Efficiency />;
      case 'alerts': return <Alerts />;
      case 'forecast': return <Forecast />;
      default: return <Overview />;
    }
  };

  return (
    <div className="dashboard-content">
      {renderContent()}
    </div>
  );
}

export default Dashboard;
