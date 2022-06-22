import { useActor } from "@xstate/react"
import React from "react"

import Row from "#components/Row"
import RowGroup from "#components/RowGroup"
import RowLabel from "#components/RowLabel"
import GlobalStateContext from "#machines/GlobalStateContext"

import classes from "./index.module.css"

const InformationTabContent: React.FC = () => {
  const globalServices = React.useContext(GlobalStateContext)
  const [currentUser] = useActor(globalServices.currentUserService)

  const { activity_field, company_name, post } = currentUser.context.data

  return (
    <RowGroup className={classes.informationWrapper}>
      <Row>
        <RowLabel>Компания</RowLabel>
        {company_name}
      </Row>
      <Row>
        <RowLabel>Позиция</RowLabel>
        {post}
      </Row>
      <Row>
        <RowLabel>Направление деятельности</RowLabel>
        {activity_field}
      </Row>
    </RowGroup>
  )
}

export default InformationTabContent
