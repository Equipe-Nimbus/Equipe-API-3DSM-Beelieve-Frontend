import React from "react"
import { Link } from "react-router-dom"

import Beelieve from "../assets/images/Beelieve.png"
import { PiProjectorScreenChart } from "react-icons/pi"
import { LiaUserTieSolid } from "react-icons/lia"
import { BiLogOut } from "react-icons/bi"

function NavBar() {
  return (
    <>
      <aside className="fixed m-0 flex h-screen w-64 flex-col gap-3 bg-bg15 p-2">
        <div className="rounded bg-bg22 p-8">
          <img
            alt="Logo da Beelieve"
            src={Beelieve}
            className="cursor-pointer"
          />
        </div>
        <div className="flex h-full flex-col rounded bg-bg22 px-5">
          <div className="h-full">
            <ul className="my-10 flex flex-col gap-3">
              <li className="hover:bg-hover-bg22 flex cursor-pointer flex-row items-center gap-1 p-1.5 text-xl font-medium text-on-bg22 duration-200 hover:rounded">
                <PiProjectorScreenChart
                  color="#DADDE6"
                  size={24}
                  className="hover:fill-primary50"
                />
                <Link to="/projetos">Projetos</Link>
              </li>
            </ul>
          </div>
          <div className="mb-5 flex gap-2">
            <div className="flex h-[45px] w-[45px] content-center justify-center rounded-md border-2 border-on-bg22">
              <LiaUserTieSolid color="#DADDE6" size={45} />
            </div>
            <div className="flex h-[50px] flex-col">
              <p className="text-base font-semibold text-on-bg22">
                Nome do usuário
              </p>
              <p className="font-regular text-sm text-on-bg22">Cargo</p>
            </div>
          </div>
        </div>
        <div className="hover:bg-hover-bg22 flex cursor-pointer items-center gap-2 rounded bg-bg22 p-3 text-lg font-semibold text-on-bg22 duration-200 hover:rounded">
          <BiLogOut color="#DADDE6" size={24} />
          <p>Sair</p>
        </div>
      </aside>
    </>
  )
}

export default NavBar
