import { useMachine } from "@xstate/react"
import React from "react"
import { createMachine } from "xstate"

const promiseMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAcBOB7AtgS1mAdMmAHYTbFQDEASgKIBStAwgCqIrqzYAu26x7EAA9EARgAc4-AE5pAJgnSAzKIAMc1QBZVAVgA0IAJ6JpANhmzpAdiW7xp9eKUBfZwbRZcBIqXJU6AMoA8gAyAGq0gsicPHwCSMJikhYK4spqGtr6RmKmOhayVjpKmkpKctKa4q5uIMToEHBRGDh4hCRkFFExvPyCIgiacgbGCLL4oqZTpkrSohWmmouu7i1e+KhgAFZgAMbckN1cvfGgA7bS+E46ykpWClZWqvYjJqoFZtamlXLVtR6tAibWDoAA2ADdDglosc4v1EBcrkobmV7qJHs9TK8EJN3qp8fjNDpvkTylYViAAV4jrE+gkBhJsRIas4gA */
  createMachine({
    id: "promise",
    initial: "pending",
    states: {
      pending: {
        on: {
          REJECT: {
            target: "rejected",
          },
          RESOLVE: {
            target: "resolved",
          },
        },
      },
      rejected: {
        type: "final",
      },
      resolved: {
        type: "final",
      },
    },
  })

const BadgesTabContent: React.FC = () => {
  const [state, send] = useMachine(promiseMachine)

  return (
    <>
      {state.matches("pending") && (
        <>
          <p>Loading ...</p>
          <button
            onClick={() => {
              send("REJECT")
            }}
          >
            Reject promise
          </button>
          <button
            onClick={() => {
              send("RESOLVE")
            }}
          >
            Resolve promise
          </button>
        </>
      )}
      {state.matches("rejected") && <p>The promise has been rejected</p>}
      {state.matches("resolved") && <p>The promise has been resolved</p>}
    </>
  )
}

export default BadgesTabContent
