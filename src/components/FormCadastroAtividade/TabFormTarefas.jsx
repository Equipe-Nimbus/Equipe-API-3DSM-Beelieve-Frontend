import React, { useEffect, useState } from "react"
import { BiTrash } from "react-icons/bi"

//import schemaInsercaoAtividade from './validationAtividade';
import axios from "../../services/axios"

const TabFormTarefas = ({ tarefas, tipo_pai, id }) => {
  const [tarefa, setTarefa] = useState([
    {
      id: "",
      descricao: "",
      resultadoEsperado: "",
      status: "",
      peso: "",
      prazo: "",
    },
  ])

  useEffect(() => {
    if (tarefas.length > 0) {
      const novasTarefas = tarefas.map((atividade) => {
        const novaTarefa = {
          id: atividade.id_tarefa,
          descricao: atividade.descricao_atividade_tarefa,
          resultadoEsperado: atividade.resultado_esperado_tarefa,
          status: atividade.status_tarefa,
          peso: atividade.peso_tarefa,
          prazo: atividade.prazo_tarefa,
        }
        return novaTarefa
      })

      setTarefa(novasTarefas)
    }
  }, [])

  const addRow = () => {
    const novaTarefa = [...tarefa]
    const novaLinha = {
      id: "",
      descricao: "",
      resultadoEsperado: "",
      status: "",
      peso: "",
      prazo: "",
    }

    novaTarefa.push(novaLinha)
    setTarefa(novaTarefa)
  }

  const handleDescricao = (evento, index) => {
    const novaDescricao = evento.target.value
    const novaTabela = [...tarefa]
    novaTabela[index].descricao = novaDescricao
    setTarefa(novaTabela)
  }

  const handleResultadoEsperado = (evento, index) => {
    const novoResultadoEsperado = evento.target.value
    const novaTabela = [...tarefa]
    novaTabela[index].resultadoEsperado = novoResultadoEsperado
    setTarefa(novaTabela)
  }

  const handlePeso = (evento, index) => {
    const novoPeso = evento.target.value
    const novaTabela = [...tarefa]
    novaTabela[index].peso = novoPeso
    setTarefa(novaTabela)
  }

  const handlePrazo = (evento, index) => {
    const novoPrazo = evento.target.value
    const novaTabela = [...tarefa]
    novaTabela[index].prazo = novoPrazo
    setTarefa(novaTabela)
  }

  const handleStatus = (evento, index) => {
    const novoStatus = evento.target.checked ? 1 : 0
    const novaTabela = [...tarefa]
    novaTabela[index].status = novoStatus
    setTarefa(novaTabela)
  }

  const saveTarefa = async () => {

    const geraJsonTarefas = listaTarefas()

    await axios
      .put("/tarefa/atualizar", geraJsonTarefas)
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
      })

    /*schemaInsercaoAtividade.validate( tarefa )
            .then( tarefa => {
                axios.post( '/tarefa/cadastrar', tarefa ).then( response => setTarefa( response.tarefa ));
            } )
            .catch( errors => {
                console.error( errors );
            } );*/

    console.log("Dados Salvos:", geraJsonTarefas)
  }

  const deleteRow = async (index) => {
    const tarefasExistentes = [...tarefa]
    tarefasExistentes.splice(index, 1)

    setTarefa(tarefasExistentes)
  }

  function listaTarefas() {
    const listaTarefas = {
      tipo_pai: tipo_pai,
      id_pai: id,
      lista_tarefas: [],
    }

    tarefa.forEach((atividade) => {
      listaTarefas.lista_tarefas.push({
        id_tarefa: atividade.id,
        descricao_atividade_tarefa: atividade.descricao,
        resultado_esperado_tarefa: atividade.resultadoEsperado,
        peso_tarefa: atividade.peso,
        status_tarefa: atividade.status,
        prazo_tarefa: atividade.prazo,
      })
    })

    return listaTarefas
  }

  return (
    <div>
      <button onClick={() => window.history.back()}>Voltar</button>
      <h1>Pacote de trabalho: { }</h1>
      <hr className="border-n90" />

      <div>
        <div className="ps-48">
          <button onClick={addRow}
            className="mt-9 place-self-end rounded-[10px] bg-primary50 p-1 text-lg font-semibold text-on-primary">
            Adicionar tarefa
          </button>
        </div>


        <table class="mx-auto mt-5 w-2/3">
          <thead className="bg-primary98 p-10 text-base uppercase">
            <tr >
              <th class="border">Tarefa</th>
              <th class="border">Descrição</th>
              <th class="border">Resultado Esperado</th>
              <th class="border">Execução</th>
              <th class="border">Peso</th>
              <th class="border">Previsão</th>
            </tr>
          </thead>

          <tbody>
            {tarefa.map((item, index) => (
              <tr key={index}>
                <td class="border px-4 py-1.5 text-lg font-semibold">
                  {index + 1}
                </td>
                <td class="border px-4">
                  <input
                    type="text"
                    className="w-full"
                    value={tarefa[index].descricao}
                    onChange={(e) => handleDescricao(e, index)}
                  />
                </td>
                <td class="border px-4">
                  <input
                    type="text"
                    className="w-full"
                    value={tarefa[index].resultadoEsperado}
                    onChange={(e) => handleResultadoEsperado(e, index)}
                  />
                </td>
                <td class="border px-4">
                  <input
                    type="checkbox"
                    checked={tarefa[index].status === 1}
                    className="w-full"
                    value={tarefa[index].status}
                    onChange={(e) => handleStatus(e, index)}
                  />
                </td>
                <td class="border px-4">
                  <input
                    type="number"
                    className="w-full"
                    value={tarefa[index].peso}
                    onChange={(e) => handlePeso(e, index)}
                  />
                </td>
                <td class="border px-4">
                  <input
                    type="date"
                    className="w-full"
                    value={tarefa[index].prazo}
                    onChange={(e) => handlePrazo(e, index)}
                  />
                </td>
                <td>
                  <button onClick={() => deleteRow(index)}><BiTrash
                    color="#000000"
                    size={24}
                    className="hover:fill-primary50"
                  /></button>
                </td>
              </tr>
            ))}
          </tbody>

        </table><br /><br />

        <div className="absolute right-[15rem] bottom-0">
          <button onClick={saveTarefa}
            className="rounded-[10px] bg-primary50 p-2 text-lg font-semibold text-on-primary">
            Salvar
          </button>
        </div>

      </div>

    </div>
  )
}

export default TabFormTarefas
