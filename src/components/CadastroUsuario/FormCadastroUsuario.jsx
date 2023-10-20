import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import schemaCadastroUsuario from "./validation"
import Swal from 'sweetalert2'

import Button from "../Button"
import axios from "../../services/axios"

function CadastroUsuario() {
    const [nome, setNome] = useState('')
    const [cpf, setCPF] = useState('')
    const [cargo, setCargo] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const cadastrarUsuario = async (data) => {
        const usuario = gerarJsonUsuario(data)

        await axios.post("/usuario/cadastrar", usuario).then((response) => {
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

                <div className="justify-between mt-1.5 items-center flex-col">
                    <label
                        htmlFor="nomeUsuario"
                        className="text-base font-medium text-on-light">
                        Nome Completo:
                    </label>
                    <input type="text" className="w-1/2 rounded" />

                    <label
                        htmlFor="emailUsuario"
                        className="text-base font-medium text-on-light">
                        Email:
                    </label>
                    <input type="number" className="w-1/2 rounded" />
                </div>

                <div className="justify-between items-center flex-col">
                    <label
                        htmlFor="cpfUsuario"
                        className="text-base font-medium text-on-light">
                        CPF:
                    </label>
                    <input type="text" className="w-1/3 rounded" />

                    <label
                        htmlFor="senhaUsuario"
                        className="text-base font-medium text-on-light">
                        Senha:
                    </label>
                    <input type="password" className="w-1/3 rounded" />
                    <label
                        htmlFor="senhaUsuario"
                        className="text-base font-medium text-on-light">
                        Confirme a Senha:
                    </label>
                    <input type="password" className="w-1/3 rounded" />
                </div>
                <div className="justify-between items-center flex-col">
                    <label
                        htmlFor="cargoUsuario"
                        className="text-base font-medium text-on-light">
                        Cargo:
                    </label>
                    <input type="text" className="w-1/2 rounded" />

                    <label
                        htmlFor="telefoneUsuario"
                        className="text-base font-medium text-on-light">
                        Telefone:
                    </label>
                    <input type="text" className="w-1/2 rounded" /> 
                </div>
                <Button
                    texto="Cadastrar"
                    tipo="submit"
                    className="rounded bg-primary50 p-2 text-lg font-semibold text-on-primary w-full"
                />
            </div>
        </form>
    )
}

export default CadastroUsuario