import { Divider } from "antd"
import Button from "antd/lib/button"
import React from "react"
import { Link } from "react-router-dom"

import { User } from "../../types/user"
import classes from "./index.module.scss"

type Props = {
  currentUserUsername: User["username"]
  // TODO: When access to the current user will be shared, remove props,
  // incapsulate access to current user and define onLogoutClick inside component.
  onLogoutClick(): void
}

const PageHeader: React.FC<React.PropsWithChildren<Props>> = ({ currentUserUsername, onLogoutClick }) => {
  return (
    <div className={classes.pageHeader}>
      <Link className={classes.linkToHome} to="/profile">
        ME.
      </Link>
      <div>
        <Link to="/login">Login</Link>
        <Divider type="vertical" />
        <Link to="/profile">Profile</Link>
        <Divider type="vertical" />
        <Link to="/benefits">Benefits</Link>
      </div>
      <div>
        <span className={classes.username}>{currentUserUsername}</span>
        <Button htmlType="button" onClick={onLogoutClick}>
          Log out
        </Button>
      </div>
    </div>
  )
}

export default PageHeader
