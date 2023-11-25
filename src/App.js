import React from "react"
import { AuthProvider } from "./contexts/authContext"

import NavBar from "./components/navBar"
import Breadcrumbs from "./components/Breadcrumbs"

import { Outlet, useLocation } from "react-router-dom"



function App() {
  const location = useLocation()
  const paginaLogin = location.pathname === '/'
  const renderNavBar = !paginaLogin && <NavBar/>
  const renderBreadcrumbs = !paginaLogin && <Breadcrumbs/>

  return (
    <AuthProvider>
      <div className="lg:flex md:overflow-y-auto">
        {renderNavBar}
        <div className="w-full">
          {renderBreadcrumbs}
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  )
}

export default App
