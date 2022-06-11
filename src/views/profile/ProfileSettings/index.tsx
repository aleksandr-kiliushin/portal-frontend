import { useActor } from "@xstate/react"
import Button from "antd/lib/button"
import Input from "antd/lib/input"
import cookie from "cookie"
import { useFormik } from "formik"
import Row from "portal-frontend-sdk/dist/components/Row"
import RowLabel from "portal-frontend-sdk/dist/components/RowLabel"
import React from "react"
import { useNavigate } from "react-router-dom"

import GlobalStateContext from "#machines/GlobalStateContext"
import ProfileHeader from "#views/profile/components/ProfileHeader"

import classes from "./index.module.css"

const ProfileSettings: React.FC = () => {
  const navigate = useNavigate()

  const globalServices = React.useContext(GlobalStateContext)
  const [currentUser, sendCurrentUserEvent] = useActor(globalServices.currentUserService)

  const { activity_field, id } = currentUser.context.data

  const formik = useFormik<{ activity_field: string }>({
    initialValues: {
      activity_field: activity_field ?? "",
    },
    onSubmit: async (formValues) => {
      await fetch(`/api/home/users/${id}/`, {
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-CSRFToken": cookie.parse(document.cookie).csrftoken,
        },
        method: "PATCH",
      }).then((response) => response.json())

      sendCurrentUserEvent("UPDATE_CURRENT_USER")
      navigate("/profile")
    },
  })

  return (
    <>
      <ProfileHeader />
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <Row>
          <RowLabel htmlFor="activity_field">Направление деятельности</RowLabel>
          <Input
            id="activity_field"
            name="activity_field"
            onChange={formik.handleChange}
            type="text"
            value={formik.values.activity_field}
          />
        </Row>
        {formik.dirty && (
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        )}
      </form>
    </>
  )
}

export default ProfileSettings
