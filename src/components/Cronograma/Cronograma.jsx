import React, { useState, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import Button from "../Button"

import schemaCronograma from "./validation"
import axios from "../../services/axios"

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
        setValue(`cronograma[${mes}].niveis[${nivel}].progresso_planejado`, 0)
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
      <th key={indexMes}>{mes.mes_cronograma}</th>
    ))
  }

  const renderizarLinhas = () => {
    return fields[0]?.niveis.map((nivel, indexNivel) => (
      <tr key={indexNivel}>
        {renderizarColunas().map((coluna, indexMes) => (
          <td key={indexMes}>
            <input
              type="text"
              {...register(
                `cronograma[${indexMes}].niveis[${indexNivel}].progresso_planejado`,
              )}
              onBlur={(e) =>
                blurPorcentagem(e.target.value, indexMes, indexNivel)
              }
            />
          </td>
        ))}
      </tr>
    ))
  }

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
    } catch (error) {}
  }

  return (
    <form onSubmit={handleSubmit(atualizarCronograma)}>
      <div className="flex">
        <table>
          <thead>
            <tr>
              <th>Nível</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {fields[0]?.niveis.map((nivel, indexNivel) => (
              <tr key={indexNivel}>
                <td>{nivel.ordem_nivel}</td>
                <td>{nivel.nome_nivel}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="max-w-4xl overflow-auto">
          <table>
            <thead>
              <tr>{renderizarColunas()}</tr>
            </thead>
            <tbody>{renderizarLinhas()}</tbody>
          </table>
        </div>
      </div>

      {errors?.cronograma && <p>{errors.cronograma.message}</p>}
      <Button texto="teste" tipo="submit" />
    </form>
  )
}

export default Cronograma
