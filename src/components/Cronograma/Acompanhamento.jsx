import React, { useState, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"

import Button from "../Button"

import axios from "../../services/axios"

function Acompanhamento({ idProjeto }) {
  const [cronograma, setCronograma] = useState({})

  const { register, control, setValue } = useForm({
    defaultValues: {
      cronograma: cronograma.lista_cronograma,
    },
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
              progresso_real: String(nivel.progresso_real) + "%",
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
  console.log(cronograma)

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
                `cronograma[${indexMes}].niveis[${indexNivel}].progresso_real`,
              )}
              className="text-center"
            />
          </td>
        ))}
      </tr>
    ))
  }

  return (
    <>
      <h1 className="ml-5 text-xl font-semibold text-on-light">
        Acompanhamento de progresso
      </h1>
      <hr className="border-n90"></hr>
        <div className="mt-5 ml-5 flex justify-start">
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
    </>
  )

}

export default Acompanhamento
