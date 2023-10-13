import React, { useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Swal from "sweetalert2"

import { BiTrash } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"

import schemaInsercaoAtividade from "./validation"
import Button from "../Button"
import axios from "../../services/axios"

const TabFormTarefas = ({
  listaTarefas,
  tipoPai,
  idPai,
  ordem,
  nomePacote,
  nomeProjeto,
  dataInicioProjeto,
  progressoPacote,
}) => {
  const [tarefas, setTarefas] = useState([])
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
      const novasTarefas = listaTarefas.map((atividade) => {
        const novaTarefa = {
          id: atividade.id_tarefa,
          descricao: atividade.descricao_atividade_tarefa,
          resultadoEsperado: atividade.resultado_esperado_tarefa,
          status: atividade.status_tarefa === 1 ? true : false,
          peso: atividade.peso_tarefa ? atividade.peso_tarefa : 0,
          prazo: atividade.prazo_tarefa
            ? atividade.prazo_tarefa.slice(0, 10)
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

    setProgresso(isNaN(progresso) ? 0 : progresso)
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
      progresso_pai: parseFloat(progresso),
      inicializado: dataInicioProjeto ? true : false,
      lista_tarefas: [],
    }

    tarefas.forEach((atividade) => {
      listaTarefas.lista_tarefas.push({
        id_tarefa: atividade.id,
        descricao_atividade_tarefa: atividade.descricao,
        resultado_esperado_tarefa: atividade.resultadoEsperado,
        peso_tarefa: parseInt(atividade.peso),
        status_tarefa: atividade.status === true ? 1 : 0,
        prazo_tarefa: atividade.prazo
          ? `${atividade.prazo.getFullYear()}-${
              atividade.prazo.getMonth() + 1
            }-${atividade.prazo.getDate()}`
          : null,
      })
    })

    return listaTarefas
  }

  const saveTarefa = async (data) => {
    const listaTarefasPreenchidas = gerarJsonTarefas(data.tarefas)

    let PodeSalvar = true
    const peloMenosUmaTarefaMarcada = listaTarefasPreenchidas.lista_tarefas.some(
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
      await axios
        .put("/tarefa/atualizar", listaTarefasPreenchidas)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire("Tarefas atualizadas com sucesso!", "", "success")
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            console.error("Recurso não encontrado.")
          } else {
            console.error("Erro:", error)
          }
        })
    } else {
      Swal.fire('Não é possível alterar o progresso de um projeto não iniciado!', '', 'error');
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
            <span className="text-2xl text-complementary-20">{`${parseInt(progresso)}%`}</span> </span>
          <progress
            value={progresso}
            max={100}
            className="h-2 rounded bg-complementary-20"
          ></progress>
        </div>
      </div>
      <hr className="border-n90" />

      <div className="flex flex-col gap-2">
        <div className="ps-40">
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
          <table className="mx-auto mt-5 w-4/5">
            <thead className="bg-primary98 p-10 text-base uppercase">
              <tr>
                <th className="px-6 py-3">Tarefa</th>
                <th className="">Descrição</th>
                <th className="">Resultado Esperado</th>
                <th className="">Peso</th>
                <th className="">Execução</th>
                <th className="">Previsão</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((tarefa, index) => (
                <tr key={index} className="border-b border-n90">
                  <td className="px-4 py-1.5 text-center text-lg font-semibold">
                    {index + 1}
                  </td>
                  <td>
                    <input
                      type="text"
                      {...register(`tarefas[${index}].descricao`)}
                      defaultValue={tarefa.descricao}
                      className="w-full"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      {...register(`tarefas[${index}].resultadoEsperado`)}
                      defaultValue={tarefa.resultadoEsperado}
                      className="w-full"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      {...register(`tarefas[${index}].peso`)}
                      defaultValue={tarefa.peso}
                      onBlur={(e) => handlePeso(index, e.target.value)}
                      min={0}
                      className="w-full"
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
                      className="w-full"
                    />
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

          <div className="mr-40 place-self-end">
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
