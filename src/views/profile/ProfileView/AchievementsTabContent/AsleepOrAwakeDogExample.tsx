import { useMachine } from "@xstate/react"
import React from "react"
import { createMachine } from "xstate"

const dogMachine = createMachine({
  id: "dog",
  initial: "awake",
  states: {
    asleep: {
      on: {
        WAKE_UP: "awake",
      },
    },
    awake: {
      on: {
        GO_TO_SLEEP: "asleep",
      },
    },
  },
})

const AsleepOrAwakeDogExample: React.FC = () => {
  const [state, send] = useMachine(dogMachine)

  return (
    <>
      {state.matches("asleep") && (
        <>
          <p>The dog is asleep.</p>
          <button
            onClick={() => {
              send("WAKE_UP")
            }}
          >
            Wake up
          </button>
        </>
      )}
      {state.matches("awake") && (
        <>
          <p>The dog is awake.</p>
          <button
            onClick={() => {
              send("GO_TO_SLEEP")
            }}
          >
            Go to sleep
          </button>
        </>
      )}
    </>
  )
}

export default AsleepOrAwakeDogExample
