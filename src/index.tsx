import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import "portal-frontend-sdk/dist/styles"

import { GlobalStateContextProvider } from "#machines/GlobalStateContext"
import Views from "#views/index"

let container = document.querySelector("#root")
if (container === null) {
  container = document.createElement("div")
  container.setAttribute("id", "root")
}

const root = ReactDOM.createRoot(container)
root.render(
  <BrowserRouter>
    <GlobalStateContextProvider>
      <Views />
    </GlobalStateContextProvider>
  </BrowserRouter>
)
