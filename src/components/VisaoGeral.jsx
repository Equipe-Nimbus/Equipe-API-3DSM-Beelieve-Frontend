/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import PropTypes from "prop-types"
import Button from "./Button"

import { BsPlayFill } from "react-icons/bs"

function VisaoGeral({nomeProjeto, descricaoProjeto, liderProjeto}) {
  const [projetoIniciado, setProjetoIniciado] = useState()

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
        {projetoIniciado &&
          <Button
            texto="Iniciar projeto"
            iconeOpcional={BsPlayFill}
            iconeTamanho="20px"
            className="mr-5 flex  h-1/6 items-center gap-1 rounded-[10px] bg-primary50 p-2 text-lg font-semibold text-on-primary"
          />
        }
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
