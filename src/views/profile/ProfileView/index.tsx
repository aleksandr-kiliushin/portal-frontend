import HomeOutlined from "@ant-design/icons/lib/icons/HomeOutlined"
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined"
import Tabs from "antd/lib/tabs"
import React from "react"
import { NavLink, useSearchParams } from "react-router-dom"

import { Breadcrumbs } from "#components/Breadcrumbs"
import { Main } from "#components/Main"
import { ProfileHeader } from "#views/profile/components/ProfileHeader"

import { AchievementsTabContent } from "./AchievementsTabContent"
import { InformationTabContent } from "./InformationTabContent"
import { isTabSlugValid } from "./helpers"

export const ProfileView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabSlugFromUrl = searchParams.get("tab") ?? ""

  React.useEffect(() => {
    if (isTabSlugValid({ aTabSlug: tabSlugFromUrl })) return
    setSearchParams({ tab: "information" })
  }, [tabSlugFromUrl])

  return (
    <>
      <Breadcrumbs>
        <NavLink to="/">
          <HomeOutlined />
        </NavLink>
        <NavLink to="/profile">
          <UserOutlined />
          <span>Profile</span>
        </NavLink>
      </Breadcrumbs>
      <Main>
        <ProfileHeader isLinkToSettingsShown />
        <Tabs defaultActiveKey={tabSlugFromUrl} onChange={(tabSlug) => setSearchParams({ tab: tabSlug })}>
          <Tabs.TabPane key="information" tab="Information">
            <InformationTabContent />
          </Tabs.TabPane>
          <Tabs.TabPane key="achievements" tab="Achievements">
            <AchievementsTabContent />
          </Tabs.TabPane>
          <Tabs.TabPane key="endorsements" tab="Endorsements">
            There are no endorsements here yet
          </Tabs.TabPane>
          <Tabs.TabPane key="publications" tab="Publications">
            There are no publications here yet
          </Tabs.TabPane>
        </Tabs>
      </Main>
    </>
  )
}
