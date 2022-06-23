import { useMachine } from "@xstate/react"
import React from "react"
import { createMachine } from "xstate"

const walkingDogMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QHcCGAbA1gSwHZQFoIB7KAOjWwBc8oBiAcQHkB9AMSYCUWBBFgdR4AZANKJQAB2Kxq2YrnEgAHogIBWAMxkA7AE4N2gGwAmABzHjagIzaNagDQgAnqttkrpjboAs3zwAZPNVNDAF9QxzQsWiJSCgwcfDIAJwBXXFxaOgBlISZ+FgARfIA5RSkZGnlFFQRjbzUyNW1tY11Df2N-f28rC0cXBCs1YzJ-NTVdEe8Nb0NvbVNwyISYknIoxPI0jKzsgFVCwoBREpZsgBUmAAVy6VlqpGVEb10rMlMrdp6GzTV-KwDF6mXRkYzDUydLymXotbzLECbNZxJFJWBUYgSCS0C7EbKZABmBIYxGIEGyAFswOh0LActdjsdCix9rcnhUHgonrUCFYNKYmtp-IYPD5jIZtF9TECEL1QYZDBpwcF9CZNGEIojVvhYhtteR0ZjsfhcfjsESSWTKdTaTlDicztkGUyWWzJPcqlzQLVmu9NFZXkY+Z4RTLJlpITC1IZdKZmtpegjUYR1vFokkAFapdH8fX0xnM1l3SpyL3POrRsgafxePkdDRWTowmXGVpkOYJuzjXQ9CVJ-W6tNbMhZnN5y43YucmqIDxVwz-BX+muaaXOF5fMgKpUQ1WWDQalbplMovMAYSYAFlrkJjhdjiwLgAJB+CURTz0z2XzdyBBVQiYNBlAg3A8Lw1AaBtugBcJNVwMk4EUZNB0oGh8A-UsvwILx3DaSVenBSxYx8YCugFbpgmFeZ-l0RZ+2PFD9RSdJMnQ9kPUw7lEHDHQLBBBtbHGYUW0CLdNB8EZjAE4Y1HorZGOPMhDSxHE8UJYlSXJKkaXgdiS0eb1VGGfwxlVcSBOIsNTG0KtAgaBopL8Lw5ORPVFNHKhc2PDCDPLAgfHbVpo0MGFZiVEIRIFBdvABBU5koloXJ1VNkx8sseRsbxTIPcybEs9cED0MYJimSM5m8cENCSk83MwABJWAz2ICkJHQMAqEgNKv3isYY0mQSJV8BZSNEijITimjFiqzVkPWLquIQXlY2yhcvAskFSM+MZxnG8T+qsWDQiAA */
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

export const WalkingDogWithCompoundState: React.FC = () => {
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
          <p>
            <span>The dog is walking</span>
            {state.matches("walking.justWalking") && (
              <>
                <span>(just walking)</span>
                <button
                  onClick={() => {
                    send("SPEED_UP")
                  }}
                >
                  SPEED_UP
                </button>
                <button
                  onClick={() => {
                    send("STOP")
                  }}
                >
                  STOP
                </button>
              </>
            )}
            {state.matches("walking.running") && (
              <>
                <span>(running)</span>
                <button
                  onClick={() => {
                    send("SLOW_DOWN")
                  }}
                >
                  SLOW_DOWN
                </button>
                <button
                  onClick={() => {
                    send("SUDDEN_STOP")
                  }}
                >
                  SUDDEN_STOP
                </button>
              </>
            )}
            {state.matches("walking.stoppingToSniffGoodSmells") && (
              <>
                <span>(just stoppingToSniffGoodSmells)</span>
                <button
                  onClick={() => {
                    send("SUDDEN_SPEED_UP")
                  }}
                >
                  SUDDEN_SPEED_UP
                </button>
                <button
                  onClick={() => {
                    send("SPEED_UP")
                  }}
                >
                  SPEED_UP
                </button>
              </>
            )}
          </p>
          <button
            onClick={() => {
              send("COMPLETE_THE_WALK")
            }}
          >
            Complete the walk
          </button>
        </>
      )}
      {state.matches("walkIsCompleted") && <p>The walk has been completed.</p>}
    </div>
  )
}
