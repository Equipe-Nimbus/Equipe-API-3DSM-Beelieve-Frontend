import React from "react"
import { useLocation, useParams } from "react-router"
import { AiOutlineArrowLeft } from "react-icons/ai"
import TabFormTarefas from "./TabFormTarefas"

function NovaTarefa() {
  const { idTarefa } = useParams()

  const location = useLocation()
  const { tipo_pai, subprojeto, nomeProjeto, dataInicioProjeto } = location.state

  let ordemSubProjeto = ""
  let nomeSubProjeto = ""

  if (tipo_pai === "subprojeto") {
    ordemSubProjeto = subprojeto.ordem_sub_projeto
    nomeSubProjeto = subprojeto.nome_sub_projeto
  } else {
    ordemSubProjeto = subprojeto.ordem_nivel_sub_projeto
    nomeSubProjeto = subprojeto.nome_nivel_sub_projeto
  }

  return (
    <>
      <button
        onClick={() => window.history.back()}
        className="text-gray-50 ml-10 flex items-center font-semibold underline"
      >
        <AiOutlineArrowLeft className="mr-2" />
        Voltar
      </button>
      <div className="m-5 rounded-md bg-bg100 p-7 drop-shadow-md">
        <div>
          <TabFormTarefas
            listaTarefas={subprojeto.tarefas}
            tipoPai={tipo_pai}
            idPai={idTarefa}
            ordem={ordemSubProjeto}
            nomePacote={nomeSubProjeto}
            nomeProjeto={nomeProjeto}
            dataInicioProjeto={dataInicioProjeto}
          />
        </div>
      </div>
    </>
  )
}

export default NovaTarefa
