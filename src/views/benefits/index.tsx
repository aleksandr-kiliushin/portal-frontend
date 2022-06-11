import { useActor } from "@xstate/react"
import Breadcrumbs from "portal-frontend-sdk/dist/components/Breadcrumbs"
import Main from "portal-frontend-sdk/dist/components/Main"
import PageHeader from "portal-frontend-sdk/dist/components/PageHeader"
import React from "react"
import { Route, Routes } from "react-router-dom"

import GlobalStateContext from "#machines/GlobalStateContext"

import BenefitCategories from "./BenefitCategories"
import BenefitCategory from "./BenefitCategory"

const App: React.FC = () => {
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

export default App
