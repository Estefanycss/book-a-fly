import { createMachine, assign } from 'xstate';

const awakeStates = {
  initial: 'caminando',
  states: {
    caminando: {
      on: {
        sentarse: { target: 'sentado' }
      }
    },
    sentado: {
      on: {
        caminar: { target: 'caminando' }
      }
    },
  }
};

const sleepMachine = createMachine({
  key: 'esta el perro despierto?',
  initial: 'dormido',
  states: {
    dormido: {
      on: {
        despertar: { target: 'despierto' }
      },
    },
    despierto: {
      on: {
        dormirse: { target: 'dormido' }
      },
      ...awakeStates
    },
  },
});