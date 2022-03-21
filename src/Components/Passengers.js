import React, { useState } from 'react';
import './Passengers.css';

export const Passengers = ({ state, send }) => {
  const [value, changeValue] = useState('');
  const { passengers } = state.context;

  const onChangeInput = (e) => {
    changeValue(e.target.value);
  }

  const submit = (e) => {
    e.preventDefault();
    send('ADD', { newPassenger: value });
    changeValue('');
  }

  const goToPay = () => {
    send('DONE')
  }

  return (
    <form onSubmit={submit} className='Passengers'>
      <p className='Passengers-title title'>Agrega a las personas que van a volar ✈️</p>
      {passengers.map((passenger, i) => {
        return(<p key={i} className='text'>{passenger}</p>)
      })}
      <input 
        id="name" 
        name="name" 
        type="text" 
        placeholder='Escribe el nombre completo' 
        required 
        value={value} 
        onChange={onChangeInput}
      />
      <div className='Passengers-buttons'>
        <button 
          className='Passengers-add button-secondary'
          type="submit"
        >
          Agregar Pasajero
        </button>
        <button
          className='Passenger-pay button'
          type="button"
          onClick={goToPay}
        >
          Ir a pagar
        </button>
      </div>
    </form>
  );
};