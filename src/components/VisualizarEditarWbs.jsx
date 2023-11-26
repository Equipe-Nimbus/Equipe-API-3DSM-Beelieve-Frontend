import React, { useState } from "react"
import { useAuth } from "../contexts/authContext"
import Swal from 'sweetalert2'

import TabelaWbs from "./TabelaWbs"
import Button from "./Button"

import { PiLeaf, PiGridNineFill } from "react-icons/pi"
import { formatarEstrutura } from "../utils/formatarEstrutura"
import axios from "../services/axios"
import ArvoreProjeto from "./ArvoreProjeto"

function VisualizarEditarWbs({ projeto, tabela, nodes, edges, setTabela, setAtualizar }) {
  const [visualizacaoAtual, setVisualizacaoAtual] = useState("Tabela")

  const mudarVisualizacao = (valor) => {
    const view = valor
    setVisualizacaoAtual(view)
  }

  const { user } = useAuth()
  
  const atualizarEstruturaProjeto = async (e) => {
    e.preventDefault()
    projeto.nome_projeto = tabela[0].descricao

    const novaEstrutura = formatarEstrutura(projeto, tabela)
    

    //console.log('NOVO PROJETO EDITADO: ', novaEstrutura)

    try {
      await axios
        .put("/projeto/atualizar/estrutura", novaEstrutura)
        .then((response) => {
          if ((response.status = 200)) {
            //console.log("resposta: ", response)
            Swal.fire({
              title: 'Estrutura salva com sucesso!',
              icon: 'success',
              confirmButtonColor: "#132431"
            });
            setAtualizar(true)
          }
          else {
            Swal.fire('Ocorreu algum problema na atualização :(', '', 'error');
            // window.alert("Ocorreu algum problema na atualização :(")
          }
        })
    } catch (error) {
		if (error.response.status === 400) {
			Swal.fire({
			  title: error.response.data,
			  icon: "error",
		  	  confirmButtonColor: "#132431",
              allowOutsideClick: false,
              allowEscapeKey: false
			})
		} else {
			Swal.fire('Erro ao realizar o cadastro :(', '', 'error');
		}	
	}
  }
  
  const statusInicio = projeto.data_inicio_projeto

  return (
    <div className="m-5 rounded-md bg-bg100 p-4 drop-shadow-md">
      <div className="mx-5 mb-2 flex flex-col gap-2 items-center justify-between md:flex-row md:gap-0">
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
          <form
            className="flex flex-col"
            onSubmit={(e) => atualizarEstruturaProjeto(e)}
          >
            <TabelaWbs
              tabelaWBS={tabela}
              setTabelaWBS={setTabela}
              edicaoNivel1={true}
              projeto={projeto.data_inicio_projeto}
            />
            {(!statusInicio && user?.cargo !== 'Analista') && <Button
              texto="Salvar"
              tipo="submit"
              className="place-self-end rounded-[10px] bg-primary50 p-2 text-lg font-semibold text-on-primary hover:bg-bg24"
            />}
          </form>
        )}
        {visualizacaoAtual === "Árvore" && (
          <ArvoreProjeto
          	listaNodes={nodes}
          	listaEdges={edges}
          />
        )}
      </div>
    </div>
  )
}

export default VisualizarEditarWbs
