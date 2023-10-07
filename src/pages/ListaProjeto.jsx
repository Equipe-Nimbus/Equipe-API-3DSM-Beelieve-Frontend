import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../services/axios"

import Button from "../components/Button.jsx"
import CardProjeto from "../components/CardProjeto.jsx"

import { BsPlusCircle } from "react-icons/bs"

function ListaProjeto() {
  const [projetos, setProjetos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getProjetos()
  }, []) //array vazio indica que este useEffect será executado uma vez quando o componente for montado

  async function getProjetos() {
    try {
      await axios.get("/projeto/listar").then((response) => {
        const data = response.data
        setProjetos(data)
      })
    } catch (erro) {}
  }

  return (
    <div>
      <div className="m-5 rounded-md bg-bg100 p-7 drop-shadow-md">
        <Button
          texto="Novo"
          tipo="button"
          iconeOpcional={BsPlusCircle}
          iconeTamanho="20px"
          className="mb-5 flex items-center  gap-0.5 rounded-[10px] bg-primary50 p-2 text-lg font-semibold text-on-primary"
          onClick={() => navigate("/projetos/novo-projeto")}
        />
        <hr className="border-n90"></hr>
        <div className="mx-10 flex flex-row flex-wrap gap-10">
          {projetos.map((projeto, index) => (
            <CardProjeto
              key={projeto.id_projeto}
              titulo={projeto.nome_projeto}
              descricao={projeto.descricao_projeto}
              estadoProjeto={projeto.data_inicio_projeto}
              liderProjeto={projeto.chefe_projeto}
              onClick={() => navigate(`/projetos/${projeto.id_projeto}`)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ListaProjeto
