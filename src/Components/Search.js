import React, { useState } from 'react';
import './Search.css';

export const Search = ({ send }) => {
  const [flight, setFlight] = useState('');

  const handleSelectChange = (event) => {
    setFlight(event.target.value);
  };

  const goToPassengers = () => {
    if (flight !== '') {
      send('CONTINUE');
    }
  };

  const options = ['México', 'Colombia', 'España', 'Japón'];

  return (
    <div className='Search'>
      <p className='Search-title title'>Busca tu destino</p>
      <select className='Search-select' value={flight} onChange={handleSelectChange}>
        <option value="" disabled selected>Escoge un país</option>
        {options.map((option) => <option value={option} key={option}>{option}</option>)}
      </select>
      <button onClick={goToPassengers} disabled={flight === ''} className='Search-continue button'>Continuar</button>
    </div>
  );
}; 