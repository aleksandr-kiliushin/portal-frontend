import { useMachine } from "@xstate/react"
import React from "react"
import { assign, createMachine } from "xstate"

const performFakePayment = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isPaymentSuccessfullyPerformed = Math.random() > 0.5

      if (isPaymentSuccessfullyPerformed) {
        resolve({ paymentSuccessMessage: "Payment completed successfully" })
      }

      reject({ paymentErrorMessage: "Couldn't perform payment" })
    }, 2500)
  })
}

type MachineContext = {
  message: string
}

const machine = createMachine<MachineContext>({
  context: {
    message: "",
  },
  id: "payment-form",
  initial: "idle",
  states: {
    error: {
      on: {
        SUBMIT: [
          {
            cond: (context, event) => {
              return event.data.nameOnCard !== "" && event.data.cardNumber !== ""
            },
            target: "loading",
          },
        ],
      },
    },
    idle: {
      on: {
        SUBMIT: [
          {
            cond: (context, event) => {
              return event.data.nameOnCard !== "" && event.data.cardNumber !== ""
            },
            target: "loading",
          },
          {
            target: "error",
          },
        ],
      },
    },
    loading: {
      invoke: {
        id: "performPayment",
        src: performFakePayment,
        onDone: {
          target: "success",
          actions: assign({
            message: (context, event) => event.data.paymentSuccessMessage,
          }),
        },
        onError: {
          target: "error",
          actions: assign({
            message: (context, event) => event.data.paymentErrorMessage,
          }),
        },
      },
    },
    success: {
      type: "final",
    },
  },
})

// const myUseMachine = () => {
//   // Keep track of the current machine state.
//   const [currentState, setCurrentState] = React.useState(machine.initialState)

//   // Start the service, only once.
//   const service = React.useMemo(() => {
//     return interpret(machine)
//       .onTransition((state) => {
//         if (state.changed) {
//           setCurrentState(state)
//         }
//       })
//       .start()
//   }, [])

//   // Stop the service when the component unmounts.
//   React.useEffect(() => {
//     return () => {
//       service.stop()
//     }
//   }, [])

//   return [currentState, service.send]
// }

const PaymentForm: React.FC = () => {
  const [currentState, send] = useMachine(machine)
  const [formValues, setFormValues] = React.useState({ cardNumber: "", nameOnCard: "" })

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        send({ type: "SUBMIT", data: { ...formValues } })
      }}
    >
      <p>resultCode: {currentState.context.message}</p>

      <label htmlFor="nameOnCard">Name on card</label>
      <input
        id="nameOnCard"
        onChange={(event) => setFormValues({ ...formValues, nameOnCard: event.target.value })}
        type="text"
        value={formValues.nameOnCard}
      />
      <label htmlFor="cardNumber">Card number</label>
      <input
        id="cardNumber"
        onChange={(event) => setFormValues({ ...formValues, cardNumber: event.target.value })}
        type="text"
        value={formValues.cardNumber}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default PaymentForm
