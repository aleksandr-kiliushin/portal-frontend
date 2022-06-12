import { useActor } from "@xstate/react"
import React from "react"
import { Route, Routes } from "react-router-dom"

import PageHeader from "portal-frontend-sdk/dist/components/PageHeader"

import GlobalStateContext from "#machines/GlobalStateContext"

import ProfileSettings from "./ProfileSettings"
import ProfileView from "./ProfileView"

const App: React.FC = () => {
  const globalServices = React.useContext(GlobalStateContext)
  const [currentUser, sendCurrentUserEvent] = useActor(globalServices.currentUserService)

  return (
    <>
      <PageHeader
        currentUserUsername={currentUser.context.data.username}
        onLogoutClick={() => sendCurrentUserEvent("LOGOUT")}
      />
      <Routes>
        <Route element={<ProfileView />} path="/" />
        <Route element={<ProfileSettings />} path="/settings" />
      </Routes>
    </>
  )
}

export default App
