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
  const [estruturaDetalhes, setEstruturaDetalhes] = useState(
    tabela.map((linha) => {
      return {
        id: linha.id,
        nivel: linha.nivel,
        descricao: linha.descricao,
        orcamento: linha.orcamento ? linha.orcamento : 0,
        hora_homem: linha.hora_homem ? linha.hora_homem : 0,
        materiais: linha.materiais ? linha.materiais : 0,
      }
    }),
  )

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

    //console.log("subprojetos alteraveis: ", subProjetosFiltrados)

    setSubProjetosAcessiveis(subProjetosFiltrados)
  }

  useEffect(() => {
    checarNivelSubProjeto(projeto.sub_projetos)
  }, [])

  const { register, handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: {
      estruturaDetalhes: estruturaDetalhes,
      valorHora: projeto.hora_valor_projeto
    },
  })

  const { fields } = useFieldArray({
    control,
    keyName: "customId",
    name: "estruturaDetalhes",
  })


  const handleMateriais = (index, valor) => {
    setValue(`estruturaDetalhes[${index}].materiais`, valor)
  }

  const handleValorHora = (valor) => {
    setValue(`valorHora`, valor)
  }

  const handleTrocaValorHora = () =>{
    const valorHora = getValues(`valorHora`)
    const pacotes = getValues(`estruturaDetalhes`)
    
    pacotes.forEach((pacote, index) => {
      setValue(`estruturaDetalhes[${index}].orcamento`, (pacote.hora_homem * valorHora) + pacote.materiais)
    })

    setEstruturaDetalhes(pacotes)
  }

  const handleOrcamento = (index, nivel) => {
    const horaHomem = Number(getValues(`estruturaDetalhes[${index}].hora_homem`),)
    const material = Number(getValues(`estruturaDetalhes[${index}].materiais`))
    const valorHora = getValues('valorHora')
    const orcamentoNivel = horaHomem * valorHora + material

    setValue(`estruturaDetalhes[${index}].orcamento`, orcamentoNivel)

    //consistência do subprojeto
    if (nivel.length > 3) {
      const nivelSubProjetoPai = nivel.slice(0, 3)
      const indexSubProjetoPai = estruturaDetalhes.findIndex(
        (subprojeto) => subprojeto.nivel === nivelSubProjetoPai,
      )

      const subProjetosFilhos = estruturaDetalhes.filter(
        (subprojeto) =>
          subprojeto.nivel.startsWith(nivelSubProjetoPai) &&
          subprojeto.nivel.length > 3,
      )

      let orcamentoSubProjetosSomados = 0
      let horaHomemSubProjetosSomados = 0
      let materialSubProjetosSomados = 0
      subProjetosFilhos.forEach((subprojeto) => {
        const indexSubProjeto = estruturaDetalhes.findIndex(
          (linha) => linha.nivel === subprojeto.nivel,
        )
        const orcamentoSubProjeto = getValues(`estruturaDetalhes[${indexSubProjeto}].orcamento`)
        const horaHomemSubProjeto = parseFloat(getValues(`estruturaDetalhes[${indexSubProjeto}].hora_homem`))
        const materialSubProjeto = getValues(`estruturaDetalhes[${indexSubProjeto}].materiais`)

        orcamentoSubProjetosSomados = orcamentoSubProjetosSomados + orcamentoSubProjeto
        horaHomemSubProjetosSomados = horaHomemSubProjetosSomados + horaHomemSubProjeto
        materialSubProjetosSomados = materialSubProjetosSomados + materialSubProjeto
      })

      setValue(`estruturaDetalhes[${indexSubProjetoPai}].orcamento`, orcamentoSubProjetosSomados,)
      setValue(`estruturaDetalhes[${indexSubProjetoPai}].hora_homem`, horaHomemSubProjetosSomados,)
      setValue(`estruturaDetalhes[${indexSubProjetoPai}].materiais`, materialSubProjetosSomados,)
    }

    const valores = getValues("estruturaDetalhes")

    let orcamentoTotalProjeto = 0
    let horaHomemTotalProjeto = 0
    let materialTotalProjeto = 0
    valores.forEach((nivel) => {
      if (nivel.nivel.length === 3) {
        const orcamentoNivel = nivel.orcamento
        const horaHomemNivel = parseFloat(nivel.hora_homem)
        const materialNivel = nivel.materiais

        orcamentoTotalProjeto = orcamentoTotalProjeto + orcamentoNivel
        horaHomemTotalProjeto = horaHomemTotalProjeto + horaHomemNivel
        materialTotalProjeto = materialTotalProjeto + materialNivel
      }
    })

    setValue(`estruturaDetalhes[0].orcamento`, orcamentoTotalProjeto)
    setValue(`estruturaDetalhes[0].hora_homem`, horaHomemTotalProjeto)
    setValue(`estruturaDetalhes[0].materiais`, materialTotalProjeto)

    setEstruturaDetalhes(valores)
  }

  useEffect(() => {
    setValue(`estruturaDetalhes`, estruturaDetalhes)
  }, [estruturaDetalhes])

  const atualizarDetalhesPacotes = async (data) => {
    const detalhesPacotesPreenchidos = data.estruturaDetalhes

    projeto.orcamento_projeto = parseFloat(detalhesPacotesPreenchidos[0].orcamento)
    projeto.hora_humano_total = parseFloat(detalhesPacotesPreenchidos[0].hora_homem)
    projeto.materiais_projeto = detalhesPacotesPreenchidos[0].materiais
    projeto.hora_valor_projeto = data.valorHora
    
    const projetoFormatado = formatarEstrutura(projeto, detalhesPacotesPreenchidos)

    //console.log(projetoFormatado)

    try {
      await axios
        .put("/projeto/atualizar/orcamento", projetoFormatado)
        .then((response) => {
          if (response.status === 200) {
            //console.log("resposta: ", response)
            window.alert("Detalhes dos pacotes atualizados com sucesso!")
            setAtualizar(true)
          } else {
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
        className="my-10 flex flex-col gap-2"
      >
        <table className="mx-auto rounded px-16">
          <thead className="bg-primary98 p-10 text-base uppercase">
            <tr>
              <th class="px-12 py-3">Nível</th>
              <th class="px-12 py-3">Descrição</th>
              <th class="px-12 py-3">Orçamento</th>
              <th class="px-6 py-3">Hora Homem</th>
              <th class="">Materiais</th>
              <th class="px-12 py-3">Atribuição</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((linha, index) => (
              <tr key={index} className="border-b border-n90">
                <td className="px-4 py-3 text-lg font-semibold">
                  {linha.nivel}
                </td>
                <td className="font-regular text-lg">
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
                          nomeProjeto: projeto.nome_projeto,
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
                        nomeProjeto: projeto.nome_projeto,
                      }}
                    >
                      {linha.descricao}
                    </Link>
                  )}
                </td>

                <td class="px-4">
                  <IntlCurrencyInput
                    name={`estruturaDetalhes[${index}].orcamento`}
                    {...register(`estruturaDetalhes[${index}].orcamento`)}
                    defaultValue={linha.orcamento}
                    type="text"
                    currency="BRL"
                    config={formatacaoDinheiro}
                    disabled
                    className="text-center"
                  />
                </td>

                <td>
                  <input
                    id="hora"
                    name={`estruturaDetalhes[${index}].hora_homem`}
                    {...register(`estruturaDetalhes[${index}].hora_homem`)}
                    defaultValue={linha.hora_homem}
                    type="number"
                    onBlur={(e) => handleOrcamento(index, linha.nivel)}
                    className="text-center"
                    disabled={
                      (linha.nivel.length === 3 &&
                        !subProjetosAcessiveis.some(
                          (subprojeto) =>
                            subprojeto.id_sub_projeto === linha.id,
                        )) ||
                      linha.nivel === "1"
                    }
                  />
                </td>

                <td class="px-4">
                  <IntlCurrencyInput
                    name={`estruturaDetalhes[${index}].materiais`}
                    {...register(`estruturaDetalhes[${index}].materiais`)}
                    defaultValue={linha.materiais}
                    type="text"
                    currency="BRL"
                    config={formatacaoDinheiro}
                    onChange={(e, value) => handleMateriais(index, value)}
                    onBlur={(e) => handleOrcamento(index, linha.nivel)}
                    disabled={
                      (linha.nivel.length === 3 &&
                        !subProjetosAcessiveis.some(
                          (subprojeto) =>
                            subprojeto.id_sub_projeto === linha.id,
                        )) ||
                      linha.nivel === "1"
                    }
                    className="text-center"
                  />
                </td>
                <td class="break-all px-1">{}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="ml-6 mt-7 rounded border px-2 py-1 font-bold w-fit">
          <label htmlFor="valorHora">Hora = </label>
          <IntlCurrencyInput
            {...register(`valorHora`)}
            type="text"
            currency="BRL"
            config={formatacaoDinheiro}
            onChange={(e, value) => handleValorHora(value)}
            onBlur={(e) => handleTrocaValorHora()}
            defaultValue={projeto.hora_valor_projeto}
            className="w-16"
          />
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
