import "portal-frontend-sdk/dist/styles"
import React from "react"
import * as ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import { GlobalStateContextProvider } from "#machines/GlobalStateContext"
import App from "#views/index"

let container = document.querySelector("#root")
if (container === null) {
  container = document.createElement("div")
  container.setAttribute("id", "root")
}

const root = ReactDOM.createRoot(container)
root.render(
  <BrowserRouter>
    <GlobalStateContextProvider>
      <App />
    </GlobalStateContextProvider>
  </BrowserRouter>
)