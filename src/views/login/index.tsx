import { useActor } from "@xstate/react"
import Loader from "portal-frontend-sdk/dist/components/Loader"
import { Router, setRouter } from "portal-frontend-sdk/dist/utils/router"
import React from "react"
import { useNavigate } from "react-router-dom"

import GlobalStateContext from "#machines/GlobalStateContext"

import Form from "./Form"

import classes from "./index.module.css"

const App: React.FC = () => {
  const navigate = useNavigate()

  const globalServices = React.useContext(GlobalStateContext)
  const [currentUser] = useActor(globalServices.currentUserService)

  React.useEffect(() => {
    setRouter(new Router({ navigate }))
  }, [])

  if (currentUser.matches("currentUserFetching")) {
    return <Loader isFullScreen />
  }

  if (currentUser.matches("loggedIn")) {
    navigate("/profile")
    return <Loader isFullScreen />
  }

  return (
    <main className={classes.main}>
      <h1>Welcome</h1>
      <Form />
    </main>
  )
}

export default App
