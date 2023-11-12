import React from "react"
import NavBar from "./components/navBar"
import { Outlet } from "react-router-dom"
import Breadcrumbs from "./components/Breadcrumbs"

function App() {
  return (
    <div className="lg:flex">
      <NavBar />
      <div className="w-full">
        <Breadcrumbs/>
        <Outlet />
      </div>
    </div>
  )
}

export default App
