import React, {useState, useEffect} from "react";
import { useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as XLSX from "xlsx";
import axios from "../services/axios"
import schemaCronograma from "./Cronograma/validation"


function CriarExcel({projeto, idProjeto}){
  const [cronograma, setCronograma] = useState({})
  const [subProjetosEditaveis, setSubProjetosEditaveis] = useState([])

  const { register, handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: {
      cronograma: cronograma.lista_cronograma,
    },
    resolver: yupResolver(schemaCronograma),
  })

  const { fields } = useFieldArray({
    control,
    name: "cronograma",
  })

  const getCronograma = async () => {
    try {
      await axios.get(`/cronograma/${idProjeto}`).then((response) => {
        let cronogramaResgatado = response.data
        if (cronogramaResgatado.inicio_projeto) {
          let anoCronograma = Number(
            cronogramaResgatado.inicio_projeto.slice(0, 4),
          )
          cronogramaResgatado.lista_cronograma.forEach((mes) => {
            mes.mes_cronograma = `${mes.mes_cronograma} ${anoCronograma}`

            if (mes.mes_cronograma === `Dezembro ${anoCronograma}`) {
              anoCronograma++
            }

            mes.niveis.forEach((nivel) => {
              nivel.progresso_planejado =
                String(nivel.progresso_planejado) + "%"
            })
          })
        } else {
          cronogramaResgatado.lista_cronograma.forEach((mes) => {
            mes.niveis.forEach((nivel) => {
              nivel.progresso_planejado =
                String(nivel.progresso_planejado) + "%"
            })
          })
        }

        setCronograma(cronogramaResgatado)
        setValue("cronograma", cronogramaResgatado.lista_cronograma)
        setSubProjetosEditaveis(checarNivelSubProjeto(cronogramaResgatado.lista_cronograma[0].niveis))
      })
    } catch (error) {}
  }

  const checarNivelSubProjeto = (subprojetos) => {
    const subProjetosFiltrados = []

    subprojetos.forEach((subprojeto) => {
      if (subprojeto.tipo === 'nivelsubprojeto') {
        subProjetosFiltrados.push(subprojeto.ordem_nivel)
      } 
      else if(subprojeto.tipo === 'subprojeto'){

        const nivelSubProjeto = subprojeto.ordem_nivel
        if(!subprojetos.some((subProjetoAnalisado) => subProjetoAnalisado !== subprojeto && subProjetoAnalisado.ordem_nivel.startsWith(nivelSubProjeto))){
          subProjetosFiltrados.push(nivelSubProjeto)
        }
      }
    })

    //console.log("subprojetos alteraveis: ", subProjetosFiltrados)
    return subProjetosFiltrados
  }

  useEffect(() => {
    getCronograma()
  }, [])


  const planejadoData = [];
  if (cronograma && cronograma.lista_cronograma) {
    cronograma.lista_cronograma.forEach(mes => {
      if (mes && mes.niveis) {
        mes.niveis.forEach(nivel => {
          if (nivel && nivel.progresso_planejado !== undefined) {
            const nomeMes = mes.mes_cronograma

            if (!planejadoData[nivel.ordem_nivel]) {
              planejadoData[nivel.ordem_nivel] = {
                "Ordem Nível": nivel.ordem_nivel,
                "Nome Nível": nivel.nome_nivel
              };
            }

            planejadoData[nivel.ordem_nivel][nomeMes] = nivel.progresso_planejado;
          }
        });
      }
    });}

const planejadoDataArray = Object.values(planejadoData);

//console.log(planejadoDataArray)


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

const gerarExcel = (wbsData, tarefasData, planejadoDataArray) => {
  const workbook = XLSX.utils.book_new();

  const worksheet1 = XLSX.utils.json_to_sheet(wbsData);
  XLSX.utils.book_append_sheet(workbook, worksheet1, "Progresso Realizado");

  const worksheet2 = XLSX.utils.json_to_sheet(tarefasData);
  XLSX.utils.book_append_sheet(workbook, worksheet2, "Tarefas");

  const worksheet3 = XLSX.utils.json_to_sheet(planejadoDataArray);
  XLSX.utils.book_append_sheet(workbook, worksheet3, "Progesso Planejado");

  XLSX.writeFile(workbook, "Projeto.xlsx");
}

return (
  <button onClick={() => gerarExcel(excelData, tarefasData, planejadoDataArray)}
  className="flex h-2/6 items-center gap-1 rounded-[10px] bg-primary50 py-1 px-2 text-lg font-semibold text-on-primary hover:bg-bg24">
    Gerar planilha</button>
);
}

export default CriarExcel