import React, { useState } from "react"

function CardProjeto({ titulo, descricao, estadoProjeto, onClick, liderProjeto, progressoProjeto }) {
  const [projetoIniciado] = useState(estadoProjeto)

  return (
    <>
      <div
        className="w-64 cursor-pointer rounded-md border border-n90 px-5 pt-7 drop-shadow-md duration-100 hover:border-l-8 hover:border-complementary-20"
        onClick={onClick}
      >
        <h1 className="h-10 text-lg font-semibold text-complementary-20 truncate">
          {titulo}
        </h1>
        <p className="h-28 text-sm text-n40">{descricao}</p>
        <div className="truncate">
            <span className="h-8 text-sm font-semibold text-n40">Responsável: </span><span className="text-sm" >{liderProjeto ? liderProjeto : "Não atribuído"}</span>
        </div>
        {projetoIniciado ?
        <div className="flex items-center gap-1">
          <progress
            value={progressoProjeto}
            max={100}
            className="h-2 rounded bg-complementary-20"
          ></progress>
          <span className=" text-complementary-20">{`${progressoProjeto}%`}</span>
        </div>
        :
          <p className="h-8 text-on-light font-medium">Não iniciado</p>
        }
        {
          projetoIniciado && (
            <div className="flex items-center gap-1">
              <progress
                value={80}
                max={100}
                className="h-2 rounded tendencia"
              ></progress>
              <span className=" text-n40">{`80%`}</span>
            </div>
          )
        }
        
      </div>
    </>
  )
}

export default CardProjeto
