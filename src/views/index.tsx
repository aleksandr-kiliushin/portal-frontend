import React from "react"
import { Route, Routes } from "react-router-dom"

import Benefits from "./benefits"
import Login from "./login"
import Profile from "./profile"

const Views: React.FC = () => {
  return (
    <Routes>
      <Route element={<Login />} path="/login" />
      <Route element={<Benefits />} path="/benefits" />
      <Route element={<Profile />} path="/profile" />
    </Routes>
  )
}

export default Views
