import React, { useState } from "react"

function CardProjeto({ titulo, descricao, estadoProjeto, onClick, liderProjeto }) {
  const [projetoIniciado] = useState(estadoProjeto)

  return (
    <>
      <div className="mt-5 flex w-64 cursor-pointer flex-col rounded-md border border-n90 px-5 pt-7 drop-shadow-md duration-100 hover:border-l-8 hover:border-complementary-20" onClick={onClick}>
        <h1 className="text-lg font-semibold text-complementary-20">
          {titulo}
        </h1>
        <p className="mt-2 text-sm text-n40">{descricao}</p>
        {projetoIniciado ? (
          <p>Iniciado</p>
        ) : (
          <p className="my-6 text-on-light">Não Iniciado</p>
        )}
        <p className="text-sm text-n40">{`Responsável: ${liderProjeto}`}</p>
      </div>
    </>
  )
}

export default CardProjeto
