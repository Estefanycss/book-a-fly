import { createMachine, assign } from 'xstate';
import { fetchCountries } from '../utils/api';

// const fetchCountries = (context, event) => new Promise((resolve, reject) => {
//   // if (!event.query.length) {
//     return reject('No query specified');
//     // or:
//     // throw new Error('No query specified');
//   // }

//   // return resolve(getSearchResults(event.query));
// });

const removePassengers = assign(
  (context) => context.passengers.splice(0, context.passengers.length)
);

const passengersForm = {
  initial: 'form',
  states: {
    form: {
      on: {
        ADD: {
          target: 'form',
          actions: assign(
            (context, event) => context.passengers.push(event.newPassenger)
          ),
        },
      },
    },
  }
};

const fillCountries = {
  initial: 'loading',
  states: {
    loading: {
      invoke: {
        id: 'getCountries',
        src: () => fetchCountries(),
        onDone: {
          target: 'success',
          actions: assign({ countries: (context, event) => event.data })
        },
        onError: {
          target: 'failure',
          actions: assign({ error: (context, event) => event.data })
        }
      }
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: 'loading' }
      }
    }
  }
};

const bookingMachine = createMachine({
  id: 'buy plane tickets',
  initial: 'initial',
  context: {
    passengers: [],
    countries: [],
    error: '',
    selectedCountry: '',
  },
  states: {
    initial: {
      on: {
        START: 'search'
      }
    },
    search: {
      on: {
        CONTINUE: {
          target: 'passengers',
          actions: assign({
            selectedCountry: (context, event) => event.selectedCountry
          }),
        },
        CANCEL: 'initial'
      },
      ...fillCountries,
    },
    tickets: {
      after: {
        5000: {
          target: 'initial',
          actions: 'removePassengers',
        }
      },
      on: {
        FINISH: {
          target: 'initial',
          actions: 'removePassengers',
        },
      }
    },
    passengers: {
      on: {
        DONE: {
          target: 'tickets',
          cond: 'passengersFormFilled',
        },
        CANCEL: {
          target: 'initial',
          actions: 'removePassengers',
        },
      },
      ...passengersForm,
    },
  },
},
  {
    guards: {
      passengersFormFilled: (context) => {
        return context.passengers.length > 0;
      }
    },
    actions: { removePassengers }
  }
);

export default bookingMachine;