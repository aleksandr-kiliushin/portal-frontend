import { SettingOutlined } from "@ant-design/icons"
import { useActor } from "@xstate/react"
import React from "react"
import { Link } from "react-router-dom"

import GlobalStateContext from "#machines/GlobalStateContext"

import classes from "./index.module.scss"

type Props = {
  isLinkToSettingsShown?: boolean
}

const ProfileHeader: React.FC<Props> = ({ isLinkToSettingsShown }) => {
  const globalServices = React.useContext(GlobalStateContext)
  const [currentUser] = useActor(globalServices.currentUserService)

  const { avatars, first_name, last_name } = currentUser.context.data

  return (
    <div className={classes.profileHeader}>
      <img className={classes.avatar} src={avatars?.big} />
      <h1>
        {first_name} {last_name}
      </h1>
      {isLinkToSettingsShown && (
        <Link className={classes.linkToSettings} to="/profile/settings">
          <SettingOutlined />
        </Link>
      )}
    </div>
  )
}

export default ProfileHeader
