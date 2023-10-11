/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "../services/axios"

import VisaoGeral from "../components/VisaoGeral"
import MenuSelecao from "../components/MenuSelecao"
import VisualizarEditarWbs from "../components/VisualizarEditarWbs"
import FormValorHora from "../components/FormValorHora/FormValorHora"
import Cronograma from "../components/Cronograma/Cronograma"

function DetalhesProjeto() {
  const [atualizar, setAtualizar] = useState(false)
  const [projeto, setProjeto] = useState({})
  const [tabela, setTabela] = useState([])
  const [secaoAtual, setSecaoAtual] = useState("ESTRUTURA")
  const mudarSecao = (secao) => {
    setSecaoAtual(secao)
  }

  const { id } = useParams()
  const getProjeto = async () => {
    try {
      await axios.get(`/projeto/listar/${id}`).then((response) => {
        const dados = response.data
        // console.log("projeto resgatado: ", dados)
        setProjeto(dados)
      })
    } catch (error) {}
  }

  const gerarTabela = () => {
    const tabela = []
    tabela.push({
      id: projeto.id_projeto,
      nivel: "1",
      descricao: projeto.nome_projeto,
      orcamento: projeto.orcamento_projeto,
      hora_homem: projeto.hora_humano_total,
      materiais: projeto.materiais_projeto,
    })

    projeto.sub_projetos?.forEach((subprojeto) => {
      tabela.push({
        id: subprojeto.id_sub_projeto,
        nivel: subprojeto.ordem_sub_projeto,
        descricao: subprojeto.nome_sub_projeto,
        orcamento: subprojeto.orcamento_sub_projeto,
        materiais: subprojeto.materiais_sub_projeto,
        hora_homem: subprojeto.hora_humano_sub_projeto,
      })

      subprojeto.nivel_sub_projeto?.forEach((nivel) => {
        tabela.push({
          id: nivel.id_nivel_sub_projeto,
          nivel: nivel.ordem_nivel_sub_projeto,
          descricao: nivel.nome_nivel_sub_projeto,
          orcamento: nivel.orcamento_nivel_sub_projeto,
          hora_homem: nivel.hora_humano_nivel_sub_projeto,
          materiais: nivel.materiais_nivel_sub_projeto,
        })
      })
    })
    return tabela
  }

  useEffect(() => {
    getProjeto()

    if (atualizar) {
      getProjeto()
      setAtualizar(false)
    }
  }, [atualizar])

  useEffect(() => {
    if (Object.keys(projeto).length > 0) {
      const novaTabela = gerarTabela()
      setTabela(novaTabela)
    }
  }, [projeto, atualizar])

  return (
    <>
      <VisaoGeral
        nomeProjeto={projeto.nome_projeto}
        descricaoProjeto={projeto.descricao_projeto}
        liderProjeto={projeto.chefe_projeto}
        DataProjetoIniciado={projeto.data_inicio_projeto}
      />
      <MenuSelecao
        opcoes={["ESTRUTURA", "PACOTES", "PLANEJAMENTO"]}
        secaoAtual={secaoAtual}
        mudarSecao={mudarSecao}
      />

      {secaoAtual === "ESTRUTURA" && (
        <VisualizarEditarWbs
          projeto={projeto}
          tabela={tabela}
          setTabela={setTabela}
          setAtualizar={setAtualizar}
        />
      )}

      {secaoAtual === "PACOTES" && (
        <div className="m-5 rounded-md bg-bg100 p-7 drop-shadow-md">
          <FormValorHora
            tabela={tabela}
            projeto={projeto}
            setAtualizar={setAtualizar}
          />
        </div>
      )}

      {secaoAtual === "PLANEJAMENTO" && (
        <div className="m-5 rounded-md bg-bg100 p-7 drop-shadow-md">
          <Cronograma idProjeto={id} />
        </div>
      )}
    </>
  )
}

export default DetalhesProjeto