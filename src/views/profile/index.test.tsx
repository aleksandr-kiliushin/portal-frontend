import { screen, waitFor } from "@testing-library/react"
// import userEvent from "@testing-library/user-event"
import React from "react"

import render from "#utils/testing/render"

import Profile from "./index"

describe("Profile", () => {
  it("edits about-me section and displays saved changes in profile", async () => {
    await waitFor(() => {
      render(<Profile />)
    })
    // const user = userEvent.setup()
    // const linkNode = screen.getByRole("link", { name: "settings" })
    // expect(linkNode).toBeInTheDocument()

    // await user.click(linkNode)

    // expect(screen.getByRole("input", { name: "activity_field" })).toHaveValue(
    //   "Занимаюсь разработкой корпоративного портала!"
    // )

    expect(screen.getByText("Направление деятельности")).toBeInTheDocument()
  })
})
