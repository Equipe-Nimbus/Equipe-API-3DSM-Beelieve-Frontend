import React, { useState } from "react"

import Breadcrumbs from "../components/Breadcrumbs"
import VisaoGeral from "../components/VisaoGeral"
import MenuSelecao from "../components/MenuSelecao"
import VisualizarEditarWbs from "../components/VisualizarEditarWbs"

function DetalhesProjeto() {
  const [secaoAtual, setSecaoAtual] = useState("ESTRUTURA")
  const mudarSecao = (secao) => {
    setSecaoAtual(secao)
  }

  return (
    <>
      <Breadcrumbs />
      <VisaoGeral
        nomeProjeto="Título do projeto"
        descricaoProjeto="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin posuere arcu sit amet orci tempor pulvinar viverra fusce."
        liderProjeto="Ciclano da Silva"
      />
      <MenuSelecao
        opcoes={["ESTRUTURA", "PACOTES"]}
        secaoAtual={secaoAtual}
        mudarSecao={mudarSecao}
      />

      {secaoAtual === "ESTRUTURA" && <VisualizarEditarWbs/>}
    </>
  )
}

export default DetalhesProjeto
