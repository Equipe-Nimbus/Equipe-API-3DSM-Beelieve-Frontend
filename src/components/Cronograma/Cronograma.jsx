import React, { useState, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import Button from "../Button"

import schemaCronograma from "./validation"
import axios from "../../services/axios"

import { FiPlus, FiMinus } from "react-icons/fi"

function Cronograma({ idProjeto }) {
  const [cronograma, setCronograma] = useState({})

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cronograma: cronograma.lista_cronograma,
    },
    resolver: yupResolver(schemaCronograma),
  })

  const { fields } = useFieldArray({
    control,
    name: "cronograma",
  })

  const getCronograma = async () => {
    try {
      await axios.get(`/cronograma/${idProjeto}`).then((response) => {
        let cronogramaResgatado = response.data

        cronogramaResgatado.lista_cronograma =
          cronogramaResgatado.lista_cronograma.map((mes) => ({
            ...mes,
            niveis: mes.niveis.map((nivel) => ({
              ...nivel,
              progresso_planejado: String(nivel.progresso_planejado) + "%",
            })),
          }))

        setCronograma(cronogramaResgatado)

        setValue("cronograma", cronogramaResgatado.lista_cronograma)
      })
    } catch (error) {}
  }

  useEffect(() => {
    getCronograma()
  }, [])

  const blurPorcentagem = (valor, mes, nivel) => {
    if (valor.slice(-1) !== "%") {
      const regexNumeros = /^[-+]?\d+(\.\d+)?$/

      if (!regexNumeros.test(valor)) {
        setValue(`cronograma[${mes}].niveis[${nivel}].progresso_planejado`, '0%')
      } else {
        valor = valor + "%"
        setValue(
          `cronograma[${mes}].niveis[${nivel}].progresso_planejado`,
          valor,
        )
      }
    }
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
      <tr key={indexNivel} className="even:bg-amber-100 odd:bg-blue-100">
        {renderizarColunas().map((coluna, indexMes) => (
          <td key={indexMes} className="px-1 py-5 text-lg">
            <input
              type="text"
              {...register(
                `cronograma[${indexMes}].niveis[${indexNivel}].progresso_planejado`,
              )}
              onBlur={(e) =>
                blurPorcentagem(e.target.value, indexMes, indexNivel)
              }
              className="text-center"
            />
          </td>
        ))}
      </tr>
    ))
  }

  const adicionarMes = () => {
    const ultimoMes =
      cronograma.lista_cronograma[cronograma.lista_cronograma.length - 1]
    //console.log(ultimoMes)

    const novoMes = {
      mes_cronograma: `Mês ${ultimoMes.ordem_mes_cronograma + 1}`,
      ordem_mes_cronograma: ultimoMes.ordem_mes_cronograma + 1,
      niveis: ultimoMes.niveis,
    }

    const novoCronograma = { ...cronograma }
    novoCronograma.lista_cronograma.push(novoMes)
    setCronograma(novoCronograma)

    //console.log(novoMes)
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
    data.cronograma.forEach((mes) =>
      mes.niveis.forEach((nivel) => {
        if (nivel.progresso_planejado.slice(-1) === "%") {
          nivel.progresso_planejado = parseFloat(
            nivel.progresso_planejado.slice(0, -1),
          )
        } else {
          nivel.progresso_planejado = parseFloat(nivel.progresso_planejado)
        }
      }),
    )

    cronograma.lista_cronograma = data.cronograma
    //console.log("cronograma mudado: ", cronograma)

    try {
      await axios.put("/cronograma/atualiza", cronograma).then((response) => {
        if (response.status === 200) {
          window.alert("Planejamento salvo com sucesso!")
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
        <div className="flex justify-center mt-5">
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
        <div className="flex justify-between mt-5 mx-20">
          <div>
            <Button
              iconeOpcional={FiMinus}
              tipo="button"
              onClick={(e) => {
                removerMes()
              }}
              className="m-2 rounded-full bg-primary50"
              iconeTamanho="28px"
            />
            <Button
              iconeOpcional={FiPlus}
              tipo="button"
              onClick={(e) => {
                adicionarMes()
              }}
              className="m-2 rounded-full bg-primary50"
              iconeTamanho="28px"
            />
          </div>

          <Button
            texto="Salvar"
            tipo="submit"
            className="place-self-end rounded-[10px] bg-primary50 p-2 text-lg font-semibold text-on-primary"
          />
        </div>
      </form>
    </>
  )
}

export default Cronograma
