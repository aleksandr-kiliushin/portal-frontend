import "@testing-library/jest-dom"
import { RenderOptions, RenderResult, render as rtlRender } from "@testing-library/react"
import React from "react"
import { MemoryRouter } from "react-router-dom"

import { GlobalStateContextProvider } from "#machines/GlobalStateContext"

const AllTheProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <MemoryRouter>
      <GlobalStateContextProvider>{children}</GlobalStateContextProvider>
    </MemoryRouter>
  )
}

const render = (ui: React.ReactElement, options?: Omit<RenderOptions, "wrapper">): RenderResult => {
  return rtlRender(ui, { wrapper: AllTheProviders, ...options })
}

export default render