import { useActor } from "@xstate/react"
import Loader from "portal-frontend-sdk/dist/components/Loader"
import { Router, setRouter } from "portal-frontend-sdk/dist/utils/router"
import React from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"

import GlobalStateContext from "#machines/GlobalStateContext"

import Benefits from "./benefits"
import Login from "./login"
import Profile from "./profile"

const Views: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  React.useEffect(() => {
    setRouter(new Router({ navigate }))
  }, [])

  const globalServices = React.useContext(GlobalStateContext)
  const [currentUser] = useActor(globalServices.currentUserService)

  if (currentUser.matches("currentUserFetching")) {
    return <Loader isFullScreen />
  }

  if (currentUser.matches("loggedOut") && location.pathname.startsWith("/login") === false) {
    navigate("/login")
  }

  if (currentUser.matches("loggedIn") && location.pathname.startsWith("/login")) {
    navigate("/profile")
  }

  return (
    <Routes>
      <Route element={<Login />} path="/login" />
      <Route element={<Benefits />} path="/benefits/*" />
      <Route element={<Profile />} path="/profile/*" />
    </Routes>
  )
}

export default Views
