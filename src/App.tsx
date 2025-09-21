import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import Journal from './components/Journal';
import Resources from './components/Resources';

type CurrentPage = 'dashboard' | 'chat' | 'journal' | 'resources';

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('dashboard');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as CurrentPage);
  };

  const handleBack = () => {
    setCurrentPage('dashboard');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'chat':
        return <Chat onBack={handleBack} />;
      case 'journal':
        return <Journal onBack={handleBack} />;
      case 'resources':
        return <Resources onBack={handleBack} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="App">
      {renderCurrentPage()}
    </div>
  );
}

export default App;