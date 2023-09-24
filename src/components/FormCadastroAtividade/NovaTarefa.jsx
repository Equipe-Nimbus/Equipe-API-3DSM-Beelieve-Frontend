import React from "react";
import { useLocation, useParams } from "react-router";

import TabFormTarefas from "./TabFormTarefas";

function NovaTarefa() {
  const {idTarefa} = useParams()
  //console.log(idTarefa)


  const location = useLocation()
  const {tipo_pai, tarefas} = location.state
  console.log(tarefas)


  return (
    <>
      <div className="bg-bg100 m-5 rounded-md p-7 drop-shadow-md">
        <div>
          <TabFormTarefas tarefas={tarefas} tipo_pai={tipo_pai} id={idTarefa}/>
        </div>
      </div>
    </>
  );
}

export default NovaTarefa;
