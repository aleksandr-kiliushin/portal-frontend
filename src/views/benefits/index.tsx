import { useActor } from "@xstate/react"
import Breadcrumbs from "portal-sdk-fake/dist/components/Breadcrumbs"
import Loader from "portal-sdk-fake/dist/components/Loader"
import Main from "portal-sdk-fake/dist/components/Main"
import PageHeader from "portal-sdk-fake/dist/components/PageHeader"
import { Router, setRouter } from "portal-sdk-fake/dist/utils/router"
import React from "react"
import { Route, Routes, useNavigate } from "react-router-dom"

import GlobalStateContext from "#machines/GlobalStateContext"

import BenefitCategories from "./BenefitCategories"
import BenefitCategory from "./BenefitCategory"

const App: React.FC = () => {
  const navigate = useNavigate()

  React.useEffect(() => {
    setRouter(new Router({ navigate }))
  }, [])

  const globalServices = React.useContext(GlobalStateContext)
  const [currentUser, sendCurrentUserEvent] = useActor(globalServices.currentUserService)

  if (currentUser.matches("currentUserFetching")) {
    return <Loader isFullScreen />
  }

  if (currentUser.matches("loggedOut")) {
    window.location.replace("http://localhost:3001")
  }

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
