import { useActor } from "@xstate/react"
import React from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"

import { Loader } from "#components/Loader"
import { GlobalStateContext } from "#machines/GlobalStateContext"
import { Router, setRouter } from "#utils/router"

import { Benefits } from "./benefits"
import { Login } from "./login"
import { Profile } from "./profile"

export const Views: React.FC = () => {
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
