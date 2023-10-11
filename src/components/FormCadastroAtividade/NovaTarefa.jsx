import React from "react";
import { useLocation, useParams } from "react-router";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import TabFormTarefas from "./TabFormTarefas";

function NovaTarefa() {
  const {idTarefa} = useParams()

  const location = useLocation()
  const {tipo_pai, subprojeto, nomeProjeto} = location.state
  const statusInicio = new URLSearchParams(location.search).get("Iniciado");

  let ordemSubProjeto = ""
  let nomeSubProjeto = ""

  if(tipo_pai === 'subprojeto'){
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
        className="flex items-center ml-10 text-gray-50 underline font-semibold"
    >
        <AiOutlineArrowLeft className="mr-2" />
        Voltar
    </button>
      <div className="bg-bg100 m-5 rounded-md p-7 drop-shadow-md">
        <div>
          <TabFormTarefas iniciado={statusInicio} tarefas={subprojeto.tarefas} tipo_pai={tipo_pai} id={idTarefa} ordem={ordemSubProjeto} nomePacote={nomeSubProjeto} nomeProjeto={nomeProjeto}/>
        </div>
      </div>
      
    </>
  );
}

export default NovaTarefa;
