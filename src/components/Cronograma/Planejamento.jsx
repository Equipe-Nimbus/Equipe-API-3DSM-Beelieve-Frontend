import React, { useState, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAuth } from "../../contexts/authContext"
import Swal from "sweetalert2"

import Button from "../Button"

import schemaCronograma from "./validation"
import axios from "../../services/axios"

import { FiPlus, FiMinus } from "react-icons/fi"

function Planejamento({ idProjeto }) {
  const [cronograma, setCronograma] = useState({})
  const [subProjetosEditaveis, setSubProjetosEditaveis] = useState([])

  const { register, handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: {
      cronograma: cronograma.lista_cronograma,
    },
    resolver: yupResolver(schemaCronograma),
  })

  const { fields } = useFieldArray({
    control,
    name: "cronograma",
  })

  const { user } = useAuth()

  const getCronograma = async () => {
    try {
      await axios.get(`/cronograma/${idProjeto}`).then((response) => {
        let cronogramaResgatado = response.data
        if (cronogramaResgatado.inicio_projeto) {
          let anoCronograma = Number(
            cronogramaResgatado.inicio_projeto.slice(0, 4),
          )
          cronogramaResgatado.lista_cronograma.forEach((mes) => {
            mes.mes_cronograma = `${mes.mes_cronograma} ${anoCronograma}`

            if (mes.mes_cronograma === `Dezembro ${anoCronograma}`) {
              anoCronograma++
            }

            mes.niveis.forEach((nivel) => {
              nivel.progresso_planejado =
                String(nivel.progresso_planejado) + "%"
            })
          })
        } else {
          cronogramaResgatado.lista_cronograma.forEach((mes) => {
            mes.niveis.forEach((nivel) => {
              nivel.progresso_planejado =
                String(nivel.progresso_planejado) + "%"
            })
          })
        }

        setCronograma(cronogramaResgatado)
        setValue("cronograma", cronogramaResgatado.lista_cronograma)
        setSubProjetosEditaveis(checarNivelSubProjeto(cronogramaResgatado.lista_cronograma[0].niveis))
      })
    } catch (error) {}
  }

  const checarNivelSubProjeto = (subprojetos) => {
    const subProjetosFiltrados = []

    subprojetos.forEach((subprojeto) => {
      if (subprojeto.tipo === 'nivelsubprojeto') {
        subProjetosFiltrados.push(subprojeto.ordem_nivel)
      } 
      else if(subprojeto.tipo === 'subprojeto'){

        const nivelSubProjeto = subprojeto.ordem_nivel
        if(!subprojetos.some((subProjetoAnalisado) => subProjetoAnalisado !== subprojeto && subProjetoAnalisado.ordem_nivel.startsWith(nivelSubProjeto))){
          subProjetosFiltrados.push(nivelSubProjeto)
        }
      }
    })

    //console.log("subprojetos alteraveis: ", subProjetosFiltrados)
    return subProjetosFiltrados
  }

  useEffect(() => {
    getCronograma()
  }, [])

  const blurPorcentagem = (valor, mes, nivel) => {
    const regexNumeros = /^[-+]?\d+(\.\d+)?$/
    if (valor.slice(-1) === "%") {
      valor = valor.slice(0, -1)
    }

    if (!regexNumeros.test(valor)) {
      setValue(`cronograma[${mes}].niveis[${nivel}].progresso_planejado`, "0%")
    } else {
        while (valor.length > 1 && valor[0] === "0") {
          valor = valor.substring(1)
        }

      valor = valor + "%"
      setValue(`cronograma[${mes}].niveis[${nivel}].progresso_planejado`, valor)
    }
  }

  const calcularProgresso = (mes, nivel) => {
    const ordemNivel = getValues(`cronograma[${mes}].niveis[${nivel}].ordem_nivel`)
    const cronogramaAtual = getValues(`cronograma[${mes}]`)

    if(ordemNivel.length > 3){
      const nivelPai = ordemNivel.slice(0, 3)
      const indexPai = cronogramaAtual.niveis.findIndex((subprojeto) => subprojeto.ordem_nivel === nivelPai)
      
      let contadorNiveisSubProjeto = 0
      let progressoSomadoNiveis = 0
      cronogramaAtual.niveis.forEach((nivel) => {
        if(nivel.ordem_nivel.startsWith(nivelPai) && nivel.ordem_nivel !== nivelPai){
          contadorNiveisSubProjeto++
          progressoSomadoNiveis = progressoSomadoNiveis + Number(nivel.progresso_planejado.slice(0, -1))
        }
      })
      
      let progressoCalculado = (progressoSomadoNiveis / contadorNiveisSubProjeto)
      if(Number.isInteger(progressoCalculado)){
        progressoCalculado = String(progressoCalculado) + '%'
      } else {
        progressoCalculado = progressoCalculado.toFixed(2) + '%'
      }

      setValue(`cronograma[${mes}].niveis[${indexPai}].progresso_planejado`, progressoCalculado)
    }

    const indexProjeto = cronogramaAtual.niveis.findIndex((nivel) => nivel.tipo === 'projeto')
    let contadorSubProjetos = 0
    let progressoSomadoSubProjetos = 0
    cronogramaAtual.niveis.forEach((subprojeto) => {
      
      if(subprojeto.ordem_nivel.length === 3){
        contadorSubProjetos++
        progressoSomadoSubProjetos = progressoSomadoSubProjetos + Number(subprojeto.progresso_planejado.slice(0, -1))
      }
    })

    let progressoCalculado = (progressoSomadoSubProjetos / contadorSubProjetos)
      if(Number.isInteger(progressoCalculado)){
        progressoCalculado = String(progressoCalculado) + '%'
      } else {
        progressoCalculado = progressoCalculado.toFixed(2) + '%'
      }
    
    setValue(`cronograma[${mes}].niveis[${indexProjeto}].progresso_planejado`, progressoCalculado)
  }

  const handleInput = (valor, mes, nivel) => {
    blurPorcentagem(valor, mes, nivel)
    calcularProgresso(mes, nivel)
  }

  const renderizarColunas = () => {
    return fields?.map((mes, indexMes) => (
      <th key={indexMes} className="px-6 py-3 text-center">
        {mes.mes_cronograma}
      </th>
    ))
  }

  const renderizarLinhas = () => {
    return fields[0]?.niveis.map((nivel, indexNivel) => (
      <tr key={indexNivel} className={subProjetosEditaveis.includes(nivel.ordem_nivel) ? "" : ""}>
        {renderizarColunas().map((coluna, indexMes) => (
          <td key={indexMes} className="px-1 py-5 text-lg">
            <input
              type="text"
              {...register(
                `cronograma[${indexMes}].niveis[${indexNivel}].progresso_planejado`,
              )}
              onBlur={(e) =>
                handleInput(e.target.value, indexMes, indexNivel)
              }
              className={`text-center disabled:text-n40`}
              disabled={!subProjetosEditaveis.includes(nivel.ordem_nivel) || user?.cargo === 'Analista'}
            />
          </td>
        ))}
      </tr>
    ))
  }

  const adicionarMes = () => {
    const ultimoMes =
      cronograma.lista_cronograma[cronograma.lista_cronograma.length - 1]

    if (cronograma.inicio_projeto) {
      const mesUltimoMes = ultimoMes.mes_cronograma.split(" ")[0]
      let anoUltimoMes = Number(ultimoMes.mes_cronograma.split(" ")[1])

      const mesesDoAno = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ]

      const indiceUltimoMes = mesesDoAno.indexOf(mesUltimoMes)
      let mesNovoMes = mesesDoAno[indiceUltimoMes + 1]

      if (mesUltimoMes === "Dezembro") {
        mesNovoMes = "Janeiro"
        anoUltimoMes++
      }

      const novoMes = {
        mes_cronograma: `${mesNovoMes} ${anoUltimoMes}`,
        ordem_mes_cronograma: ultimoMes.ordem_mes_cronograma + 1,
        niveis: ultimoMes.niveis,
      }

      const novoCronograma = { ...cronograma }
      novoCronograma.lista_cronograma.push(novoMes)
      setCronograma(novoCronograma)
    } else {
      const novoMes = {
        mes_cronograma: `Mês ${ultimoMes.ordem_mes_cronograma + 1}`,
        ordem_mes_cronograma: ultimoMes.ordem_mes_cronograma + 1,
        niveis: ultimoMes.niveis,
      }

      const novoCronograma = { ...cronograma }
      novoCronograma.lista_cronograma.push(novoMes)
      setCronograma(novoCronograma)
    }
  }

  const removerMes = () => {
    const novoCronograma = { ...cronograma }
    novoCronograma.lista_cronograma.pop()

    setCronograma(novoCronograma)
  }

  useEffect(() => {
    setValue("cronograma", cronograma.lista_cronograma)
  }, [cronograma])

  const atualizarCronograma = async (data) => {
    data.cronograma.forEach((mes) => {
      mes.mes_cronograma = mes.mes_cronograma.split(" ")[0]
      mes.niveis.forEach((nivel) => {
        if (nivel.progresso_planejado.slice(-1) === "%") {
          nivel.progresso_planejado = parseFloat(
            nivel.progresso_planejado.slice(0, -1),
          )
        } else {
          nivel.progresso_planejado = parseFloat(nivel.progresso_planejado)
        }
      })
    })

    cronograma.lista_cronograma = data.cronograma
    //console.log("cronograma mudado: ", cronograma)

    try {
      await axios.put("/cronograma/atualiza", cronograma).then((response) => {
        if (response.status === 200) {
          Swal.fire({
            title: "Planejamento salvo com sucesso!",
            icon: "success",
            confirmButtonColor: "#132431",
          })
          // window.alert("Planejamento salvo com sucesso!")
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h1 className="ml-5 text-xl font-semibold text-on-light">
        Avanço planejado
      </h1>
      <hr className="border-n90"></hr>
      <form onSubmit={handleSubmit(atualizarCronograma)}>
        <div className="ml-5 mt-5 flex justify-start">
          <table className="mt-5 text-left">
            <thead className="bg-primary98 p-10 text-base uppercase">
              <tr>
                <th className="px-6 py-3">Nível</th>
                <th className="px-6 py-3">Descrição</th>
              </tr>
            </thead>
            <tbody>
              {fields[0]?.niveis.map((nivel, indexNivel) => (
                <tr key={indexNivel}>
                  <td className="px-4 py-2 text-lg font-semibold">
                    {nivel.ordem_nivel}
                  </td>
                  <td className="font-regular px-6 text-lg">
                    {nivel.nome_nivel}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="max-w-6xl overflow-x-auto ">
            <table className="mt-5 text-left">
              <thead className="bg-primary98 p-10 text-base uppercase">
                <tr>{renderizarColunas()}</tr>
              </thead>
              <tbody>{renderizarLinhas()}</tbody>
            </table>
          </div>
        </div>
        <div className="mx-5 mt-5 flex justify-between">
          <div>
            {(cronograma.lista_cronograma?.length > 1 && user?.cargo !== 'Analista') && (
              <Button
                iconeOpcional={FiMinus}
                tipo="button"
                onClick={(e) => {
                  removerMes()
                }}
                className="m-2 rounded-full bg-primary50"
                iconeTamanho="28px"
              />
            )}
            {user?.cargo !== 'Analista' &&
              <Button
                iconeOpcional={FiPlus}
                tipo="button"
                onClick={(e) => {
                  adicionarMes()
                }}
                className="m-2 rounded-full bg-primary50"
                iconeTamanho="28px"
              />
            }
            
          </div>
          { user?.cargo !== 'Analista' &&
            <Button
              texto="Salvar"
              tipo="submit"
              className="place-self-end rounded-[10px] bg-primary50 p-2 text-lg font-semibold text-on-primary"
            />
          }
          
        </div>
      </form>
    </>
  )
}

export default Planejamento
