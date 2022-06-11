import React from "react"

import AsleepOrAwakeDogExample from "./AsleepOrAwakeDogExample"
import LightExample from "./LightExample"
import PaymentForm from "./PaymentForm"
import PromiseExample from "./PromiseExample"
import SimpleWalkingDog from "./SimpleWalkingDog"
import WalkingDogWithCompoundState from "./WalkingDogWithCompoundState"
import WalkingDogWithParallelStates from "./WalkingDogWithParallelStates"

const AchievementsTabContent: React.FC = () => {
  return (
    <>
      <details>
        <summary>PromiseExample</summary>
        <PromiseExample />
      </details>
      <details>
        <summary>AsleepOrAwakeDogExample</summary>
        <AsleepOrAwakeDogExample />
      </details>
      <details>
        <summary>SimpleWalkingDog</summary>
        <SimpleWalkingDog />
      </details>
      <details>
        <summary>WalkingDogWithCompoundState</summary>
        <WalkingDogWithCompoundState />
      </details>
      <details>
        <summary>WalkingDogWithParallelStates</summary>
        <WalkingDogWithParallelStates />
      </details>
      <details>
        <summary>LightExample</summary>
        <LightExample />
      </details>
      <details>
        <summary>PaymentForm</summary>
        <PaymentForm />
      </details>
    </>
  )
}

export default AchievementsTabContent
