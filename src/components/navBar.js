import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/authContext"

import Beelieve from "../assets/images/Beelieve-yellow.png"
import { PiProjectorScreenChart } from "react-icons/pi"
import { FiUser } from "react-icons/fi"
import { LiaUserTieSolid } from "react-icons/lia"
import { BiLogOut } from "react-icons/bi"
import { IoMdMenu } from "react-icons/io" 

function NavBar() {
  const { user, loggout } = useAuth()
  //console.log(user)

  const [ opcoesMobile, setOpcoesMobile ] = useState(false)
  const toggleOpcoesMobile = () => {
    setOpcoesMobile(!opcoesMobile)
  }

  return (
    <>
      <aside className={`bg-bg22 p-2 ${opcoesMobile ? "h-screen block top-0 duration-300 z-50 w-full" : "h-16 duration-300 w-full"}
                        lg:sticky lg:top-0 lg:flex lg:h-screen lg:min-w-max lg:flex-col lg:gap-3 lg:bg-bg15 lg:w-min`}>
        <div className="flex gap-3 items-center lg:rounded lg:bg-bg22 lg:p-8">
          <div className="cursor-pointer" onClick={() => toggleOpcoesMobile()}>
            <IoMdMenu color="#EDBF00" size={48} className="lg:hidden"/>
          </div>
          <div className="rounded bg-bg22">
            <Link to="/projetos"> 
              {<img
                alt="Logo da Beelieve"
                src={Beelieve}
                className="cursor-pointer"
                width="180px"
              />}
            </Link>
          </div>
        </div>
        <div className={`${opcoesMobile ? "flex flex-col justify-between px-2 h-5/6" : "hidden"}
                        lg:flex lg:h-full lg:flex-col lg:rounded lg:bg-bg22 lg:px-5`}>
          <div className="lg:h-full">
            <ul className="my-10 flex flex-col gap-5">
              <li className="flex cursor-pointer flex-row items-center gap-1 p-1.5 text-2xl font-medium text-on-bg22 duration-200 hover:rounded hover:bg-hover-bg22 lg:text-xl">
                <PiProjectorScreenChart
                  color="#DADDE6"
                  className="hover:fill-primary50 w-10 h-10 lg:w-6 lg:h-6"
                />
                <Link to="/projetos">Projetos</Link>
              </li>
              { (user?.cargo === 'Gerente' || user?.cargo === 'Engenheiro Chefe') &&
                  <li className="flex cursor-pointer flex-row items-center gap-1 p-1.5 text-xl font-medium text-on-bg22 duration-200 hover:rounded hover:bg-hover-bg22">
                    <FiUser
                      color="#DADDE6"
                      size={24}
                      className="hover:fill-primary50"
                    />
                    <Link to="/usuarios">Usuários</Link>
                  </li> 
              }
            </ul>
          </div>
          <div className="flex gap-2 lg:mb-5">
            <div className="flex content-center justify-center rounded-md border-2 border-on-bg22">
              <LiaUserTieSolid color="#DADDE6" className="w-12 h-12" />
            </div>
            <div className="flex flex-col">
              <p className="text-base font-semibold text-on-bg22">{user ? user.nome : "Nome"}</p>
              <p className="font-regular text-sm text-on-bg22">{user ? user.cargo : "Cargo"}</p>
            </div>
          </div>
        </div>
        <div className={`${opcoesMobile ? "flex" : "hidden"} items-center gap-2 cursor-pointer rounded bg-bg22 p-3 text-xl font-semibold text-on-bg22 duration-200 hover:rounded hover:bg-hover-bg22 my-6
                        lg:flex lg:m-0 lg:text-lg`}
              onClick={() => loggout()}>
          <BiLogOut color="#DADDE6" className="w-8 h-8 lg:w-6 lg:h-6"/>
          <p>Sair</p>
        </div>
      </aside>
    </>
  )
}

export default NavBar
