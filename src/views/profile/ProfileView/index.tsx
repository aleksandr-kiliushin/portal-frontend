import Tabs from "antd/lib/tabs"
import React from "react"
import { useSearchParams } from "react-router-dom"

import ProfileHeader from "#views/profile/components/ProfileHeader"

import AchievementsTabContent from "./AchievementsTabContent"
import InformationTabContent from "./InformationTabContent"
import { isTabSlugValid } from "./helpers"

const ProfileView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabSlugFromUrl = searchParams.get("tab") ?? ""

  React.useEffect(() => {
    if (isTabSlugValid({ aTabSlug: tabSlugFromUrl })) return
    setSearchParams({ tab: "information" })
  }, [tabSlugFromUrl])

  return (
    <>
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
    </>
  )
}

export default ProfileView
