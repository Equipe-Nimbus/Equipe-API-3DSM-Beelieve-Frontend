import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useForm, useFieldArray } from "react-hook-form"
import { useAuth } from "../../contexts/authContext"
import Swal from "sweetalert2"

import Button from "../Button"
import IntlCurrencyInput from "react-intl-currency-input"

import { formatacaoDinheiro } from "../../utils/formatacaoDinheiro"
import { formatarEstrutura } from "../../utils/formatarEstrutura"
import axios from "../../services/axios"

function FormValorHora({ tabela, projeto, setAtualizar }) {
  const [subProjetosAcessiveis, setSubProjetosAcessiveis] = useState([])
  const [usuariosEngenheiro, setusuariosEngenheiro] = useState([])
  const [usuariosLiderPacote, setusuariosLiderPacote] = useState([])
  const [chefesProjeto, setchefesProjeto] = useState([])
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

  const pegarChefesProjetos = (projeto) => {
    const chefes = []

    // Adicionando chefe de projeto, se existir
    if (projeto.chefe_projeto) {
      chefes.push(projeto.chefe_projeto)
    } else {
      chefes.push("")
    }

    // Adicionando chefes de subprojetos e nivel_sub_projeto, se existirem
    if (projeto.sub_projetos && projeto.sub_projetos.length > 0) {
      projeto.sub_projetos.forEach((subProjeto) => {
        if (subProjeto.chefe_sub_projeto) {
          chefes.push(subProjeto.chefe_sub_projeto)
        } else {
          chefes.push("")
        }
        // Adicione uma string vazia para nivel_sub_projeto
        if (
          subProjeto.nivel_sub_projeto &&
          subProjeto.nivel_sub_projeto.length > 0
        ) {
          subProjeto.nivel_sub_projeto.forEach((nivelSubProjeto) => {
            chefes.push("")
          })
        }
      })
    }

    setchefesProjeto(chefes)
  }

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

    //console.log("subprojetos alteraveis: ", projeto)

    setSubProjetosAcessiveis(subProjetosFiltrados)
  }

  const { user } = useAuth()
  async function getUsuariosLista() {
    try {
      await axios.get(`/usuario/listar/atribuicao`).then((response) => {
        const data = response.data

        setusuariosEngenheiro(data.EngenheirosChefe)
        setusuariosLiderPacote(data.LideresPacotes)
      })
    } catch (erro) {
      console.log(erro)
    }
  }

  useEffect(() => {
    getUsuariosLista()
    checarNivelSubProjeto(projeto.sub_projetos)
    pegarChefesProjetos(projeto)
  }, [])

  useEffect(() => {
    // Atualiza os valores dos selects usando o estado chefesProjeto
    fields.forEach((linha, index) => {
      const nomeChefeProjeto = chefesProjeto[index] // Obtém o nome do estado chefesProjeto

      // Procura pelo nome do chefe de projeto nos arrays de usuários
      const usuarioEncontradoEngenheiro = usuariosEngenheiro.find(
        (usuario) => usuario.nome === nomeChefeProjeto,
      )
      const usuarioEncontradoLiderPacote = usuariosLiderPacote.find(
        (usuario) => usuario.nome === nomeChefeProjeto,
      )

      // Verifica se o usuário foi encontrado e atualiza o valor do select com o ID correspondente
      if (usuarioEncontradoEngenheiro) {
        setValue(
          `estruturaDetalhes[${index}].atribuicao`,
          usuarioEncontradoEngenheiro.id_usuario,
        )
      } else if (usuarioEncontradoLiderPacote) {
        setValue(
          `estruturaDetalhes[${index}].atribuicao`,
          usuarioEncontradoLiderPacote.id_usuario,
        )
      } else {
        // Se nenhum usuário for encontrado, você pode manipular isso de acordo com a sua lógica
        // Por exemplo, definir um valor padrão para `novoValor` ou lidar com a situação de outra forma
      }
    })
  }, [chefesProjeto, usuariosEngenheiro, usuariosLiderPacote]) // Executa quando chefesProjeto, usuariosEngenheiro ou usuariosLiderPacote mudam

  const { register, handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: {
      estruturaDetalhes: estruturaDetalhes,
      valorHora: projeto.hora_valor_projeto,
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

  const handleTrocaValorHora = () => {
    const valorHora = getValues(`valorHora`)
    const pacotes = getValues(`estruturaDetalhes`)

    pacotes.forEach((pacote, index) => {
      setValue(
        `estruturaDetalhes[${index}].orcamento`,
        pacote.hora_homem * valorHora + pacote.materiais,
      )
    })

    setEstruturaDetalhes(pacotes)
  }

  const handleOrcamento = (index, nivel) => {
    const horaHomem = Number(
      getValues(`estruturaDetalhes[${index}].hora_homem`),
    )
    const material = Number(getValues(`estruturaDetalhes[${index}].materiais`))
    const valorHora = getValues("valorHora")
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
        const orcamentoSubProjeto = getValues(
          `estruturaDetalhes[${indexSubProjeto}].orcamento`,
        )
        const horaHomemSubProjeto = parseFloat(
          getValues(`estruturaDetalhes[${indexSubProjeto}].hora_homem`),
        )
        const materialSubProjeto = getValues(
          `estruturaDetalhes[${indexSubProjeto}].materiais`,
        )

        orcamentoSubProjetosSomados =
          orcamentoSubProjetosSomados + orcamentoSubProjeto
        horaHomemSubProjetosSomados =
          horaHomemSubProjetosSomados + horaHomemSubProjeto
        materialSubProjetosSomados =
          materialSubProjetosSomados + materialSubProjeto
      })

      setValue(
        `estruturaDetalhes[${indexSubProjetoPai}].orcamento`,
        orcamentoSubProjetosSomados,
      )
      setValue(
        `estruturaDetalhes[${indexSubProjetoPai}].hora_homem`,
        horaHomemSubProjetosSomados,
      )
      setValue(
        `estruturaDetalhes[${indexSubProjetoPai}].materiais`,
        materialSubProjetosSomados,
      )
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

  const blurHoraHomem = (index, valor) => {
    while (valor.length > 1 && valor[0] === "0") {
      valor = valor.substring(1)
    }

    setValue(`estruturaDetalhes[${index}].hora_homem`, valor)
  }

  const handleHoraHomem = (index, nivel, valor) => {
    blurHoraHomem(index, valor)
    handleOrcamento(index, nivel)
  }

  useEffect(() => {
    setValue(`estruturaDetalhes`, estruturaDetalhes)
  }, [estruturaDetalhes])

  const atualizarDetalhesPacotes = async (data) => {
    const detalhesPacotesPreenchidos = data.estruturaDetalhes

    console.log(detalhesPacotesPreenchidos)
    projeto.chefe_projeto = detalhesPacotesPreenchidos[0].atribuicao
    projeto.orcamento_projeto = parseFloat(detalhesPacotesPreenchidos[0].orcamento)
    projeto.hora_humano_total = parseFloat(detalhesPacotesPreenchidos[0].hora_homem)
    projeto.materiais_projeto = detalhesPacotesPreenchidos[0].materiais
    projeto.hora_valor_projeto = data.valorHora
    const projetoFormatado = formatarEstrutura(projeto, detalhesPacotesPreenchidos)

    console.log(projetoFormatado)

    try {
      await axios
        .put("/projeto/atualizar/orcamento", projetoFormatado)
        .then((response) => {
          if (response.status === 200) {
            //console.log("resposta: ", response)
            Swal.fire({
              title: "Detalhes dos pacotes salvos com sucesso!",
              icon: "success",
              confirmButtonColor: "#132431",
            })
            setAtualizar(true)
          } else {
            Swal.fire("Ocorreu algum problema na atualização :(", "", "error")
          }
        })
    } catch (error) {}
  }

  const statusInicio = projeto.data_inicio_projeto

  const blurEngenheiroChefe = () => {
    const engenheiroAtribuido = getValues(`estruturaDetalhes[${0}].atribuicao`)
    console.log("engenheiro atribuido: ", engenheiroAtribuido)
    if(!engenheiroAtribuido){
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-start",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })

      Toast.fire({
        icon: "warning",
        title: "O projeto não pode ficar sem um responsável."
      })

      setValue(`estruturaDetalhes[${0}].atribuicao`, usuariosEngenheiro[0].id_usuario)
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
        className="my-10 flex flex-col gap-2 overflow-x-auto pb-5"
      >
        <table className="mx-auto rounded px-16">
          <thead className="bg-primary98 p-10 text-base uppercase">
            <tr>
              <th className="px-12 py-3">Nível</th>
              <th className="pr-32 text-justify">Descrição</th>
              <th className="pl-8 text-justify">Orçamento</th>
              <th className="">Hora Homem</th>
              <th className="pl-24 text-justify">Materiais</th>
              <th className="pr-10">Atribuição</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((linha, index) => (
              <tr key={index} className="border-b border-n90">
                <td className="px-4 py-3 text-lg font-semibold">
                  {linha.nivel}
                </td>
                <td className="font-regular pr-32 text-lg">
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
                          dataInicioProjeto: projeto.data_inicio_projeto,
                          idProjeto: projeto.id_projeto,
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
                        dataInicioProjeto: projeto.data_inicio_projeto,
                        idProjeto: projeto.id_projeto,
                      }}
                    >
                      {linha.descricao}
                    </Link>
                  )}
                </td>

                <td class="pl-8">
                  <IntlCurrencyInput
                    name={`estruturaDetalhes[${index}].orcamento`}
                    {...register(`estruturaDetalhes[${index}].orcamento`)}
                    defaultValue={linha.orcamento}
                    type="text"
                    currency="BRL"
                    config={formatacaoDinheiro}
                    disabled
                    className="text-justify disabled:text-n40"
                  />
                </td>

                <td>
                  <input
                    id="hora"
                    name={`estruturaDetalhes[${index}].hora_homem`}
                    {...register(`estruturaDetalhes[${index}].hora_homem`)}
                    defaultValue={linha.hora_homem}
                    type="number"
                    onBlur={(e) =>
                      handleHoraHomem(index, linha.nivel, e.target.value)
                    }
                    className="text-center disabled:text-n40"
                    disabled={
                      (linha.nivel.length === 3 &&
                        !subProjetosAcessiveis.some(
                          (subprojeto) =>
                            subprojeto.id_sub_projeto === linha.id,
                        )) ||
                      linha.nivel === "1" ||
                      statusInicio ||
                      user?.cargo === "Analista"
                    }
                  />
                </td>

                <td className="pl-24">
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
                      linha.nivel === "1" ||
                      statusInicio ||
                      user?.cargo === "Analista"
                    }
                    className="text-justify disabled:text-n40"
                  />
                </td>
                <td class="break-all px-1">
                  {linha.nivel.split(".").length - 1 !== 2 && (
                    <select
                      className="text-justify disabled:text-n40"
                      name={`estruturaDetalhes[${index}].atribuicao`}
                      {...register(`estruturaDetalhes[${index}].atribuicao`)}
                      disabled={user?.cargo === "Analista"}
                      onBlur={blurEngenheiroChefe}
                    >
                      {linha.nivel === "1" ? (
                        <option value="">Engenheiro chefe</option>
                      ) : (
                        <option value="">Líder de Pacote</option>
                      )}

                      {linha.nivel === "1"
                        ? usuariosEngenheiro.map((usuario, contador) => (
                            <option
                              value={usuario.id_usuario}
                              selected={chefesProjeto[index] === usuario.nome}
                            >
                              {usuario.nome}
                            </option>
                          ))
                        : usuariosLiderPacote.map((usuario, contador) => (
                            <option
                              value={usuario.id_usuario}
                              selected={chefesProjeto[index] === usuario.nome}
                            >
                              {usuario.nome}
                            </option>
                          ))}
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="ml-6 mt-7 w-fit rounded border px-2 py-1 font-bold">
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
            disabled={statusInicio || user?.cargo === 'Analista'}
          />
        </div>

        {(!statusInicio && user?.cargo !== 'Analista') && (
          <Button
            texto="Salvar"
            tipo="submit"
            className="place-self-end rounded-[10px] bg-primary50 p-2 text-lg font-semibold text-on-primary"
          />
        )}
      </form>
    </div>
  )
}

export default FormValorHora
