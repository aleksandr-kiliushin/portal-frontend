import { useInterpret } from "@xstate/react"
import React from "react"
import { InterpreterFrom } from "xstate"

import { currentUserMachine } from "./currentUser"

export const GlobalStateContext = React.createContext({
  currentUserService: {} as InterpreterFrom<typeof currentUserMachine>,
})

export const GlobalStateContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const currentUserService = useInterpret(currentUserMachine)

  return <GlobalStateContext.Provider value={{ currentUserService }}>{children}</GlobalStateContext.Provider>
}
