import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Dashboard from './components/Dashboard';
import { DataProvider } from './context/DataContext';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <DataProvider>
      <div className="app-layout">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="main-content">
          <TopNav activeTab={activeTab} />
          <Dashboard activeTab={activeTab} />
        </main>
      </div>
    </DataProvider>
  );
}

export default App;
