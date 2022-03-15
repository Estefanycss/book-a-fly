/*
To do:
  - Check how to pass object to context
  - Think of parallel machines example
  - Create form machine as a const 
  - Add guard to have at least one passenger to continue
  - Add a delay transition from pay to initial
  - Add a service to get data from endpoint
  - Add visual states (components)
*/

import { createMachine, assign } from 'xstate';

const bookingMachine = createMachine({
  id: 'buy plane tickets',
  initial: 'initial',
  context: {
    passengersCount: 0,
  },
  states: {
    initial: {
      on: {
        START: 'search'
      }
    },
    search: {
      on: {
        CONTINUE: 'passengers',
        CANCEL: 'initial'
      }
    },
    passengers: {
      on: {
        DONE: 'pay',
        CANCEL: 'initial',
      },
      // initial: 'form',
      // states: {
      //   form: {
      //     on: {
      //       check: 'validating',
      //     }
      //   },
      //   validating: {
      //     on: {
      //       valid: 'valid',
      //       invalid: 'form',
      //     }
      //   },
      //   valid: {
      //     on: {
      //       ADD: {
      //         target: 'form',
      //         actions: assign({
      //           passengersCount: (context, event) => context.passengersCount + 1
      //         })
      //       },
      //     },
      //   }
      // }
    },
    pay: {
      on: {
        FINISH: 'initial',
        CANCEL: 'initial',
      }
    }
  }
});

export default bookingMachine;