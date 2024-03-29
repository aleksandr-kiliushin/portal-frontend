import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import { GlobalStateContextProvider } from "#machines/GlobalStateContext"
import "#styles/index"
import { Views } from "#views/index"

let container = document.querySelector("#root")
if (container === null) {
  container = document.createElement("div")
  container.setAttribute("id", "root")
  document.body.append(container)
}

const root = ReactDOM.createRoot(container)
root.render(
  <BrowserRouter>
    <GlobalStateContextProvider>
      <Views />
    </GlobalStateContextProvider>
  </BrowserRouter>
)
