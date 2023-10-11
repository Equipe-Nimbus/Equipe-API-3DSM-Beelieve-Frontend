import React, { useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"

import { BiTrash } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"
//import schemaInsercaoAtividade from './validationAtividade';
import Button from "../Button"
import axios from "../../services/axios"

const TabFormTarefas = ({
  listaTarefas,
  tipoPai,
  idPai,
  ordem,
  nomePacote,
  nomeProjeto,
}) => {

  const [tarefas, setTarefas] = useState([
    {
      id: "",
      descricao: "",
      resultadoEsperado: "",
      status: 0,
      peso: "",
      prazo: "",
    },
  ])

  const { register, control, handleSubmit, setValue } = useForm({
    defaultValues: {
      tarefas: tarefas
    },
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
          status: atividade.status_tarefa ? atividade.status_tarefa : 0,
          peso: atividade.peso_tarefa,
          prazo: atividade.prazo_tarefa,
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
      status: "",
      peso: "",
      prazo: "",
    }

    novaTarefa.push(novaLinha)
    setTarefas(novaTarefa)
  }

  const deleteRow = async (index) => {
    const tarefasExistentes = [...tarefas]
    tarefasExistentes.splice(index, 1)

    setTarefas(tarefasExistentes)
  }

  useEffect(() => {
    setValue("tarefas", tarefas)
  }, [tarefas])

  function gerarJsonTarefas(tarefas) {
    const listaTarefas = {
      tipo_pai: tipoPai,
      id_pai: idPai,
      lista_tarefas: [],
    }

    tarefas.forEach((atividade) => {
      listaTarefas.lista_tarefas.push({
        id_tarefa: atividade.id,
        descricao_atividade_tarefa: atividade.descricao,
        resultado_esperado_tarefa: atividade.resultadoEsperado,
        peso_tarefa: parseInt(atividade.peso),
        status_tarefa: atividade.status,
        prazo_tarefa: atividade.prazo,
      })
    })

    return listaTarefas
  }

  const saveTarefa = async (data) => {
    console.log(data.tarefas)

    const listaTarefasPreenchidas = gerarJsonTarefas(data.tarefas)
    console.log(listaTarefasPreenchidas)

    /* await axios
      .put("/tarefa/atualizar", listaTarefasPreenchidas)
      .then((response) => {
        if (response.status === 200) {
          window.alert("Tarefas atualizadas com sucesso!")
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          console.error("Recurso não encontrado.")
        } else {
          console.error("Erro:", error)
        }
      }) */
  }

  return (
    <div>
      <h1 className="mb-5 text-3xl text-complementary-20">{nomeProjeto}</h1>
      <h2 className="mb-2 text-2xl">
        Pacote de trabalho: {`${ordem} - ${nomePacote}`}
      </h2>
      <hr className="border-n90" />

      <div className="flex flex-col gap-2">
        <div className="ps-40">
          <button
            onClick={addRow}
            className="ml-4 mt-9 flex place-self-end rounded-[10px] bg-primary50 p-1 text-lg font-semibold text-on-primary"
          >
            Adicionar tarefa
            <AiOutlinePlus className="ml-1 mt-2" />
          </button>
        </div>

        <form onSubmit={handleSubmit(saveTarefa)}>
          <table class="mx-auto mt-5 w-4/5">
            <thead className="bg-primary98 p-10 text-base uppercase">
              <tr>
                <th class="px-6 py-3">Tarefa</th>
                <th class="">Descrição</th>
                <th class="">Resultado Esperado</th>
                <th class="">Execução</th>
                <th class="">Peso</th>
                <th class="">Previsão</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((tarefa, index) => (
                <tr key={index} className="border-b border-n90">
                  <td class="px-4 py-1.5 text-center text-lg font-semibold">
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
                      className="w-full"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      {...register(`tarefas[${index}].status`)}
                      checked={fields[index].status === 1}
                      className="w-full"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      {...register(`tarefas[${index}].peso`)}
                      className="w-full"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      {...register(`tarefas[${index}].prazo`)}
                      className="w-full"
                    />
                  </td>
                  <td className="text-center">
                    <button onClick={() => deleteRow(index)}>
                      <BiTrash
                        color="#000000"
                        size={24}
                        className="hover:fill-primary50"
                      />
                    </button>
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
