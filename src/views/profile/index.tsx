import { useActor } from "@xstate/react"
import Breadcrumbs from "portal-frontend-sdk/dist/components/Breadcrumbs"
import Loader from "portal-frontend-sdk/dist/components/Loader"
import Main from "portal-frontend-sdk/dist/components/Main"
import PageHeader from "portal-frontend-sdk/dist/components/PageHeader"
import { Router, setRouter } from "portal-frontend-sdk/dist/utils/router"
import React from "react"
import { Route, Routes, useNavigate } from "react-router-dom"

import GlobalStateContext from "#machines/GlobalStateContext"

import ProfileSettings from "./ProfileSettings"
import ProfileView from "./ProfileView"

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
    // window.location.replace("http://localhost:3001")
    // return <Loader isFullScreen />
  }

  return (
    <>
      <PageHeader
        currentUserUsername={currentUser.context.data.username}
        onLogoutClick={() => sendCurrentUserEvent("LOGOUT")}
      />
      <Breadcrumbs />
      <Main>
        <Routes>
          <Route element={<ProfileView />} path="/" />
          <Route element={<ProfileSettings />} path="/settings" />
        </Routes>
      </Main>
    </>
  )
}

export default App
