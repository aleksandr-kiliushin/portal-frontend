import { useMachine } from "@xstate/react"
import React from "react"
import { createMachine } from "xstate"

const lightMachine = createMachine(
  {
    context: {
      direction: "east",
      elapsed: 0,
    },
    id: "light",
    initial: "green",
    states: {
      green: {
        entry: "alertGreen",
        on: {
          SWITCH_TO_YELLOW: {
            target: "yellow",
          },
        },
      },
      red: {
        on: {
          SWITCH_TO_GREEN: {
            target: "green",
          },
        },
      },
      yellow: {
        on: {
          SWITCH_TO_RED: {
            target: "red",
          },
        },
      },
    },
  },
  {
    actions: {
      alertGreen: (context, event) => {
        // console.log("Green.")
      },
    },
    delays: {},
    guards: {},
    services: {},
  }
)

export const LightExample: React.FC = () => {
  const [state, send] = useMachine(lightMachine)

  return (
    <>
      {state.matches("green") && (
        <div>
          <span>Green light</span>
          <button onClick={() => send("SWITCH_TO_YELLOW")}>Switch to yellow</button>
        </div>
      )}
      {state.matches("yellow") && (
        <div>
          <span>Yellow light</span>
          <button onClick={() => send("SWITCH_TO_RED")}>Switch to red</button>
        </div>
      )}
      {state.matches("red") && (
        <div>
          <span>Red light</span>
          <button onClick={() => send("SWITCH_TO_GREEN")}>Switch to green</button>
        </div>
      )}
    </>
  )
}
