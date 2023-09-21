import React, { useState } from "react"
import TabelaWbs from "./TabelaWbs"

import { PiLeaf, PiGridNineFill } from "react-icons/pi"

function VisualizarEditarWbs() {
  const [visualizacaoAtual, setVisualizacaoAtual] = useState("Árvore")

  const mudarVisualizacao = (valor) => {
    const view = valor
    setVisualizacaoAtual(view)
  }

  const [tabelaWBS, setTabelaWBS] = useState([
    {
      id: 1,
      nivel: "1",
      descricao: "Objetivo Final",
    },
  ])

  return (
    <div className="m-5 rounded-md bg-bg100 p-4 drop-shadow-md">
      <div className="mx-5 mb-2 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-on-light">
          Visualizar/Editar
        </h3>
        <div className="flex cursor-pointer">
          <div
            className={
              visualizacaoAtual === "Árvore"
                ? "text-primary20 bg-primary91 flex items-center gap-1 rounded-l-lg border-2 border-n90 p-2 font-semibold"
                : "flex items-center gap-1 rounded-l-lg border-2 border-n90 p-2 text-n40"
            }
            onClick={(e) => mudarVisualizacao("Árvore")}
          >
            {" "}
            {visualizacaoAtual === "Árvore" ? (
              <PiLeaf size={20} color="#675600" />
            ) : (
              <PiLeaf size={20} color="#666666" />
            )}
            <span>Árvore</span>
          </div>
          <div
            className={
              visualizacaoAtual === "Tabela"
                ? "text-primary20 bg-primary91 flex items-center gap-1 rounded-r-lg border-2 border-n90 p-2 font-semibold"
                : "flex items-center gap-1 rounded-r-lg border-2 border-n90 p-2 text-n40"
            }
            onClick={(e) => mudarVisualizacao("Tabela")}
          >
            {visualizacaoAtual === "Tabela" ? (
              <PiGridNineFill size={20} color="#675600" />
            ) : (
              <PiGridNineFill size={20} color="#666666" />
            )}
            <span>Tabela</span>
          </div>
        </div>
      </div>
      <hr className="border-n90" />
      <div className="mx-5">
        {visualizacaoAtual === "Tabela" && (
          <TabelaWbs tabelaWBS={tabelaWBS} setTabelaWBS={setTabelaWBS} />
        )}
      </div>
    </div>
  )
}

export default VisualizarEditarWbs
