import HomeOutlined from "@ant-design/icons/lib/icons/HomeOutlined"
import SettingOutlined from "@ant-design/icons/lib/icons/SettingOutlined"
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import React from "react"
import { NavLink } from "react-router-dom"

import "#styles/index"

import Breadcrumbs from "./index"

export default {
  component: Breadcrumbs,
  title: "Breadcrumbs",
} as ComponentMeta<typeof Breadcrumbs>

const ThreeBreadcrumbsWithTextTemplate: ComponentStory<typeof Breadcrumbs> = () => {
  return (
    <Breadcrumbs>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/settings">Settings</NavLink>
    </Breadcrumbs>
  )
}

export const ThreeBreadcrumbsWithText = ThreeBreadcrumbsWithTextTemplate.bind({})

const ThreeBreadcrumbsWithIconsTemplate: ComponentStory<typeof Breadcrumbs> = () => {
  return (
    <Breadcrumbs>
      <NavLink to="/">
        <HomeOutlined />
      </NavLink>
      <NavLink to="/profile">
        <UserOutlined />
      </NavLink>
      <NavLink to="/settings">
        <SettingOutlined />
      </NavLink>
    </Breadcrumbs>
  )
}

export const ThreeBreadcrumbsWithIcons = ThreeBreadcrumbsWithIconsTemplate.bind({})

const ThreeBreadcrumbsWithTextAndIconsTemplate: ComponentStory<typeof Breadcrumbs> = () => {
  return (
    <Breadcrumbs>
      <NavLink to="/">
        <HomeOutlined />
        <span>Home</span>
      </NavLink>
      <NavLink to="/profile">
        <UserOutlined />
        <span>Profile</span>
      </NavLink>
      <NavLink to="/settings">
        <SettingOutlined />
        <span>Settings</span>
      </NavLink>
    </Breadcrumbs>
  )
}

export const ThreeBreadcrumbsWithTextAndIcons = ThreeBreadcrumbsWithTextAndIconsTemplate.bind({})
