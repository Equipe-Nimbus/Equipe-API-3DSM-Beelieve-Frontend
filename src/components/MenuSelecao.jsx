import React, { useState } from "react"

function MenuSelecao({ opcoes, secaoAtual, mudarSecao }) {


  const gerarOpcoes = (opcoes) => {
    if (opcoes.length < 1) {
      return <></>
    } else {
      return opcoes.map((opcao) => {
        return (
          <li
            key={opcao}
            className={`cursor-pointer hover:font-medium duration-100 ${secaoAtual === opcao ? "border-b-2 border-primary50": ""}`}
            onClick={(e) => mudarSecao(opcao)}
          >
            {opcao}
          </li>
        )
      })
    }
  }

  return (
    <div className="m-5 rounded-md bg-bg100 p-4 drop-shadow-md">
      <ul className="mx-36 flex gap-20 text-lg text-on-light ">
        {gerarOpcoes(opcoes)}
      </ul>
    </div>
  )
}

export default MenuSelecao
