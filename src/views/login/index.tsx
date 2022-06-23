import { useActor } from "@xstate/react"
import React from "react"
import { useNavigate } from "react-router-dom"

import { Loader } from "#components/Loader"
import { GlobalStateContext } from "#machines/GlobalStateContext"

import { Form } from "./Form"

import classes from "./index.module.scss"

export const Login: React.FC = () => {
  const navigate = useNavigate()

  const globalServices = React.useContext(GlobalStateContext)
  const [currentUser] = useActor(globalServices.currentUserService)

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
