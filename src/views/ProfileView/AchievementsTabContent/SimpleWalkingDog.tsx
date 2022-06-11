import { useMachine } from "@xstate/react"
import React from "react"
import { createMachine } from "xstate"

const walkingDogMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgHcBDAGwGsBLDKAWgiygDpiKAXKqfEABy1jYpYMXAB6IA7ADZGAZgCMAJgAsADiWSAnBskyZKyegCeiOZIAMjM1asb5MhZJ0zkaEMXIc6DZqUrUuvPzsQqISAKyMcmEKuiphGkqJcmpGiAoKGpbWYTnqGipySi7o7n609EylAJKwAMJYALbcJGCskAF8AiFIIGIISgqpCBpyWdbqYY66ycVuvp4VHUGCwj19yUMzLshAA */
  createMachine({
    id: "walking-dog",
    initial: "waiting",
    states: {
      waiting: {
        on: {
          GO_FOR_A_WALK: {
            target: "walking",
          },
        },
      },
      walking: {
        on: {
          COMPLETE_THE_WALK: {
            target: "walkIsCompleted",
          },
        },
      },
      walkIsCompleted: {
        type: "final",
      },
    },
  })

const SimpleWalkingDog: React.FC = () => {
  const [state, send] = useMachine(walkingDogMachine)

  return (
    <div>
      {state.matches("waiting") && (
        <>
          <p>The dog is waiting for a walk.</p>
          <button
            onClick={() => {
              send("GO_FOR_A_WALK")
            }}
          >
            Go for a walk
          </button>
        </>
      )}
      {state.matches("walking") && (
        <>
          <p>The dog is walking.</p>
          <button
            onClick={() => {
              send("COMPLETE_THE_WALK")
            }}
          >
            Complete the walk
          </button>
        </>
      )}
      {state.matches("walkIsCompleted") && <p>The walk is completed.</p>}
    </div>
  )
}

export default SimpleWalkingDog
