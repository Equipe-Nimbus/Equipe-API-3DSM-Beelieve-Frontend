import React, { useState } from "react"

function CardProjeto({ titulo, descricao, estadoProjeto, onClick, liderProjeto }) {
  const [projetoIniciado] = useState(estadoProjeto)

  return (
    <>
      <div
        className="mt-5 w-64 cursor-pointer rounded-md border border-n90 px-5 pt-7 drop-shadow-md duration-100 hover:border-l-8 hover:border-complementary-20"
        onClick={onClick}
      >
        <h1 className="h-10 text-lg font-semibold text-complementary-20">
          {titulo}
        </h1>
        <p className="h-28 text-sm text-n40">{descricao}</p>
        <p className="h-8 text-sm font-semibold text-n40">{`Responsável: ${liderProjeto ? liderProjeto : ""}`}</p>
        <p className="h-8 text-on-light font-medium">{projetoIniciado ? "Iniciado" : "Não Iniciado"}</p>
      </div>
    </>
  )
}

export default CardProjeto
