import { useActor } from "@xstate/react"
import React from "react"
import { Route, Routes } from "react-router-dom"

import { Breadcrumbs } from "#components/Breadcrumbs"
import { Main } from "#components/Main"
import { PageHeader } from "#components/PageHeader"
import { GlobalStateContext } from "#machines/GlobalStateContext"

import { BenefitCategories } from "./BenefitCategories"
import { BenefitCategory } from "./BenefitCategory"

export const Benefits: React.FC = () => {
  const globalServices = React.useContext(GlobalStateContext)
  const [currentUser, sendCurrentUserEvent] = useActor(globalServices.currentUserService)

  return (
    <>
      <PageHeader
        currentUserUsername={currentUser.context.data.username}
        onLogoutClick={() => sendCurrentUserEvent("LOGOUT")}
      />
      <Breadcrumbs />
      <Main>
        <h1>Benefits</h1>
        <Routes>
          <Route element={<BenefitCategories />} path="/" />
          <Route element={<BenefitCategory />} path="/:categorySlug" />
        </Routes>
      </Main>
    </>
  )
}
