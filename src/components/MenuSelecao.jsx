import React from "react"

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
    <div className="m-5 rounded-md bg-bg100 p-4 drop-shadow-md overflow-x-scroll">
      <ul className="flex gap-10 text-lg text-on-light md:justify-center md:gap-5  lg:gap-32 lg:mx-10">
        {gerarOpcoes(opcoes)}
      </ul>
    </div>
  )
}

export default MenuSelecao
