import React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from "react-router-dom"
import InputMask from "react-input-mask";

import axios from "../../services/axios"

function FormVisualizarUsuario() {
    return (
        <form onSubmit={handleSubmit(visualizarUsuario)}>
            <div className="mt-4 flex flex-col">
                <h1
                    className="font-semibold text-2xl text-center">
                    Dados do Usuário
                </h1>
                <div className="mt-8 flex flex-col">
                    <label
                        htmlFor="nomeUsuario"
                        className="text-base font-medium text-on-light">
                        Nome Completo:
                    </label>
                    <input
                        type="text"
                        className="w-1/2 rounded-md border border-n70 p-1"
                        defaultValue={usuario.nome}
                        disabled
                    />
                </div>
                <div className="mt-4 flex flex-col">
                    <label
                        htmlFor="emailUsuario"
                        className="text-base font-medium text-on-light">
                        Email:
                    </label>
                    <input
                        type="text"
                        className="w-1/2 rounded-md border border-n70 p-1"
                        defaultValue={usuario.email}
                        disabled
                    />
                </div>
                <div className="mt-4 flex flex-col">
                    <label
                        htmlFor="cpfUsuario"
                        className="text-base font-medium text-on-light">
                        CPF:
                    </label>
                    <InputMask
                        mask="999.999.999-99"
                        maskChar=" "
                        className="w-1/2 rounded-md border border-n70 p-1"
                        defaultValue={usuario.cpf}
                        disabled
                    />
                </div>

                <div className="justify-between flex-col">
                    <div className="mt-4 flex flex-col">
                        <label
                            htmlFor="telefoneUsuario"
                            className="text-base font-medium text-on-light">
                            Telefone:
                        </label>
                        <InputMask
                            mask="(99) 99999-9999"
                            maskChar="_"
                            className="w-1/2 rounded-md border border-n70 p-1"
                            defaultValue={usuario.telefone}
                            disabled
                        />
                    </div>
                </div>
                <div className="justify-between flex-col">
                    <div className="mt-4 flex flex-col">
                        <label
                            htmlFor="departamentoUsuario"
                            className="text-base font-medium text-on-light">
                            Departamento:
                        </label>
                        <input
                        type="text"
                        className="w-1/2 rounded-md border border-n70 p-1"
                        defaultValue={usuario.departamento}
                        disabled
                    />
                    </div>
                </div>
                <div className="mt-4 flex flex-col">
                    <label
                        htmlFor="cargoUsuario"
                        className="text-base font-medium text-on-light">
                        Cargo:
                    </label>
                    <input
                        type="text"
                        className="w-1/2 rounded-md border border-n70 p-1"
                        defaultValue={usuario.cargo}
                        disabled
                    />
                </div>
            </div>
        </form>
    )
}

export default FormVisualizarUsuario