import React, { useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Swal from "sweetalert2"

import { BiTrash } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"

import schemaInsercaoAtividade from "./validation"
import Button from "../Button"
import axios from "../../services/axios"

const removeZerosAEsquerda = (valor) => {
  // Remove zeros à esquerda usando expressão regular
  return valor.replace(/^0+/, '');
};

const TabFormTarefas = ({
  listaTarefas,
  tipoPai,
  idPai,
  ordem,
  nomePacote,
  nomeProjeto,
  dataInicioProjeto,
  progressoPacote,
  atribuicao,
}) => {
  const [tarefas, setTarefas] = useState([])
  const [progressoAnterior, setProgressoAnterior] = useState(progressoPacote)
  const [progresso, setProgresso] = useState(progressoPacote)

  const { register, control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      tarefas: tarefas,
    },
    resolver: yupResolver(schemaInsercaoAtividade),
  })

  const { fields } = useFieldArray({
    control,
    keyName: "customId",
    name: "tarefas",
  })

  useEffect(() => {
    if (listaTarefas.length > 0) {
      console.log(listaTarefas)
      const novasTarefas = listaTarefas.map((atividade) => {
        const novaTarefa = {
          id: atividade.id_tarefa,
          descricao: atividade.descricao_atividade_tarefa,
          resultadoEsperado: atividade.resultado_esperado_tarefa,
          status: atividade.status_tarefa === 1 ? true : false,
          peso: atividade.peso_tarefa ? atividade.peso_tarefa : 0,
          atribuicao: atividade.atribuicao,
          prazo: atividade.prazo_tarefa
            ? atividade.prazo_tarefa.slice(0, 10)
            : null,
          tendencia: atividade.tendencia_tarefa
            ? atividade.tendencia_tarefa.slice(0, 10)
            : null,
        }
        return novaTarefa
      })

      setTarefas(novasTarefas)
      setValue("tarefas", tarefas)
    }
  }, [])

  const addRow = () => {
    const novaTarefa = [...tarefas]
    const novaLinha = {
      id: "",
      descricao: "",
      resultadoEsperado: "",
      status: false,
      peso: 0,
      prazo: null,
      tendencia: null,
      atribuicao:null
    }

    novaTarefa.push(novaLinha)
    setTarefas(novaTarefa)
  }

  const deleteRow = (index) => {
    const tarefasExistentes = [...tarefas]
    tarefasExistentes.splice(index, 1)

    setTarefas(tarefasExistentes)
  }

  const handleStatus = (index) => {
    const statusAtual = getValues(`tarefas[${index}].status`)
    setValue(`tarefas[${index}].status`, statusAtual ? false : true)

    const tarefasAtuais = getValues("tarefas")
    setTarefas(tarefasAtuais)
  }

  const handleProgresso = () => {
    const tarefasAtuais = getValues("tarefas")

    const somaDosPesos = tarefasAtuais.reduce(
      (totalPesos, item) => totalPesos + parseInt(item.peso),
      0,
    )

    const progresso =
      (tarefasAtuais.reduce((totalPonderado, item) => {
        return totalPonderado + parseInt(item.peso) * item.status
      }, 0) /
        somaDosPesos) *
      100

    setProgresso(isNaN(progresso) ? 0 : parseFloat(progresso.toFixed(2)))
  }

  const handlePeso = (index, valor) => {
    setValue(`tarefas[${index}].peso`, valor)

    const tarefasAtuais = getValues("tarefas")
    setTarefas(tarefasAtuais)
  }

  useEffect(() => {
    setValue("tarefas", tarefas)
    handleProgresso()
  }, [tarefas])

  function gerarJsonTarefas(tarefas) {
    const listaTarefas = {
      tipo_pai: tipoPai,
      id_pai: idPai,
      progresso_pai: progresso,
      inicializado: dataInicioProjeto ? true : false,
      lista_tarefas: [],
    }

    tarefas.forEach((atividade) => {
      atividade.prazo = atividade.prazo ? atividade.prazo.toLocaleString() : null
      atividade.tendencia = atividade.tendencia ? atividade.tendencia.toLocaleString() : null

      listaTarefas.lista_tarefas.push({
        id_tarefa: atividade.id,
        descricao_atividade_tarefa: atividade.descricao,
        resultado_esperado_tarefa: atividade.resultadoEsperado,
        peso_tarefa: parseInt(atividade.peso),
        status_tarefa: atividade.status === true ? 1 : 0,
        prazo_tarefa: atividade.prazo
          ? `${atividade.prazo.slice(6, 10)}-${atividade.prazo.slice(3, 5)
          }-${atividade.prazo.slice(0, 2)}`
          : null,
        tendencia_tarefa: atividade.tendencia
          ? `${atividade.tendencia.slice(6, 10)}-${atividade.tendencia.slice(3, 5)
          }-${atividade.tendencia.slice(0, 2)}`
          : null,
        atribuicao: atividade.atribuicao,
      })
    })


    return listaTarefas
  }

  const saveTarefa = async (data) => {
    const listaTarefasPreenchidas = gerarJsonTarefas(data.tarefas)

    let PodeSalvar = true
    const peloMenosUmaTarefaMarcada =
      listaTarefasPreenchidas.lista_tarefas.some(
        (tarefa) => tarefa.status_tarefa === 1,
      )

    if (peloMenosUmaTarefaMarcada) {
      if (dataInicioProjeto) {
        PodeSalvar = true
      } else {
        PodeSalvar = false
      }
    }

    if (PodeSalvar) {
      if (progresso < progressoAnterior) {
        Swal.fire({
          title: "As alterações diminuíram o progresso. Continuar?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Continuar",
          confirmButtonColor: "#132431",
          cancelButtonText: "Cancelar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axios
              .put("/tarefa/atualizar", listaTarefasPreenchidas)
              .then((response) => {
                if (response.status === 200) {
                  Swal.fire({
                    title: "Tarefas atualizadas com sucesso!",
                    icon: "success",
                    confirmButtonColor: "#132431",
                  })
                }
              })
              .catch((error) => {
                if (error.response.status === 404) {
                  console.error("Recurso não encontrado.")
                } else {
                  console.error("Erro:", error)
                }
              })
          }
        })
      } else {
        await axios
          .put("/tarefa/atualizar", listaTarefasPreenchidas)
          .then((response) => {
            if (response.status === 200) {
              Swal.fire({
                title: "Tarefas atualizadas com sucesso!",
                icon: "success",
                confirmButtonColor: "#132431",
              })
            }
          })
          .catch((error) => {
            if (error.response.status === 404) {
              console.error("Recurso não encontrado.")
            } else {
              console.error("Erro:", error)
            }
          })
      }
    } else {
      Swal.fire(
        "Não é possível alterar o progresso de um projeto não iniciado!",
        "",
        "error",
      )
    }
  }

  return (
    <div>
      <div className="mb-2 flex items-end gap-64 ">
        <div>
          <h1 className="mb-5 text-3xl text-complementary-20">{nomeProjeto}</h1>
          <h2 className="text-2xl">
            Pacote de trabalho: {`${ordem} - ${nomePacote}`}
          </h2>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-2xl">
            Progresso:{" "}
            <span className="text-2xl text-complementary-20">{`${progresso}%`}</span>{" "}
          </span>
          <progress
            value={progresso}
            max={100}
            className="h-2 rounded bg-complementary-20"
          ></progress>
        </div>
      </div>
      <hr className="border-n90" />

      <div className="flex flex-col gap-2">
        <div className="ms-16">
          <button
            onClick={addRow}
            className=" mt-9 flex items-center gap-1 place-self-end rounded-[10px] bg-primary50 p-1 text-lg font-semibold text-on-primary"
          >
            Adicionar tarefa
            <AiOutlinePlus />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(saveTarefa)}
          className="flex flex-col gap-10"
        >
          <table className="mx-auto mt-5 w-11/12">
            <thead className="bg-primary98 p-10 text-base uppercase ">
              <tr>
                <th className="w-1/12 py-3 text-center">Tarefa</th>
                <th className="text-left">Descrição</th>
                <th className="text-left">Resultado Esperado</th>
                <th className="w-1/12 text-center">Peso</th>
                <th className="w-1/12 text-center">Execução</th>
                <th className="w-1/12 text-center">Prazo</th>
                <th className="w-1/12 text-center">Tendência</th>
                <th className="w-1/12 text-center">Atribuição</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((tarefa, index) => (
                <tr key={index} className="border-b border-n90">
                  <td className="py-1.5 text-center text-lg font-semibold">
                    {index + 1}
                  </td>
                  <td>
                    <input
                      type="text"
                      {...register(`tarefas[${index}].descricao`)}
                      defaultValue={tarefa.descricao}
                      className="w-11/12 border border-n90 rounded pl-1 disabled:text-n40 truncate"
                      disabled={tarefa.status === true}
                    />
                  </td>
                  <td className="pt-2">
                    <textarea
                      {...register(`tarefas[${index}].resultadoEsperado`)}
                      defaultValue={tarefa.resultadoEsperado}
                      className="w-full border border-n90 rounded disabled:text-n40 min-h-fit pl-2"
                      disabled={tarefa.status === true}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="number"
                      {...register(`tarefas[${index}].peso`)}
                      defaultValue={tarefa.peso}
                      onBlur={(e) => {
                        // Remove zeros à esquerda antes de atualizar o valor
                        e.target.value = removeZerosAEsquerda(e.target.value);
                        handlePeso(index, e.target.value);
                      }}
                      min={0}
                      className="w-1/2 text-center border border-n90 rounded disabled:text-n40"
                      disabled={tarefa.status === true}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      {...register(`tarefas[${index}].status`)}
                      checked={fields[index].status === true}
                      onChange={(e) => handleStatus(index)}
                      className="w-full"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      {...register(`tarefas[${index}].prazo`)}
                      defaultValue={tarefa.prazo}
                      className="w-full text-center disabled:text-n40"
                      disabled={tarefa.status === true}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      {...register(`tarefas[${index}].tendencia`)}
                      defaultValue={tarefa.tendencia}
                      className="w-full text-center disabled:text-n40"
                      disabled={tarefa.status === true || !dataInicioProjeto}
                    />
                  </td>
                  <td>
                    <select
                      {...register(`tarefas[${index}].atribuicao`)}
                      className="w-full text-center disabled:text-n40"
                    >
                    <option value=''>Grupos de trabalho</option>
                    {[...Array(20)].map((_, i) => (
                      <option key={i + 1}>{`Grupo ${i + 1}`}</option>
                    ))}
                    </select>
                  </td>
                  <td className="text-center">
                    <Button
                      iconeOpcional={BiTrash}
                      tipo="button"
                      iconeTamanho="24px"
                      className="hover:fill-primary50"
                      onClick={(e) => deleteRow(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="me-16 place-self-end">
            <Button
              texto="Salvar"
              tipo="submit"
              className="rounded-[10px] bg-primary50 p-2 text-lg font-semibold text-on-primary"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default TabFormTarefas
