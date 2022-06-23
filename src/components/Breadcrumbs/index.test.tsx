import HomeOutlined from "@ant-design/icons/lib/icons/HomeOutlined"
import SettingOutlined from "@ant-design/icons/lib/icons/SettingOutlined"
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined"
import { screen } from "@testing-library/react"
import React from "react"
import { NavLink } from "react-router-dom"

import { render } from "#utils/testing/render"

import { Breadcrumbs } from "./index"

describe.skip("Breadcrumbs.", () => {
  test("Breadcrumbs component renders.", async () => {
    render(
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

    expect(await screen.findByRole("navigation")).toBeInTheDocument()
  })
})
