import { useActor } from "@xstate/react"
import React from "react"

import { Row } from "#components/Row"
import { RowGroup } from "#components/RowGroup"
import { RowLabel } from "#components/RowLabel"
import { GlobalStateContext } from "#machines/GlobalStateContext"

import classes from "./index.module.scss"

export const InformationTabContent: React.FC = () => {
  const globalServices = React.useContext(GlobalStateContext)
  const [currentUser] = useActor(globalServices.currentUserService)

  const { activity_field, company_name, post } = currentUser.context.data

  return (
    <RowGroup className={classes.informationWrapper}>
      <Row>
        <RowLabel>Компания</RowLabel>
        <span>{company_name}</span>
      </Row>
      <Row>
        <RowLabel>Позиция</RowLabel>
        <span>{post}</span>
      </Row>
      <Row>
        <RowLabel>Направление деятельности</RowLabel>
        <span>{activity_field}</span>
      </Row>
    </RowGroup>
  )
}
