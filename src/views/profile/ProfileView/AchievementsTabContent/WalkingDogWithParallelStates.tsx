import { useMachine } from "@xstate/react"
import React from "react"
import { createMachine } from "xstate"

const walkingDogMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QHcCGAbA1gSwHZQFoIB7KAOjWwBc8oBiAcQHkB9AMSYCUWBBFgdR4AZANKJQAB2Kxq2YrnEgAHogIAmABwBGMgGYADAHY1W-VoCsATg0aALLoA0IAJ6rdJsmt0b9lw1t0ANg01W0DzAF8IpzQsWiJSCgwcfCS4-AAVMABbCTIAJwBXXFxaOgBlISZ+FgARaoA5RSkZGnlFFQQCIMsyW0NzXS1QzQCNRxdEC1syQ0DdW0tdd11zfvMNKJjk+JJyWJT9ncycvKKSsvKAVVragFEGlnKMpgAFZulZdqRlKctzMjjfSaazmOagtROVwIZYaTwmSyLEwbWw+WxbEAHXaJLGpXFQLK5MiwKjECQSWgZYjlUoAM1pDGIxAg5WyYHQ6FgFVedzutRYV3ePxaXwUP06WiWZERg1CukM+kCtlRUMQM0MPjmYVsw0Mlmshgx+ISR3SpsOhLyJLJFMy1LpDKZLLZHK511uDyePL5AqFkk+bTFoE6ail43s5lMkcsRjsqphUsWvi0CrCiv66OimOOhD2aUO+cppzIACtCiT+Dnubz+YKPq05EHfl0TLoyEZdPrDAtDL3BoF49NZvNFssvGs5kacybC3ic5bS+WqJWzRUXn6QCLAx1EAs2+ZBr4FqPAvpVvGCPN22tvP5AuEAqsp2aZ-iyFRUNh0GRcMRl6goCgS4Mh4TgMgEHgGAYABJBoGHrUUdwQQItB0DUFUCNRwj7SVB1sfRZi0EINklf5bHMLDn0OV8c3fT9vzQQDgLeCCoNg+DhQDRskO0AFIx1FDQ2MOxIUmBAtHwwjxjUMEiL8SMqOxc0ygAYSYABZV4hDuDI7hYDIAAk9MEUQEO3cVEC8QIyCsCjhg0awtHmfQNAvdwdC8bRFXGQJrAcqIs1-CA4EUY080oGh8DM7iLJbe8yCVIYUPIjRMOCC9yOs-QrH+BzIxc+9FPwGizVnAli3OUoos4htvmDNx9AIoJFURRE1D7Wx428az9V8cxsPwlNsqK3McVo-EF2tclKXtbB6UZZlWXZTlorq5tQjhFMvJc0MFhk1yxMlNQyGGSw1C8ZY5gosIRpKgsJuLMsKxzVam06bphhsjRjHCExuwsA7oUvXoD3sfp5g0frTEzbYX3C8b51OV6kO6RMBiGEZtG8CYgYk47QaCVDJWBIjbvh0qPy-H8-0rJjqv9Wq3sQBVDE8YFFkSoxhnMC9fJsm9we8KGzzJsaKfopI6agZHYv8XpxgCRzYxkrQutPNntCwhylTsmHszhsWC0p9AZfqhANlZ9DFSwsEBlwsSCDx-n7BQ1CYxMTYszCw3aFN5sCB1Vn1gx2xRmxi9kWd1ZlVQlY9e981oNgFTiFydAwCoSA-ZDeV+eS-VfPlAZOodzLr31DZ-lMVLAlF6WasQ2KA51Pp0eGUOsfGC8KN6bKK+MGMO4CiIgA */
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
        type: "parallel",
        states: {
          walkingTemp: {
            initial: "justWalking",
            states: {
              running: {
                on: {
                  SLOW_DOWN: {
                    target: "justWalking",
                  },
                  SUDDEN_STOP: {
                    target: "stoppingToSniffGoodSmells",
                  },
                },
              },
              stoppingToSniffGoodSmells: {
                on: {
                  SPEED_UP: {
                    target: "justWalking",
                  },
                  SUDDEN_SPEED_UP: {
                    target: "running",
                  },
                },
              },
              justWalking: {
                on: {
                  SPEED_UP: {
                    target: "running",
                  },
                  STOP: {
                    target: "stoppingToSniffGoodSmells",
                  },
                },
              },
            },
          },
          tail: {
            initial: "notWagging",
            states: {
              notWagging: {
                on: {
                  START_WAGGING: {
                    target: "wagging",
                  },
                },
              },
              wagging: {
                on: {
                  STOP_WAGGING: {
                    target: "notWagging",
                  },
                },
              },
            },
          },
        },
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

export const WalkingDogWithParallelStates: React.FC = () => {
  const [state, send] = useMachine(walkingDogMachine)

  return (
    <>
      {state.matches("waiting") && (
        <div>
          <p>The dog is waiting for a walk.</p>
          <button onClick={() => send("GO_FOR_A_WALK")}>Go for a walk</button>
        </div>
      )}
      {state.matches("walking.walkingTemp.justWalking") && (
        <p>
          <span>The dog is walking (just walking)</span>
          <button onClick={() => send("SPEED_UP")}>SPEED_UP</button>
          <button onClick={() => send("STOP")}>STOP</button>
        </p>
      )}
      {state.matches("walking.walkingTemp.running") && (
        <p>
          <span>The dog is walking (running)</span>
          <button onClick={() => send("SLOW_DOWN")}>SLOW_DOWN</button>
          <button onClick={() => send("SUDDEN_STOP")}>SUDDEN_STOP</button>
        </p>
      )}
      {state.matches("walking.walkingTemp.stoppingToSniffGoodSmells") && (
        <p>
          <span>The dog is walking (stoppingToSniffGoodSmells)</span>
          <button onClick={() => send("SUDDEN_SPEED_UP")}>SUDDEN_SPEED_UP</button>
          <button onClick={() => send("SPEED_UP")}>SPEED_UP</button>
        </p>
      )}
      {state.matches("walking.tail.wagging") && (
        <p>
          <span>Wagging</span>
          <button onClick={() => send("STOP_WAGGING")}>STOP_WAGGING</button>
        </p>
      )}
      {state.matches("walking.tail.notWagging") && (
        <p>
          <span>Not wagging</span>
          <button onClick={() => send("START_WAGGING")}>START_WAGGING</button>
        </p>
      )}
      {state.matches("walking") && <button onClick={() => send("COMPLETE_THE_WALK")}>Complete the walk</button>}
      {state.matches("walkIsCompleted") && <p>The walk has been completed.</p>}
    </>
  )
}
