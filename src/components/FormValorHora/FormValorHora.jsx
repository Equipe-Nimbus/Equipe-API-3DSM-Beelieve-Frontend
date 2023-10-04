import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useForm, useFieldArray } from "react-hook-form"

import Button from "../Button"
import IntlCurrencyInput from "react-intl-currency-input"

import { formatacaoDinheiro } from "../../utils/formatacaoDinheiro"
import { formatarEstrutura } from "../../utils/formatarEstrutura"
import axios from "../../services/axios"

function FormValorHora({ tabela, projeto, setAtualizar }) {
  const [subProjetosAcessiveis, setSubProjetosAcessiveis] = useState([])

  useEffect(() => {
    checarNivelSubProjeto(projeto.sub_projetos)
  }, [])

  const checarNivelSubProjeto = (subprojetos) => {
    const subProjetosFiltrados = []

    subprojetos.forEach((subprojeto) => {
      if (subprojeto.nivel_sub_projeto?.length < 1) {
        subProjetosFiltrados.push(subprojeto)
      } else {
        subprojeto.nivel_sub_projeto.forEach((nivel) => {
          subProjetosFiltrados.push(nivel)
        })
      }
    })

    console.log(subProjetosFiltrados)
    setSubProjetosAcessiveis(subProjetosFiltrados)
  }

  const estruturaDetalhes = tabela.map((linha) => {
    return {
      id: linha.id,
      nivel: linha.nivel,
      descricao: linha.descricao,
      orcamento: 0,
      hora_homem: 0,
    }
  })

  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      estruturaDetalhes: estruturaDetalhes,
    },
  })

  const { fields } = useFieldArray({
    control,
    keyName: "customId",
    name: "estruturaDetalhes",
  })

  const handleOrcamento = async (index, valor) => {
    setValue(`estruturaDetalhes[${index}].orcamento`, valor)
  }

  const atualizarDetalhesPacotes = async (data) => {
    const estruturaPreenchida = data.estruturaDetalhes

    const novaEstrutura = formatarEstrutura(estruturaPreenchida)

    projeto.orcamento_projeto = estruturaPreenchida[0].orcamento
    projeto.hora_humano_total = parseFloat(estruturaPreenchida[0].hora_homem)
    projeto.sub_projetos = novaEstrutura

    const dadoOrcamentoProjeto = projeto

    try {
      await axios
        .put("/projeto/atualizar/orcamento", dadoOrcamentoProjeto)
        .then((response) => {
          if (response.status === 200) {
            console.log("resposta: ", response)
            window.alert("Detalhes dos pacotes atualizados com sucesso!")
            setAtualizar(true)
          }
          else {
            window.alert("Ocorreu algum problema na atualização :(")
          }
        })
    } catch (error) { }
  }

  return (
    <div>
      <div className="mx-5 mb-2 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-on-light">
          Detalhes dos pacotes de trabalho
        </h3>
      </div>
      <hr className="border-n90" />
      <form
        onSubmit={handleSubmit(atualizarDetalhesPacotes)}
        className="my-10 flex flex-col gap-2"
      >
        <table className="mx-auto border px-16 rounded">
          <thead className="bg-primary98 p-10 text-base uppercase">
            <tr>
              <th class="border px-12 py-3">Nível</th>
              <th class="border px-12 py-3">Descrição</th>
              <th class="border px-12 py-3">Orçamento</th>
              <th class="border px-6 py-3">Hora Homem</th>
              <th class="">Materiais</th>
              <th class="border px-12 py-3">Atribuição</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((linha, index) => (
              <tr key={index}>
                <td class="border px-4 py-1.5 text-lg font-semibold">
                  {linha.nivel}
                </td>
                <td class="border px-4">
                  {linha.nivel === "1" && linha.descricao}

                  {linha.nivel.length === 3 &&
                    (subProjetosAcessiveis.some(
                      (subprojeto) => subprojeto.id_sub_projeto === linha.id,
                    ) ? (
                      <Link
                        to={`/projetos/tarefas/${linha.id}`}
                        state={{
                          tipo_pai: "subprojeto",
                          tarefas: subProjetosAcessiveis.find(
                            (subprojeto) =>
                              subprojeto.id_sub_projeto === linha.id,
                          )?.tarefas,
                        }}
                      >
                        {linha.descricao}
                      </Link>
                    ) : (
                      <span>{linha.descricao}</span>
                    ))}

                  {linha.nivel.length > 3 && (
                    <Link
                      to={`/projetos/tarefas/${linha.id}`}
                      state={{
                        tipo_pai: "nivelsubprojeto",
                        tarefas: subProjetosAcessiveis.find(
                          (subprojeto) =>
                            subprojeto.id_nivel_sub_projeto === linha.id,
                        )?.tarefas,
                      }}
                    >
                      {linha.descricao}
                    </Link>
                  )}
                </td>
                <td class="border px-4">
                  <IntlCurrencyInput
                    name={`estruturaDetalhes[${index}].orcamento`}
                    {...register(`estruturaDetalhes[${index}].orcamento`)}
                    defaultValue={linha.orcamento}
                    type="text"
                    currency="BRL"
                    config={formatacaoDinheiro}
                    onChange={(e, value) => handleOrcamento(index, value)}
                  />
                </td>
                <td class="border px-4">
                  <input
                    id="hora"
                    name={`estruturaDetalhes[${index}].hora_homem`}
                    {...register(`estruturaDetalhes[${index}].hora_homem`)}
                    defaultValue={linha.hora_homem}
                    type="number"
                  />
                </td>
                <td class="border px-4">
                  <IntlCurrencyInput
                    name={`estruturaDetalhes[${index}].materiais`}
                    {...register(`estruturaDetalhes[${index}].materiais`)}
                    defaultValue={linha.materiais}
                    type="text"
                    currency="BRL"
                    config={formatacaoDinheiro}
                    onChange={(e, value) => handleOrcamento(index, value)}
                  />
                </td>
                <td class="break-all border px-1">{ }</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-7 ml-6">
          <input className="border px-2 py-1 rounded w-36 font-bold" type='text' value={`Hora = R$ ${sessionStorage.getItem('valor')} `} readOnly />
        </div>
        <Button
          texto="Salvar"
          tipo="submit"
          className="place-self-end rounded-[10px] bg-primary50 p-2 text-lg font-semibold text-on-primary"
        />
      </form>
    </div>
  )
}

export default FormValorHora
