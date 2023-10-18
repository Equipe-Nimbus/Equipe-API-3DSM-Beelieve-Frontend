import React, { useState } from "react"
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
        <>
            <form onSubmit={handleSubmit(cadastrarUsuario)}>
                <div className="h-14 bg-gradient-to-t from-#FFFDF2-500 to-#FFF5C2-500">
                    <div className="rounded h-14 bg-gradient-to-t from-#FFFFFF-500 to-#F5F5FD-500 w-1/2">
                        <h1
                            className="font-bold text-center">
                            Cadastro de Usuário
                        </h1>

                        <div>
                            <label
                                htmlFor="nomeUsuario"
                                className="text-base font-medium text-on-light">
                                Nome Completo:
                            </label>
                            <input type="text" className="w-1/2 rounded" />

                            <label
                                htmlFor="cpfUsuario"
                                className="text-base font-medium text-on-light">
                                Cpf:
                            </label>
                            <input type="number" className="w-1/2 rounded" />
                        </div>

                        <div>
                            <label
                                htmlFor="emailUsuario"
                                className="text-base font-medium text-on-light">
                                Email:
                            </label>
                            <input type="text" className="w-1/3 rounded" />

                            <label
                                htmlFor="senhaUsuario"
                                className="text-base font-medium text-on-light">
                                Senha:
                            </label>
                            <input type="password" className="w-1/3 rounded" />
                            <label
                                htmlFor="cargoUsuario"
                                className="text-base font-medium text-on-light">
                                Cargo:
                            </label>
                            <input type="text" className="w-1/3 rounded" />
                        </div>
                        <Button
                            texto="Cadastrar"
                            tipo="submit"
                            className="rounded bg-primary50 p-2 text-lg font-semibold text-on-primary w-full"
                        />
                    </div>
                </div>
            </form>
        </>
    )
}

export default CadastroUsuario