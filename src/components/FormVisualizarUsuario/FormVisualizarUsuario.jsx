import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "../../services/axios"
import Button from "../Button"
import { useNavigate } from "react-router-dom"

function FormVisualizarUsuario() {
    const [usuario, setUsuario] = useState([])
    const { idUsuario } = useParams()
    const navigate = useNavigate()
    const { setValue } = useForm({})

    async function getUsuario() {
        try {
            await axios.get(`/usuario/listar/${idUsuario}`).then((response) => {
                const data = response.data
                setUsuario(data)
                console.log(data)

                setValue("nomeUsuario", data.nome);
                setValue("emailUsuario", data.email);
                setValue("senhaUsuario", data.senha);
                setValue("cpfUsuario", data.cpf);
                setValue("confirmarSenhaUsuario", data.senha);
                if (data && data.telefone) {
                    setValue("telefoneUsuario", data.telefone);
                }
                setValue("departamentoUsuario", data.departamento)
                setValue("cargoUsuario", data.cargo);
            })
        } catch (erro) {
            console.log(erro)
        }
    }

    useEffect(() => {
        getUsuario()
    }, [])

    return (
        <div className="bg-bg100 m-5 rounded-md p-7 drop-shadow-md">
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
                    <input
                        type="text"
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
                        <input
                            type="text"
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
            <div className="mt-5 flex justify-end gap-5">
                <Button
                    texto="Sair"
                    tipo="button"
                    className="rounded-[10px] border-2 border-bg22 p-2 text-lg font-semibold text-bg22"
                    onClick={() => navigate("/usuarios")}
                />
            </div>
        </div>
    )
}

export default FormVisualizarUsuario