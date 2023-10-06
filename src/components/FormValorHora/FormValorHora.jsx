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

    //console.log(subProjetosFiltrados)
    setSubProjetosAcessiveis(subProjetosFiltrados)
  }

  const estruturaDetalhes = tabela.map((linha) => {
    return {
      id: linha.id,
      nivel: linha.nivel,
      descricao: linha.descricao,
      orcamento: linha.orcamento ? linha.orcamento : 0,
      hora_homem: linha.hora_homem ? linha.hora_homem : 0,
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
    } catch (error) {}
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
        className="my-10 flex flex-col"
      >
        <table className="mx-auto mt-5 w-2/3 text-left">
          <thead className="bg-primary98 p-10 text-base uppercase">
            <tr>
              <th className="px-6 py-3">Nível</th>
              <th className="">Descrição</th>
              <th className="">Orçamento</th>
              <th className="">Hora Homem</th>
              <th className="">Atribuição</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((linha, index) => (
              <tr key={index} className="border-b border-n90">
                <td className="px-4 py-3 text-lg font-semibold">
                  {linha.nivel}
                </td>
                <td className="text-lg font-regular">
                  {linha.nivel === "1" && linha.descricao}

                  {linha.nivel.length === 3 &&
                    (subProjetosAcessiveis.some(
                      (subprojeto) => subprojeto.id_sub_projeto === linha.id,
                    ) ? (
                      <Link
                        to={`/projetos/tarefas/${linha.id}`}
                        state={{
                          tipo_pai: "subprojeto",
                          subprojeto: subProjetosAcessiveis.find(
                            (subprojeto) =>
                              subprojeto.id_sub_projeto === linha.id,
                          ),
                          nomeProjeto: projeto.nome_projeto
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
                        subprojeto: subProjetosAcessiveis.find(
                          (subprojeto) =>
                            subprojeto.id_nivel_sub_projeto === linha.id,
                        ),
                        nomeProjeto: projeto.nome_projeto
                      }}
                    >
                      {linha.descricao}
                    </Link>
                  )}
                </td>
                <td>
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
                <td>
                  <input
                    id="hora"
                    name={`estruturaDetalhes[${index}].hora_homem`}
                    {...register(`estruturaDetalhes[${index}].hora_homem`)}
                    defaultValue={linha.hora_homem}
                    type="number"
                  />
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
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
