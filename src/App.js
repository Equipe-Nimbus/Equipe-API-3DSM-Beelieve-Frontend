import React from "react"
import NavBar from "./components/navBar"
import { Outlet } from "react-router-dom"

function App() {
  return (
    <div className="flex">
      <NavBar />
      <div className="w-full ml-64">
        <Outlet />
      </div>
    </div>
  )
}

export default App
