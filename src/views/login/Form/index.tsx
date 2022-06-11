import { useActor } from "@xstate/react"
import Button from "antd/lib/button"
import Input from "antd/lib/input"
import { useFormik } from "formik"
import Row from "portal-sdk-fake/dist/components/Row"
import RowGroup from "portal-sdk-fake/dist/components/RowGroup"
import RowLabel from "portal-sdk-fake/dist/components/RowLabel"
import React from "react"

import GlobalStateContext from "#machines/GlobalStateContext"

import classes from "./index.module.css"

const App: React.FC = () => {
  const globalServices = React.useContext(GlobalStateContext)
  const [, sendCurrentUserEvent] = useActor(globalServices.currentUserService)

  const formik = useFormik({
    initialValues: {
      password: "",
      username: "",
    },
    onSubmit: ({ username }) => {
      sendCurrentUserEvent({ type: "LOGIN", username })
    },
  })

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <RowGroup>
        <Row>
          <RowLabel>Login</RowLabel>
          <Input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
        </Row>
        <Row>
          <RowLabel>Password</RowLabel>
          <Input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </Row>
      </RowGroup>
      <Button htmlType="submit" type="primary">
        Log in
      </Button>
    </form>
  )
}

export default App