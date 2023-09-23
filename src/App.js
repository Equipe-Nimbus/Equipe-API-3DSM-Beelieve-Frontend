import React from "react"
import NavBar from "./components/navBar"
import { Outlet } from "react-router-dom"
import Breadcrumbs from "./components/Breadcrumbs"

function App() {
  return (
    <div className="flex">
      <NavBar />
      <div className="w-full ml-64">
        <Breadcrumbs/>
        <Outlet />
      </div>
    </div>
  )
}

export default App
