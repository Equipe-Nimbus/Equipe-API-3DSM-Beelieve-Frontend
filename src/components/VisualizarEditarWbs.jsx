import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import TabelaWbs from "./TabelaWbs"
import Button from "./Button"

import { PiLeaf, PiGridNineFill } from "react-icons/pi"
import { formatarEstrutura } from "../utils/formatarEstrutura"
import axios from '../services/axios'

function VisualizarEditarWbs({ projeto, setProjeto, tabela, atualizar, setAtualizar}) {
  const navigate = useNavigate()
  const [visualizacaoAtual, setVisualizacaoAtual] = useState("Árvore")

  const mudarVisualizacao = (valor) => {
    const view = valor
    setVisualizacaoAtual(view)
  }
  
  const [render, setRender] = useState(0)

  const [tabelaWBS, setTabelaWBS] = useState(tabela)
  useEffect(() => {
    setTabelaWBS(tabela)
    console.log(projeto)

  }, [tabela, render])

  const atualizarEstruturaProjeto = async (e) => {
   	setRender(render + 1)
    e.preventDefault()
    const novaEstrutura = formatarEstrutura(tabelaWBS)
    projeto.sub_projetos = novaEstrutura
    projeto.nome_projeto = tabelaWBS[0].descricao

    //console.log('nova estrutura: ', projeto)

    try {
      await axios.put("/projeto/atualizar/estrutura", projeto).then((response) => {
        console.log('resposta: ', response)
        setAtualizar(true)
        })
    } catch (error) {
      
    }
  }

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
                ? "flex items-center gap-1 rounded-l-lg border-2 border-n90 bg-primary91 p-2 font-semibold text-primary20"
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
                ? "flex items-center gap-1 rounded-r-lg border-2 border-n90 bg-primary91 p-2 font-semibold text-primary20"
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
          <form className="flex flex-col" onSubmit={(e) => atualizarEstruturaProjeto(e)}>
            <TabelaWbs tabelaWBS={tabelaWBS} setTabelaWBS={setTabelaWBS}  edicaoNivel1={true}/>
            <Button texto="Salvar" tipo="submit" className="rounded-[10px] bg-primary50 p-2 text-lg font-semibold text-on-primary place-self-end"/>
          </form>
        )}
        {visualizacaoAtual === "Árvore" && (
          <div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VisualizarEditarWbs
