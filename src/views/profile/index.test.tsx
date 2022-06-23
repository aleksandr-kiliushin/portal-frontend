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

const aleksandrKiliushin = {
  activity_field: "Занимаюсь разработкой корпоративного портала!",
  first_name: "Александр",
  id: 1502417,
  last_name: "Килюшин",
  post: "Инженер-разработчик клиентских приложений",
  username: "a.kilyushin",
}

describe("Profile", () => {
  beforeEach(() => {
    // @ts-ignore
    jest.spyOn(globalThis, "fetch")
  })

  afterEach(() => {
    ;(globalThis.fetch as jest.Mock).mockRestore()
  })

  it("edits about-me section and displays saved changes in profile", async () => {
    const newActivityFieldValue = "Spider-man"
    ;(fetch as jest.Mock)
      .mockReturnValueOnce(createFetchSuccessfulResponse(aleksandrKiliushin))
      .mockReturnValueOnce(createFetchSuccessfulResponse())
      .mockReturnValueOnce(
        createFetchSuccessfulResponse({ ...aleksandrKiliushin, activity_field: newActivityFieldValue })
      )
    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <Routes>
          <Route element={<ProfileView />} path="/profile" />
          <Route element={<ProfileSettings />} path="/profile/settings" />
        </Routes>
      </MemoryRouter>
    )
    await waitFor(async () => {
      fireEvent.click(screen.getByRole("link", { name: "settings" }))
    })
    await act(async () => {
      fireEvent.change(screen.getByRole("textbox", { name: "Направление деятельности" }), {
        target: { value: newActivityFieldValue },
      })
    })
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Save" }))
    })
    expect(screen.getByText(newActivityFieldValue)).toBeInTheDocument()
  })
})
