import React from 'react';
import { Welcome } from '../Components/Welcome';
import { Search } from '../Components/Search';
import './StepsLayout.css';

export const StepsLayout = ({ state, send }) => {
  const renderContent = () => {
    if (state.matches('initial')) return <Welcome send={send} />;
    if (state.matches('search')) return <Search send={send} />;
    else return null;
  };

  return (
    <div className='StepsLayout'>
      {renderContent()}
    </div>
  );
}; 