/* eslint-disable no-unused-vars */
import React from "react"
import { useParams } from "react-router-dom"
import PropTypes from "prop-types"
import Button from "./Button"

import Swal from 'sweetalert2'
import axios from "../services/axios"

import { useNavigate } from "react-router-dom"
import { BsPlayFill } from "react-icons/bs"

function VisaoGeral({ nomeProjeto, descricaoProjeto, liderProjeto, projetoIniciado }) {
  const navigate = useNavigate()
  const dataAtual = new Date();
  const ano = dataAtual.getFullYear();
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
  const dataInicio = `${mes}-${ano}`;
  const { id } = useParams()

  const handleIniciarProjetoClick = async () => {
    try {
      const response = await axios.post(`/projeto/${id}/iniciarprojeto/${dataInicio}`);
      const dados = response.data;
    } catch (error) {
      console.error('Erro ao fazer a solicitação POST:', error);
    }
  }

  const handleExcluirProjetoClick = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Cuidado!',
      text: 'Tem certeza que deseja excluir esse projeto?',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Excluido com sucesso!', '', 'success')
      } else if (result.isDenied) {
      }
    });
  };

  return (
    <div className="m-5 rounded-md bg-bg100 p-4 drop-shadow-md">
      <h2 className="text-xl font-medium text-on-light">Visão Geral</h2>
      <hr className="border-n90" />

      <div className="my-3 flex justify-between">
        <div className="flex max-w-2xl flex-col gap-2">
          <h3 className="text-2xl font-medium text-complementary-20">
            {nomeProjeto}
          </h3>
          <p className="text-n20">
            {descricaoProjeto}
          </p>
        </div>
        <div className="flex flex-col gap-5">
          {projetoIniciado == null && (
            <>
              <Button
                texto="Iniciar projeto"
                iconeOpcional={BsPlayFill}
                iconeTamanho="20px"
                className="mr-5 flex h-2/6 items-center gap-1 rounded-[10px] bg-primary50 p-2 text-lg font-semibold text-on-primary"
                onClick={handleIniciarProjetoClick}
              />
              <Button
                texto="Excluir projeto"
                iconeOpcional={BsPlayFill}
                iconeTamanho="20px"
                onClick={handleExcluirProjetoClick}
                className="mr-5 flex h-2/6 items-center gap-1 rounded-[10px] bg-primary51 p-2 text-lg font-semibold text-on-primary"
              />
            </>
          )}
        </div>
      </div>

      <span className="mt-2 inline-grid grid-cols-2 gap-2 text-n20">
        <span className="font-semibold text-complementary-20">
          Líder do projeto:
        </span>
        <span>{liderProjeto}</span>
      </span>
      <br />
      <span className="mt-2 inline-grid grid-cols-2 gap-2 text-n20">
        <span className="font-semibold text-complementary-20">
          Info Relevante:
        </span>
        <span>{liderProjeto}</span>
      </span>
      <br />
      <span className="mt-2 inline-grid grid-cols-2 gap-2 text-n20">
        <span className="font-semibold text-complementary-20">
          Info Relevante:
        </span>
        <span>{liderProjeto}</span>
      </span>
    </div>
  )
}

VisaoGeral.propTypes = {
  nomeProjeto: PropTypes.string.isRequired,
  descricaoProjeto: PropTypes.string,
  liderProjeto: PropTypes.string
}

export default VisaoGeral
