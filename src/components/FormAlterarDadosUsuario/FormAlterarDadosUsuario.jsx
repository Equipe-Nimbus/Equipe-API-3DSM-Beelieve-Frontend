import React, { useEffect, useState } from "react"
import Button from "./Button"

import { BsPlayFill } from "react-icons/bs"

function AlterarUsuario() {
    return (
        <form>
            <Button
                texto="Excluir usuário"
                iconeOpcional={BsPlayFill}
                iconeTamanho="20px"
                className="mr-5 flex h-2/6 items-center gap-1 rounded-[10px] bg-primary51 p-2 text-lg font-semibold text-on-primary"
            />
            <hr className="border-n90" />

            <h1 className="tex-center font-black">Alteração de Dados Usuario</h1>
            <div className="mt-4 flex flex-col">
                <label
                    htmlFor="nomeUsuario"
                    className="text-base font-medium text-on-light"
                >
                    Nome Completo:
                </label>
                <input
                    type="text"
                    id="nomeUsuario"
                    className="w-1/2 rounded-md border border-n70 p-1"
                    {...register("nomeProjeto")}
                    onBlur={(e) => {
                        handlerBlur(e)
                    }}
                />
                {errors?.nomeUsuario && (
                    <label
                        htmlFor="nomeUsuario"
                        className="text-sm font-light text-error"
                    >
                        {errors.nomePUsuario.message}
                    </label>
                )}
            </div>
            <div className="mt-4 flex flex-col">
                <label
                    htmlFor="emailUsuario"
                    className="text-base font-medium text-on-light"
                >
                    Email:
                </label>
                <input
                    type="text"
                    className="w-1/2 rounded-md border border-n70 p-1"
                    {...register("usuarioEmail")}
                />
                {errors?.usuarioEmail && (
                    <label
                        htmlFor="emailUsuario"
                        className="text-sm font-light text-error"
                    >
                        {errors.usuarioEmail.message}
                    </label>
                )}
            </div>
            <div className="mt-4 flex flex-col">
                <label
                    htmlFor="senhaUsuario"
                    className="text-base font-medium text-on-light"
                >
                    Senha:
                </label>
                <input
                    type="password"
                    className="w-1/2 rounded-md border border-n70 p-1"
                    {...register("usuarioSenha")}
                />
                {errors?.usuarioSenha && (
                    <label
                        htmlFor="senhaUsuario"
                        className="text-sm font-light text-error"
                    >
                        {errors.usuarioSenha.message}
                    </label>
                )}
            </div>
            <div className="mt-4 flex flex-col">
                <label
                    htmlFor="senhaConfirmeUsuario"
                    className="text-base font-medium text-on-light"
                >
                    Confirmar Senha:
                </label>
                <input
                    type="password"
                    className="w-1/2 rounded-md border border-n70 p-1"
                    {...register("usuarioSenha")}
                />
                {errors?.usuarioConfirmeSenha && (
                    <label
                        htmlFor="senhaConfirmeUsuario"
                        className="text-sm font-light text-error"
                    >
                        {errors.usuarioConfirmeSenha.message}
                    </label>
                )}
            </div>
            <div className="mt-4 flex flex-col">
                <label
                    htmlFor="telefoneUsuario"
                    className="text-base font-medium text-on-light"
                >
                    Telefone:
                </label>
                <input
                    type="number"
                    className="w-1/2 rounded-md border border-n70 p-1"
                    {...register("usuarioTelefone")}
                />
                {errors?.usuarioTelefone && (
                    <label
                        htmlFor="telefoneUsuario"
                        className="text-sm font-light text-error"
                    >
                        {errors.usuarioTelefone.message}
                    </label>
                )}
            </div>
            <div className="mt-4 flex flex-col">
                <label
                    htmlFor="senhaConfirmeUsuario"
                    className="text-base font-medium text-on-light"
                >
                    Confirmar Senha:
                </label>
                <select className="" name="cargoUsuario" id="" required
                    value="Cargo">
                    <option value="selecione" selected>Selecione</option>
                    <option value="EngenheiroChefe">Engenheiro Chefe</option>
                    <option value="LiderProjeto">Líder de Projeto</option>
                </select>
            </div>
        </form>

    )
}

export default AlterarUsuario