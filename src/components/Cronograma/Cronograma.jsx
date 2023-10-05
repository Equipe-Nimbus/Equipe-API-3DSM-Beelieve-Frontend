import React, { useState, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import Button from "../Button"

import schemaCronograma from "./validation"
import axios from "../../services/axios"

function Cronograma({ tabela, idProjeto }) {
  const [dados, setDados] = useState({
    _id: 1,
    lista_cronograma: [
      {
        mes_cronograma: "Mes 1",
        ordem_mes_cronograma: 1,
        niveis: [
          {
            tipo: "projeto",
            ordem_nivel: "1",
            nome_nivel: "Beelieve",
            id_nivel: 1,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "subprojeto",
            ordem_nivel: "1.1",
            nome_nivel: "Frontend",
            id_nivel: 1,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "nivelsubprojeto",
            ordem_nivel: "1.1.1",
            nome_nivel: "Design",
            id_nivel: 1,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "subprojeto",
            ordem_nivel: "1.2",
            nome_nivel: "Backend",
            id_nivel: 2,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "nivelsubprojeto",
            ordem_nivel: "1.2.1",
            nome_nivel: "BD",
            id_nivel: 2,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
        ],
      },
      {
        mes_cronograma: "Mes 2",
        ordem_mes_cronograma: 2,
        niveis: [
          {
            tipo: "projeto",
            ordem_nivel: "1",
            nome_nivel: "Beelieve",
            id_nivel: 1,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "subprojeto",
            ordem_nivel: "1.1",
            nome_nivel: "Frontend",
            id_nivel: 1,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "nivelsubprojeto",
            ordem_nivel: "1.1.1",
            nome_nivel: "Design",
            id_nivel: 1,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "subprojeto",
            ordem_nivel: "1.2",
            nome_nivel: "Backend",
            id_nivel: 2,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "nivelsubprojeto",
            ordem_nivel: "1.2.1",
            nome_nivel: "BD",
            id_nivel: 2,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
        ],
      },
      {
        mes_cronograma: "Mes 3",
        ordem_mes_cronograma: 3,
        niveis: [
          {
            tipo: "projeto",
            ordem_nivel: "1",
            nome_nivel: "Beelieve",
            id_nivel: 1,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "subprojeto",
            ordem_nivel: "1.1",
            nome_nivel: "Frontend",
            id_nivel: 1,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "nivelsubprojeto",
            ordem_nivel: "1.1.1",
            nome_nivel: "Design",
            id_nivel: 1,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "subprojeto",
            ordem_nivel: "1.2",
            nome_nivel: "Backend",
            id_nivel: 2,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "nivelsubprojeto",
            ordem_nivel: "1.2.1",
            nome_nivel: "BD",
            id_nivel: 2,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
        ],
      },
      {
        mes_cronograma: "Mes 4",
        ordem_mes_cronograma: 4,
        niveis: [
          {
            tipo: "projeto",
            ordem_nivel: "1",
            nome_nivel: "Beelieve",
            id_nivel: 1,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "subprojeto",
            ordem_nivel: "1.1",
            nome_nivel: "Frontend",
            id_nivel: 1,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "nivelsubprojeto",
            ordem_nivel: "1.1.1",
            nome_nivel: "Design",
            id_nivel: 1,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "subprojeto",
            ordem_nivel: "1.2",
            nome_nivel: "Backend",
            id_nivel: 2,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "nivelsubprojeto",
            ordem_nivel: "1.2.1",
            nome_nivel: "BD",
            id_nivel: 2,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
        ],
      },
      {
        mes_cronograma: "Mes 5",
        ordem_mes_cronograma: 5,
        niveis: [
          {
            tipo: "projeto",
            ordem_nivel: "1",
            nome_nivel: "Beelieve",
            id_nivel: 1,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "subprojeto",
            ordem_nivel: "1.1",
            nome_nivel: "Frontend",
            id_nivel: 1,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "nivelsubprojeto",
            ordem_nivel: "1.1.1",
            nome_nivel: "Design",
            id_nivel: 1,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "subprojeto",
            ordem_nivel: "1.2",
            nome_nivel: "Backend",
            id_nivel: 2,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "nivelsubprojeto",
            ordem_nivel: "1.2.1",
            nome_nivel: "BD",
            id_nivel: 2,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
        ],
      },
      {
        mes_cronograma: "Mes 6",
        ordem_mes_cronograma: 6,
        niveis: [
          {
            tipo: "projeto",
            ordem_nivel: "1",
            nome_nivel: "Beelieve",
            id_nivel: 1,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "subprojeto",
            ordem_nivel: "1.1",
            nome_nivel: "Frontend",
            id_nivel: 1,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "nivelsubprojeto",
            ordem_nivel: "1.1.1",
            nome_nivel: "Design",
            id_nivel: 1,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "subprojeto",
            ordem_nivel: "1.2",
            nome_nivel: "Backend",
            id_nivel: 2,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
          {
            tipo: "nivelsubprojeto",
            ordem_nivel: "1.2.1",
            nome_nivel: "BD",
            id_nivel: 2,
            progresso_planejado: 0.0,
            progresso_real: 0.0,
          },
        ],
      },
    ],
  })

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cronograma: dados.lista_cronograma,
    },
    resolver: yupResolver(schemaCronograma),
  })

  const { fields } = useFieldArray({
    control,
    name: "cronograma",
  })

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

  const atualizarCronograma = (data) => {
    data.cronograma.forEach((mes) =>
      mes.niveis.forEach((nivel) => {
        if (nivel.progresso_planejado === "0") {
          nivel.progresso_planejado = 0
        } else {
          nivel.progresso_planejado = parseFloat(nivel.progresso_planejado.slice(0, -1),
          )
        }
      }),
    )
    
    dados.lista_cronograma = data.cronograma
    console.log("cronograma mudado: ", dados)
  }

  return (
    <form onSubmit={handleSubmit(atualizarCronograma)}>
      <table>
        <thead>
          <tr>
            <th>Nível</th>
            <th>Descrição</th>
            {fields.map((mes, indexMes) => (
              <th key={indexMes}>{mes.mes_cronograma}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields[0].niveis.map((nivel, indexNivel) => (
            <tr key={indexNivel}>
              <td>{nivel.ordem_nivel}</td>
              <td>{nivel.nome_nivel}</td>
              {fields.map((mes, indexMes) => (
                <td key={indexMes}>
                  <input
                    type="text"
                    {...register(
                      `cronograma[${indexMes}].niveis[${indexNivel}].progresso_planejado`,
                    )}
                    onBlur={(e) =>
                      blurPorcentagem(e.target.value, indexMes, indexNivel)
                    }
                  ></input>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {errors?.cronograma && <p>{errors.cronograma.message}</p>}
      <Button texto="teste" tipo="submit" />
    </form>
  )
}

export default Cronograma
