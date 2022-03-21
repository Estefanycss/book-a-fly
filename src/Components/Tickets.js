import React from 'react';
import './Tickets.css';

export const Tickets = ({ send, context }) => {
  const finish = () => {
    send('FINISH');
  };

  return (
    <div className='Tickets'>
      <p className='Tickets-description description'>Gracias por volar con book a fly💚</p>
      <div className='Tickets-ticket'>
        <div className='Tickets-country'>{context.selectedCountry}</div>
        <div className='Tickets-passengers'>
          <span>✈</span>
          {context.passengers.map((person, i) => <p key={i}>{person}</p>)}
        </div>
      </div>
      <button onClick={finish} className='Tickets-finalizar button'>Finalizar</button>
    </div>
  );
}; 