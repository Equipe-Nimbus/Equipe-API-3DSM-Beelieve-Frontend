import React from "react"
import { useForm, useFieldArray } from "react-hook-form"

import Button from "../Button"
import IntlCurrencyInput from "react-intl-currency-input"

import { formatacaoDinheiro } from "../../utils/formatacaoDinheiro"
import { formatarEstrutura } from "../../utils/formatarEstrutura"
import axios from "../../services/axios"

function FormValorHora({ tabela, projeto, setAtualizar }) {
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
          console.log("resposta: ", response)
          setAtualizar(true)
        })
    } catch (error) {

    }
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
          <table class="mx-auto mt-5 w-2/3">
            <thead className="bg-primary98 p-10 text-base uppercase">
              <tr>
                <th class="border px-6 py-3">Nível</th>
                <th class="border">Descrição</th>
                <th class="border">Orçamento</th>
                <th class="border">Hora Homem</th>
                <th class="border">Atribuição</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((linha, index) => (
                <tr key={index}>
                  <td class="border px-4 py-1.5 text-lg font-semibold">
                    {linha.nivel}
                  </td>
                  <td class="border px-4">{linha.descricao}</td>
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
                  <td class="break-all border px-1">{}</td>
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
