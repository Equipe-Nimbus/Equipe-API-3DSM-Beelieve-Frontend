import React from "react";
import * as XLSX from "xlsx";

function CriarExcel({projeto}){



  const excelData = projeto && projeto.sub_projetos ? 
  [
      {   
          "Ordem Projeto": projeto.ordem_projeto,
          "Projeto": projeto.nome_projeto, 
          "Progresso": projeto.progresso_projeto + "%"

      }
  ].concat(
      projeto.sub_projetos.map(sub_projeto => ({
          "Ordem Projeto": sub_projeto.ordem_sub_projeto,
          "Projeto": sub_projeto.nome_sub_projeto,
          "Progresso": sub_projeto.progresso_sub_projeto + "%"
      }))
  ).concat(
      projeto.sub_projetos.flatMap(sub_projeto => 
          sub_projeto.nivel_sub_projeto.map(nivel_sub_projeto => ({
              "Ordem Projeto": nivel_sub_projeto.ordem_nivel_sub_projeto,
              "Projeto": nivel_sub_projeto.nome_nivel_sub_projeto,
              "Progresso": nivel_sub_projeto.progresso_nivel_sub_projeto + "%"
          }))
      )
  ) : [];

  console.log(projeto)

  const compareOrdemProjeto = (a, b) => {
      const orderA = a["Ordem Projeto"].replace(/\.+$/, '');
      const orderB = b["Ordem Projeto"].replace(/\.+$/, '');
      return orderA.localeCompare(orderB, undefined, { numeric: true });
  };
  
excelData.sort(compareOrdemProjeto);
  
const tarefasData = [];

if (projeto && projeto.sub_projetos) {
  projeto.sub_projetos.forEach(sub_projeto => {
    if (sub_projeto.tarefas && sub_projeto.tarefas.length > 0) {
      tarefasData.push(...sub_projeto.tarefas.map(tarefa => ({
        "Ordem Projeto": sub_projeto.ordem_sub_projeto,
        "Tarefa": tarefa.descricao_atividade_tarefa,
        "Status Tarefa": tarefa.status_tarefa
      })));
    }
  });

  projeto.sub_projetos.forEach(sub_projeto => {
    if (sub_projeto.nivel_sub_projeto) {
      sub_projeto.nivel_sub_projeto.forEach(nivel_sub_projeto => {
        if (nivel_sub_projeto.tarefas && nivel_sub_projeto.tarefas.length > 0) {
          tarefasData.push(...nivel_sub_projeto.tarefas.map(tarefa => ({
            "Ordem Projeto": nivel_sub_projeto.ordem_nivel_sub_projeto,
            "Tarefa": tarefa.descricao_atividade_tarefa,
            "Status Tarefa": tarefa.status_tarefa
          })));
        }
      });
    }
  });
}

tarefasData.sort(compareOrdemProjeto)

const gerarExcel = (wbsData, tarefasData) => {
  const workbook = XLSX.utils.book_new();

  const worksheet1 = XLSX.utils.json_to_sheet(wbsData);
  XLSX.utils.book_append_sheet(workbook, worksheet1, "WBS");

  const worksheet2 = XLSX.utils.json_to_sheet(tarefasData);
  XLSX.utils.book_append_sheet(workbook, worksheet2, "Tarefas");

  XLSX.writeFile(workbook, "Projeto.xlsx");
}

return (
  <button onClick={() => gerarExcel(excelData, tarefasData)}
  className="mr-5 flex h-2/6 items-center gap-1 rounded-[10px] bg-primary50 p-2 text-lg font-semibold text-on-primary">
    Download Excel</button>
);
}

export default CriarExcel