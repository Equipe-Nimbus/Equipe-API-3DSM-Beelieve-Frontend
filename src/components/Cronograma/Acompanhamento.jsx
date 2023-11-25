import React, { useState, useEffect } from "react";

import TabelaProgresso from "../TabelaProgresso.jsx";
import SCurveChart from "../SCurveChart.jsx";

import axios from "../../services/axios";

import { PiGridNineFill } from 'react-icons/pi'
import { GoGraph } from 'react-icons/go'


function Acompanhamento({ idProjeto }) {
  const [cronograma, setCronograma] = useState({})
  const [visualizacaoAtual, setVisualizacaoAtual] = useState("Tabela")
  const mudarVisualizacao = (valor) => {
    const view = valor
    setVisualizacaoAtual(view)
  }

  const getCronograma = async () => {
    try {
      await axios.get(`/cronograma/${idProjeto}`).then(async (response) => {
        let cronogramaResgatado = response.data;
		
        let anoCronograma = Number(cronogramaResgatado.inicio_projeto.slice(0, 4));
        const mesesDoAno = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
        let dataAtual
        await axios.get("data/pega").then((response) => {
			dataAtual = response.data
		})
		let anoDataAtual = Number (dataAtual.slice(0, 4))
		let mesDataAtual = (Number (dataAtual.slice(5,7)) - 1)
		dataAtual = new Date(anoDataAtual, mesDataAtual)
		
        cronogramaResgatado.lista_cronograma.forEach((mes) => { 
            const nomeDoMes = mes.mes_cronograma.split(" ")[0]
            const indiceMes = mesesDoAno.indexOf(nomeDoMes)
            const data = new Date(anoCronograma, indiceMes)
            
            if(mes.mes_cronograma.split(" ").length < 2 ) {
              mes.mes_cronograma = `${mes.mes_cronograma} ${anoCronograma}`
            }

            if(mes.mes_cronograma === `Dezembro ${anoCronograma}`){
              anoCronograma++
            }

            if (data > dataAtual) {
              mes.niveis.forEach((nivel) => {
                nivel.progresso_planejado = String(nivel.progresso_planejado) + "%"
                nivel.progresso_real = '-'
              })
            } else {
              mes.niveis.forEach((nivel) => {
                nivel.progresso_planejado = String(nivel.progresso_planejado) + "%"
                nivel.progresso_real = String(nivel.progresso_real) + "%"
              })
            }
        
        })


        setCronograma(cronogramaResgatado);
      });
    } catch (error) {
      console.error("Erro ao obter cronograma:", error);
    }
  }

  useEffect(() => {
    getCronograma();
  }, [idProjeto])

  
  return (
    <div>
      <div className="mx-5 mb-2 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-on-light">
          Visualizar/Editar
        </h3>
        <div className="flex cursor-pointer">
          <div
            className={
              visualizacaoAtual === "Tabela"
                ? "flex items-center gap-1 rounded-l-lg border-2 border-n90 bg-primary91 p-2 font-semibold text-primary20"
                : "flex items-center gap-1 rounded-l-lg border-2 border-n90 p-2 text-n40"
            }
            onClick={(e) => mudarVisualizacao("Tabela")}
          >
            {" "}
            {visualizacaoAtual === "Tabela" ? (
              <PiGridNineFill size={20} color="#675600" />
            ) : (
              <PiGridNineFill size={20} color="#666666" />
            )}
            <span>Tabela</span>
          </div>
          <div
            className={
              visualizacaoAtual === "Gráfico"
                ? "flex items-center gap-1 rounded-r-lg border-2 border-n90 bg-primary91 p-2 font-semibold text-primary20"
                : "flex items-center gap-1 rounded-r-lg border-2 border-n90 p-2 text-n40"
            }
            onClick={(e) => mudarVisualizacao("Gráfico")}
          >
            {visualizacaoAtual === "Gráfico" ? (
              <GoGraph size={20} color="#675600" />
            ) : (
              <GoGraph size={20} color="#666666" />
            )}
            <span>Curva S</span>
          </div>
        </div>
      </div>
      
      <hr className="border-n90"></hr>
      
      {visualizacaoAtual === 'Tabela' && (
        <TabelaProgresso cronograma={cronograma}/>
      )}

      {visualizacaoAtual === 'Gráfico' && (
        <SCurveChart cronograma={cronograma}/>
      )}
    </div>
  )
};
export default Acompanhamento;
