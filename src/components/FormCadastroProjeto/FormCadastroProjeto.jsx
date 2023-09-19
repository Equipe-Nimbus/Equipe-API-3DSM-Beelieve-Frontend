import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import schemaProjetoInicial from "./validation"
import Button from "../Button"
import axios from "../../services/axios"

import { FiPlus, FiMinus } from "react-icons/fi"

function FormCadastroProjeto() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      valorHora: 0,
    },
    resolver: yupResolver(schemaProjetoInicial),
  })

  const [tabelaWBS, setTabelaWBS] = useState([
    {
      nivel: "1",
      descricao: "Objetivo Final",
    },
  ])

  const adicionarSubnivel = (nivelPai) => {
    if (nivelPai.split(".").length >= 3) {
      return
    }

    const novoNivel = calcularProximoNivel(nivelPai)

    const novaLinha = {
      nivel: novoNivel,
      descricao: "Nova Descrição",
    }

    const novaTabela = [...tabelaWBS]

    const indexNivelPai = novaTabela.findIndex(
      (linha) => linha.nivel === nivelPai,
    )

    if (indexNivelPai !== -1) {
      let indexInsercao = indexNivelPai + 1

      while (
        indexInsercao < novaTabela.length &&
        novaTabela[indexInsercao].nivel.startsWith(nivelPai)
      ) {
        indexInsercao++
      }

      novaTabela.splice(indexInsercao, 0, novaLinha)
    } else {
      novaTabela.push(novaLinha)
    }

    setTabelaWBS(novaTabela)
  }

  const calcularProximoNivel = (nivelPai) => {
    const subniveisExistentes = tabelaWBS
      .filter((linha) => linha.nivel.toString().startsWith(nivelPai + "."))
      .map((linha) => linha.nivel)

    let proximoSubnivel = 1
    while (subniveisExistentes.includes(`${nivelPai}.${proximoSubnivel}`)) {
      proximoSubnivel++
    }

    return `${nivelPai}.${proximoSubnivel}`
  }

  const removerNivel = (nivelPai) => {
    const indiceNivelRemovido = tabelaWBS.findIndex(
      (linha) => linha.nivel === nivelPai,
    )

    const novaTabela = [...tabelaWBS]

    nivelPai = nivelPai.split(".")

    if (nivelPai.length === 3) {
      novaTabela.splice(indiceNivelRemovido, 1)

      let novaOrdem = 1
      novaTabela.forEach((linha) => {
        const nivelQuebrado = linha.nivel.split(".")

        if (
          nivelQuebrado.length === 3 &&
          nivelQuebrado.slice(0, 2).toString() ===
            nivelPai.slice(0, 2).toString()
        ) {
          linha.nivel = `${
            nivelPai.slice(0, 2).toString().replaceAll(",", ".") +
            "." +
            novaOrdem.toString()
          }`
          novaOrdem++
        }
      })
    } else if (nivelPai.length === 2) {
      const subNiveisAfetados = novaTabela.filter((linha) => {
        return (
          linha.nivel.split(".").slice(0, 2).toString() === nivelPai.toString()
        )
      }).length

      novaTabela.splice(indiceNivelRemovido, subNiveisAfetados)

      let novaOrdem = 1
      let novaOrdemSubnivel = 1
      let nivelAntigo = ""
      let novoNivel = ""
      novaTabela.forEach((linha) => {
        const nivelQuebrado = linha.nivel.split(".")

        if (nivelQuebrado.length === 2) {
          nivelAntigo = linha.nivel.split(".")
          novoNivel = linha.nivel = `${"1." + novaOrdem}`
          novaOrdem++
        }

        if (
          nivelQuebrado.length > 2 &&
          nivelQuebrado.slice(0, 2).toString() === nivelAntigo.toString()
        ) {
          console.log("chegou")
          linha.nivel = `${novoNivel + "." + novaOrdemSubnivel}`
          novaOrdemSubnivel++
        }
      })
    }

    setTabelaWBS(novaTabela)
  }

  const gerarJsonProjeto = (data) => {
    const projeto = {
      nome_projeto: data.nomeProjeto,
      descricao_projeto: data.descricaoProjeto,
      valor_hora_projeto: data.valorHora,
      sub_projetos: [],
    }

    const wbsProjeto = tabelaWBS

    let nivelSubProjeto = ""
    wbsProjeto.forEach((linha) => {
      if (linha.nivel.length === 3) {
        projeto.sub_projetos.push({
          ordem_sub_projetos: linha.nivel,
          nome_sub_projeto: linha.descricao,
          nivel_sub_projeto: [],
        })

        nivelSubProjeto = linha.nivel
      }

      if (linha.nivel.length > 3 && linha.nivel.startsWith(nivelSubProjeto)) {
        const indexSubProjeto = projeto.sub_projetos.findIndex(
          (subprojeto) => subprojeto.ordem_sub_projetos === nivelSubProjeto,
        )

        projeto.sub_projetos[indexSubProjeto].nivel_sub_projeto.push({
          ordem_nivel_sub_projeto: linha.nivel,
          nome_nivel_sub_projeto: linha.descricao,
        })
      }
    })

    return projeto
  }

  const cadastrarProjeto = async (data) => {
    const projeto = gerarJsonProjeto(data)

    //console.log(projeto)
    await axios.post("/cadastrar/projeto", projeto)
  }

  const handleDescricaoSubProjeto = (evento, index) => {
    const novaDescricao = evento.target.value
    const novaTabela = [...tabelaWBS]
    novaTabela[index].descricao = novaDescricao
    setTabelaWBS(novaTabela)
  }

  return (
    <form onSubmit={handleSubmit(cadastrarProjeto)}>
      <div className="mt-4 flex flex-col">
        <label
          htmlFor="nomeProjeto"
          className="text-base font-medium text-on-light"
        >
          Título do Projeto
        </label>
        <input
          type="text"
          id="nomeProjeto"
          className="w-1/2 rounded-md border border-n70 p-1"
          {...register("nomeProjeto")}
        />
        {errors?.nomeProjeto && (
          <label
            htmlFor="nomeProjeto"
            className="text-sm font-light text-error"
          >
            {errors.nomeProjeto.message}
          </label>
        )}
      </div>
      <div className="mt-4 flex flex-col">
        <label
          htmlFor="descricaoProjeto"
          className="text-base font-medium text-on-light"
        >
          Descrição
        </label>
        <input
          type="text"
          className="w-1/2 rounded-md border border-n70 p-1"
          {...register("descricaoProjeto")}
        />
        {errors?.descricaoProjeto && (
          <label
            htmlFor="descricaoProjeto"
            className="text-sm font-light text-error"
          >
            {errors.descricaoProjeto.message}
          </label>
        )}
      </div>
      <div className="mt-4 flex flex-col">
        <label
          htmlFor="valorHora"
          className="text-base font-medium text-on-light"
        >
          Valor/Hora de trabalho
        </label>
        <input
          type="number"
          step="any"
          className="w-1/2 rounded-md border border-n70 p-1"
          {...register("valorHora")}
        />
        {errors?.valorHora && (
          <label htmlFor="valorHora" className="text-sm font-light text-error">
            {errors.valorHora.message}
          </label>
        )}
      </div>
      <div className="ml-5 mt-5">
        <h2 className="text-xl font-semibold text-on-light">WBS</h2>
        <table id="wbsTable" className="mt-5 w-1/3 text-left text-on-light">
          <thead className="bg-primary98 text-base uppercase">
            <tr>
              <th className="w-1/6 px-4 py-2">Nível</th>
              <th className="w-3/6 px-4 py-2">Descrição</th>
              <th className="w-2/6">Ação</th>
            </tr>
          </thead>
          <tbody className="text-lg">
            {tabelaWBS.map((linha, index) => (
              <tr key={index}>
                <td className="w-1/4 px-4 py-1.5 font-semibold">
                  {linha.nivel}
                </td>
                <td className="w-1/4 px-4 py-1.5">
                  <input
                    type="text"
                    className="w-full"
                    value={tabelaWBS[index].descricao}
                    onChange={(e) => handleDescricaoSubProjeto(e, index)}
                  />
                </td>
                {linha.nivel.toLocaleString().split(".").length < 3 && (
                  <Button
                    iconeOpcional={FiPlus}
                    tipo="button"
                    onClick={() => adicionarSubnivel(`${linha.nivel}`)}
                    className="m-2 rounded-full bg-primary50"
                    iconeTamanho="24px"
                  />
                )}
                {linha.nivel !== "1" && (
                  <Button
                    iconeOpcional={FiMinus}
                    tipo="button"
                    onClick={() => removerNivel(`${linha.nivel}`)}
                    className="m-2 rounded-full bg-n40"
                    iconeTamanho="24px"
                    iconeCor="white"
                  />
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 flex justify-end gap-5">
        <Button
          texto="Cancelar"
          tipo="button"
          className="rounded-[10px] border-2 border-bg22 p-2 text-lg font-semibold text-bg22"
        />
        <Button
          texto="Confirmar"
          tipo="submit"
          className="rounded-[10px] bg-primary50 p-2 text-lg font-semibold text-on-primary"
        />
      </div>
    </form>
  )
}

export default FormCadastroProjeto
