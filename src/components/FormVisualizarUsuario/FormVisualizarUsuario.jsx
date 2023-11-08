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
                        {...register("nomeUsuario")}
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
                        {...register("emailUsuario")}
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
                        {...register("cpfUsuario")}
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
                            {...register("telefoneUsuario")}
                        />
                        {errors.telefoneUsuario && (
                            <label className="text-sm font-light text-error">
                                {errors.telefoneUsuario.message}
                            </label>
                        )}
                    </div>
                </div>
                <div className="justify-between flex-col">
                    <div className="mt-4 flex flex-col">
                        <label
                            htmlFor="departamentoUsuario"
                            className="text-base font-medium text-on-light">
                            Departamento:
                        </label>
                        <select className="w-1/2 border rounded border-n70 p-1" {...register("departamentoUsuario")}>
                            <option disabled selected value="">Departamento</option>
                            <option value="Departamento 1">Departamento 1</option>
                            <option value="Departamento 2">Departamento 2</option>
                            <option value="Departamento 3">Departamento 3</option>
                            <option value="Departamento 4">Departamento 4</option>
                            <option value="Departamento 5">Departamento 5</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4 flex flex-col">
                    <label
                        htmlFor="cargoUsuario"
                        className="text-base font-medium text-on-light">
                        Cargo:
                    </label>
                    <select className="w-1/2 border rounded border-n70 p-1" name="cargoUsuario" required {...register("cargoUsuario", { required: true })}>
                        <option disabled selected value="">Cargo</option>
                        <option value="Gerente">Gerente</option>
                        <option value="Engenheiro Chefe">Engenheiro Chefe</option>
                        <option value="Lider de Pacote de Trabalho">Líder de Pacote de Trabalho</option>
                        <option value="Analista">Analista</option>
                    </select>
                </div>
            </div>
        </form>
    )
}

export default FormVisualizarUsuario