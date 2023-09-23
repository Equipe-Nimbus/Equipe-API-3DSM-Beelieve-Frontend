import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "../services/axios"

import VisaoGeral from "../components/VisaoGeral"
import MenuSelecao from "../components/MenuSelecao"
import VisualizarEditarWbs from "../components/VisualizarEditarWbs"

function DetalhesProjeto() {
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
        setProjeto(dados)
      })
    } catch (error) {}
  }

  const gerarTabela = () => {
    const tabela = []
    tabela.push({
      id: 0,
      nivel: "1",
      descricao: projeto.nome_projeto,
    })

    projeto.sub_projetos?.forEach((subprojeto) => {
      tabela.push({
        id: subprojeto.id_sub_projeto,
        nivel: subprojeto.ordem_sub_projeto,
        descricao: subprojeto.nome_sub_projeto,
      })

      subprojeto.nivel_sub_projeto?.forEach((nivel) => {
        tabela.push({
          id: nivel.id_nivel_sub_projeto,
          nivel: nivel.ordem_nivel_sub_projeto,
          descricao: nivel.nome_nivel_sub_projeto,
        })
      })
    })
    return tabela
  }

  useEffect(() => {
    getProjeto()
  }, [])

  useEffect(() => {
    if (Object.keys(projeto).length > 0) {
      const novaTabela = gerarTabela()
      setTabela(novaTabela)
    }
  }, [projeto])

  return (
    <>
      <VisaoGeral
        nomeProjeto={projeto.nome_projeto}
        descricaoProjeto={projeto.descricao_projeto}
        liderProjeto={projeto.chefe_projeto}
      />
      <MenuSelecao
        opcoes={["ESTRUTURA", "PACOTES"]}
        secaoAtual={secaoAtual}
        mudarSecao={mudarSecao}
      />

      {secaoAtual === "ESTRUTURA" && <VisualizarEditarWbs projeto={projeto} stProjeto={setProjeto} tabela={tabela}/>}
    </>
  )
}

export default DetalhesProjeto
