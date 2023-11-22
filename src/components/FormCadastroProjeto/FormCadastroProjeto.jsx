import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import IntlCurrencyInput from "react-intl-currency-input"
import Swal from 'sweetalert2'

import schemaProjetoInicial from "./validation"
import TabelaWbs from "../TabelaWbs"
import Button from "../Button"
import LerExcel from "../LerExcel"

import axios from "../../services/axios"
import { formatarEstrutura } from "../../utils/formatarEstrutura"
import { formatacaoDinheiro } from "../../utils/formatacaoDinheiro"


function FormCadastroProjeto() {
  const [niveisExcel, setniveisExcel] = useState({})

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      valorHora: 0,
      prazoProjeto: null

    },
    resolver: yupResolver(schemaProjetoInicial),
  })

  const navigate = useNavigate()

  const [tabelaWBS, setTabelaWBS] = useState([
    {
      nivel: "1",
      descricao: "Objetivo Final",
    },
  ])

  useEffect(() => { }, [tabelaWBS])

  const gerarJsonProjeto = (data) => {
    const projeto = {
      nome_projeto: data.nomeProjeto,
      descricao_projeto: data.descricaoProjeto,
      valor_hora_projeto: data.valorHora,
      prazo_meses: data.prazoProjeto,
      ordem_projeto: 1,
      sub_projetos: [],
    }

    const projetoFormatado = formatarEstrutura(projeto, tabelaWBS)

    return projetoFormatado
  }

  const cadastrarProjeto = async (data) => {
    const projeto = gerarJsonProjeto(data)

    await axios.post("/projeto/cadastrar", projeto, {log:true}).then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Cadastro realizado com sucesso!",
          icon: "success",
          confirmButtonColor: "#132431",
          allowOutsideClick: false,
          allowEscapeKey: false

        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/projetos")
          }
        })
      }
      else {
        Swal.fire('Erro ao realizar o cadastro :(', '', 'error');
      }
    }).catch(error => {
		if (error.response.status === 400) {
			Swal.fire({
			  title: error.response.data,
			  icon: "error",
		  	  confirmButtonColor: "#132431",
              allowOutsideClick: false,
              allowEscapeKey: false
			})
		} else {
			Swal.fire('Erro ao realizar o cadastro :(', '', 'error');
		}	
  	})
  }

  const handlerBlur = (evento) => {
    let tabela = [...tabelaWBS]
    tabela[0].descricao = evento.target.value
    setTabelaWBS(tabela)
  }

  const handleInputDinheiro = (event, value, maskedValue) => {
    event.preventDefault()
    setValue("valorHora", value)
  }

  useEffect(() => {
    if (niveisExcel.subProjeto) {
      setValue("nomeProjeto", niveisExcel.subProjeto[0].descricao)
      let tabela = [...tabelaWBS]
      tabela = niveisExcel.subProjeto
      //console.log("TABELA", tabela)
      setTabelaWBS(tabela)
    }
  }, [niveisExcel])

  return (
    <form onSubmit={handleSubmit(cadastrarProjeto)}>
      <LerExcel niveisExcel={niveisExcel} setniveisExcel={setniveisExcel} />
      <hr className="border-n90" />
      <div className="mt-4 flex flex-col">
        <label
          htmlFor="nomeProjeto"
          className="text-base font-medium text-on-light"
        >
          Título do Projeto
        </label>
        <input
          type="text"
          id="nomeProjeto"
          className="w-1/2 rounded-md border border-n70 p-1"
          {...register("nomeProjeto")}
          onBlur={(e) => {
            handlerBlur(e)
          }}
        />
        {errors?.nomeProjeto && (
          <label
            htmlFor="nomeProjeto"
            className="text-sm font-light text-error"
          >
            {errors.nomeProjeto.message}
          </label>
        )}
      </div>
      <div className="mt-4 flex flex-col">
        <label
          htmlFor="descricaoProjeto"
          className="text-base font-medium text-on-light"
        >
          Descrição
        </label>
        <input
          type="text"
          className="w-1/2 rounded-md border border-n70 p-1"
          {...register("descricaoProjeto")}
        />
        {errors?.descricaoProjeto && (
          <label
            htmlFor="descricaoProjeto"
            className="text-sm font-light text-error"
          >
            {errors.descricaoProjeto.message}
          </label>
        )}
      </div>
      <div className="mt-4 flex flex-col">
        <label
          htmlFor="valorHora"
          className="text-base font-medium text-on-light"
        >
          Valor/Hora de trabalho
        </label>
        <IntlCurrencyInput
          type="text"
          {...register("valorHora")}
          className="w-1/2 rounded-md border border-n70 p-1"
          currency="BRL"
          config={formatacaoDinheiro}
          onChange={handleInputDinheiro}
        />
        {errors?.valorHora && (
          <label htmlFor="valorHora" className="text-sm font-light text-error">
            {errors.valorHora.message}
          </label>
        )}
      </div>
      <div className="mt-4 flex flex-col">
        <label
          htmlFor="prazoProjeto"
          className="text-base font-medium text-on-light"
        >
          Prazo (meses)
        </label>
        <input
          type="number"
          min={0}
          className="w-1/2 rounded-md border border-n70 p-1"
          {...register("prazoProjeto")}
        />
        {errors?.prazoProjeto && (
          <label
            htmlFor="prazoProjeto"
            className="text-sm font-light text-error"
          >
            {errors.prazoProjeto.message}
          </label>
        )}
      </div>
      <div className="mt-4 flex flex-col">
        <label
          htmlFor="prazoProjeto"
          className="text-base font-medium text-on-light"
        >
          Atribuição
        </label>
        <select className="w-1/2 border rounded border-n70 p-1" name="listaUsuario" required {...register("listaUsuario", { required: true })}>
          <option disabled selected value="">Engenheiro Chefe</option>
          <option value="usuarios"></option>
        </select>
      </div>
      <div className="ml-5 mt-5">
        <h2 className="text-xl font-semibold text-on-light">WBS</h2>
        <TabelaWbs
          tabelaWBS={tabelaWBS}
          setTabelaWBS={setTabelaWBS}
          edicaoNivel1={false}
        />
      </div>
      <div className="mt-5 flex justify-end gap-5">
        <Button
          texto="Cancelar"
          tipo="button"
          className="rounded-[10px] border-2 border-bg22 p-2 text-lg font-semibold text-bg22"
          onClick={() => navigate("/projetos")}
        />
        <Button
          texto="Confirmar"
          tipo="submit"
          className="rounded-[10px] bg-primary50 p-2 text-lg font-semibold text-on-primary"
        />
      </div>
    </form>
  )
}

export default FormCadastroProjeto
