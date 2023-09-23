import React from "react"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

function Breadcrumbs() {
  let location = useLocation()
  console.log(location)

  let linkAtual = ""
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      linkAtual += `/${crumb}`
      const crumbCapitalizado = crumb[0].toUpperCase() + crumb.slice(1)
      let crumbFormatado = crumbCapitalizado.split('-')
      crumbFormatado = crumbFormatado[0] + ' ' + crumbFormatado.slice(1)

      return(
        <li className="after:content-['-'] last:after:content-[''] text-lg font-semibold text-n20 hover:text-on-light">
          <Link to={linkAtual} className="inline-block px-2">{crumbFormatado}</Link>
        </li>
      )
    })

  return (
    <>
      <div className="m-5 rounded-md bg-bg100 p-4 drop-shadow-md">
        <ol className="flex flex-row gap-1 ">{crumbs}</ol>
      </div>
    </>
  )
}

export default Breadcrumbs
