import { fireEvent, screen, waitFor } from "@testing-library/react"
import React from "react"
import { act } from "react-dom/test-utils"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import "whatwg-fetch"

import render from "#utils/testing/render"

import ProfileSettings from "./ProfileSettings"
import ProfileView from "./ProfileView"

export const createFetchSuccessfulResponse = (body?: unknown) => {
  return Promise.resolve({
    async json() {
      return Promise.resolve(body)
    },
    ok: true,
  })
}

describe("Profile", () => {
  beforeEach(() => {
    jest.spyOn(globalThis, "fetch").mockReturnValue(
      // @ts-ignore
      createFetchSuccessfulResponse({
        activity_field: "Занимаюсь разработкой корпоративного портала!",
        first_name: "Александр",
        id: 1502417,
        last_name: "Килюшин",
        post: "Инженер-разработчик клиентских приложений",
        username: "a.kilyushin",
      })
    )
  })

  afterEach(() => {
    ;(globalThis.fetch as jest.Mock).mockRestore()
  })

  it("edits about-me section and displays saved changes in profile", async () => {
    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <Routes>
          <Route element={<ProfileView />} path="/profile" />
          <Route element={<ProfileSettings />} path="/profile/settings" />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText("Направление деятельности")).toBeInTheDocument()
    await waitFor(async () => {
      fireEvent.click(screen.getByRole("link", { name: "settings" }))
    })
    const activityFieldInput = screen.getByRole("textbox", { name: "Направление деятельности" })
    expect(activityFieldInput).toBeInTheDocument()
    expect(screen.queryByText("Компания")).not.toBeInTheDocument()
    await act(async () => {
      fireEvent.change(screen.getByRole("textbox", { name: "Направление деятельности" }), {
        target: { value: "spider-man" },
      })
    })
    const submitButton = screen.getByRole("button", { name: "Save" })
    await act(async () => {
      fireEvent.click(submitButton)
    })
    expect(screen.queryByText("Компания")).toBeInTheDocument()
    console.log((fetch as jest.Mock).mock)
    // ;(fetch as jest.Mock).mock.results[0].value.then((response) => response.json()).then(console.log)
  })
})
