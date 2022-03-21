import { createMachine, assign } from 'xstate';

const fetchCountries = () => {
  new Promise((resolve, reject) => {
  return resolve([]);
})};

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
      },
      ...fillCountries,
    },
    pay: {
      on: {
        FINISH: 'initial',
        CANCEL: {
          target: 'initial',
          actions: assign(
            (context) => context.passengers.splice(0, context.passengers.length)
          ),
        },
      }
    },
    passengers: {
      on: {
        DONE: {
          target: 'pay',
          cond: 'passengersFormFilled',
        },
        CANCEL: {
          target: 'initial',
          actions: assign(
            (context) => context.passengers.splice(0, context.passengers.length)
          ),
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
    }
  }
);