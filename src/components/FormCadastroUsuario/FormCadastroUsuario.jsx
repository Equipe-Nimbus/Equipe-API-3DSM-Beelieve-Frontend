import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import schemaCadastroUsuario from "./validation"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"

import Button from "../Button"
import axios from "../../services/axios"

function CadastroUsuario() {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({

    })

    const gerarJsonUsuario = (data) => {
        const usuario = {
            nome: data.nomeUsuario,
            email: data.emailUsuario,
            cpf_usuario: data.cpfUsuario,
            senha: data.senhaUsuario,
            confirmar_senha_usuario: data.confirmarSenhaUsuario,
            telefone_usuario: data.telefoneUsuario,
            cargo: data.cargoUsuario
        }

        return usuario
    }

    const cadastrarUsuario = async (data) => {
        const usuarioJson = gerarJsonUsuario(data)

        await axios.post("/usuario/cadastrar", usuarioJson).then((response) => {
            if (response.status === 200) {
                Swal.fire({
                    title: "Cadastro realizado com sucesso!",
                    icon: "success",
                    confirmButtonColor: "#132431",
                    allowOutsideClick: false,
                    allowEscapeKey: false

                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/usuario")
                    }
                })
            }
            else {
                Swal.fire('Erro ao realizar o cadastro do usuário :(', '', 'error');
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(cadastrarUsuario)}>
            <hr className="border-n90" />
            <div className="mt-4 flex flex-col">
                <h1
                    className="font-bold text-center">
                    Cadastro de Usuário
                </h1>

                <div className="justify-between mt-1.5 flex-col">
                    <label
                        htmlFor="nomeUsuario"
                        className="text-base font-medium text-on-light">
                        Nome Completo:
                    </label>
                    <input
                        type="text"
                        className="w-1/2 rounded-md border border-n70 p-1"
                        {...register("nomeUsuario")}
                    />
                </div>
                <div className="justify-between flex-col">
                    <label
                        htmlFor="emailUsuario"
                        className="text-base font-medium text-on-light">
                        Email:
                    </label>
                    <input
                        type="text"
                        className="w-1/2 rounded-md border border-n70 p-1"
                        {...register("emailUsuario")}
                    />
                </div>
                <div className="justify-between items-center flex-col">
                    <label
                        htmlFor="cpfUsuario"
                        className="text-base font-medium text-on-light">
                        CPF:
                    </label>
                    <input
                        type="text"
                        className="w-1/2 rounded-md border border-n70 p-1"
                        {...register("cpfUsuario")}
                    />
                </div>
                <div className="justify-between flex-col">
                    <label
                        htmlFor="senhaUsuario"
                        className="text-base font-medium text-on-light">
                        Senha:
                    </label>
                    <input
                        type="text"
                        className="w-1/2 rounded-md border border-n70 p-1"
                        {...register("senhaUsuario")}
                    />
                </div>
                <div className="justify-between flex-col">
                    <label
                        htmlFor="confirmarSenhaUsuario"
                        className="text-base font-medium text-on-light">
                        Confirme a Senha:
                    </label>
                    <input
                        type="text"
                        className="w-1/2 rounded-md border border-n70 p-1"
                        {...register("confirmarSenhaUsuario")}
                    />
                </div>
                <div className="justify-between flex-col">
                    <div className="mt-4 flex flex-col">
                        <label
                            htmlFor="telefoneUsuario"
                            className="text-base font-medium text-on-light">
                            Telefone:
                        </label>
                        <input
                            type="text"
                            className="w-1/2 rounded-md border border-n70 p-1"
                            {...register("telefoneUsuario")}
                        />
                    </div>
                </div>
                <div className="justify-between flex-col">
                    <select className="" name="cargoUsuario" required {...register("cargoUsuario", { required: true })}>
                        <option value="EngenheiroChefe">Engenheiro Chefe</option>
                        <option value="LiderProjeto">Líder de Projeto</option>
                    </select>
                </div>
                <div className="mt-5 flex justify-end gap-5">
                    <Button
                        texto="Cancelar"
                        tipo="button"
                        className="rounded-[10px] border-2 border-bg22 p-2 text-lg font-semibold text-bg22"
                        onClick={() => navigate("/usuarios")}
                    />
                    <Button
                        texto="Cadastrar"
                        tipo="submit"
                        className="rounded bg-primary50 p-2 text-lg font-semibold text-on-primary w-full"
                    />
                </div>
            </div>
        </form>
    )
}

export default CadastroUsuario