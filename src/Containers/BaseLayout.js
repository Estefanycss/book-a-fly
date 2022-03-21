import React from 'react';
import { useMachine } from "@xstate/react";
import { Nav } from '../Components/Nav';
import { StepsLayout } from './StepsLayout';
import bookingMachine from '../Machines/bookingMachine'; 
import './BaseLayout.css';

export const BaseLayout = () => {
  const [state, send] = useMachine(bookingMachine, { devTools: true });

  console.log('machine', state);
 
  return (
    <div className='BaseLayout'>
      <Nav state={state} send={send}/>
      <StepsLayout state={state} send={send}/>
    </div>
  );
}; 