import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import Button from "../Button"
import axios from "../../services/axios"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"
import schemaAtualizarUsuario from "./validation"
import InputMask from "react-input-mask";

import { BsPlayFill } from "react-icons/bs"

function AlterarUsuario() {
    const [usuario, setUsuario] = useState([])
    const navigate = useNavigate()
    const { idUsuario } = useParams()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaAtualizarUsuario),
        defaultValues: {
            nomeUsuario: usuario.nome,
        },
    })

    function updateFieldsWithDefaults(fieldsDefaults, data) {
        for (const field in fieldsDefaults) {
            if (!data[field] && fieldsDefaults[field] !== null) {
                data[field] = fieldsDefaults[field];
            }
        }
    }

    const gerarJsonUsuario = (data) => {
        const usuario = {
            id_usuario: data.idUsuario,
            nome: data.nomeUsuario,
            email: data.emailUsuario,
            senha: data.senhaUsuario,
            telefone: data.telefoneUsuario,
            departamento: data.departamentoUsuario,
            cargo: data.cargoUsuario
        }

        return usuario
    }

    const gerarJsonDeleteUsuario = (data) => {
        const usuario = {
            id_usuario: data.id_usuario,
            is_active: false
        }

        return usuario
    }

    async function getUsuario() {
        try {
            await axios.get(`/usuario/listar/${idUsuario}`).then((response) => {
                const data = response.data
                setUsuario(data)

                setValue("nomeUsuario", data.nome);
                setValue("emailUsuario", data.email);
                setValue("senhaUsuario", data.senha);
                setValue("confirmarSenhaUsuario", data.senha);
                if (data && data.telefone) {
                    setValue("telefoneUsuario", data.telefone);
                }
                setValue("departamentoUsuario", data.departamento)
                setValue("cargoUsuario", data.cargo);
            })
        } catch (erro) {
            console.log('aaaaa')
        }
    }

    const alterarUsuario = async (data) => {
        const userDefaults = {
            nomeUsuario: usuario.nome,
            emailUsuario: usuario.email,
            senhaUsuario: usuario.senha,
            telefoneUsuario: usuario.telefone,
            idUsuario: usuario.id_usuario
        };

        updateFieldsWithDefaults(userDefaults, data);

        console.log(data)
        const usuarioJson = gerarJsonUsuario(data)

        await axios.put(`/usuario/atualizar`, usuarioJson).then((response) => {
            if (response.status === 200) {
                Swal.fire({
                    title: "Dados atualizados com sucesso!",
                    icon: "success",
                    confirmButtonColor: "#132431",
                    allowOutsideClick: false,
                    allowEscapeKey: false

                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/usuarios")
                    }
                })
            }
            else {
                Swal.fire('Erro ao realizar a alteração do usuário :(', '', 'error');
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

    const handleExcluirUsuarioClick = async () => {
        const confirmacao = await Swal.fire({
            icon: "warning",
            title: "Cuidado!",
            text: "Tem certeza que deseja excluir esse usuário?",
            showDenyButton: true,
            confirmButtonText: "Sim",
            denyButtonText: `Não`,
        })

        if (confirmacao.isConfirmed) {
            const usuarioJson = gerarJsonDeleteUsuario(usuario)
            console.log(usuarioJson)
            try {
                await axios.put(`/usuario/deletar`, usuarioJson)
                Swal.fire("Excluído com sucesso!", "", "success")
                navigate("/usuarios")
            } catch (error) {
                console.error("Erro ao excluir o usuário:", error)
            }
        }
    }

    useEffect(() => {
        getUsuario()
    }, [])

    return (
        <div>
            <div className="bg-bg100 m-5 rounded-md p-7 drop-shadow-md">
                <Button
                    tipo="submit"
                    texto="Excluir usuário"
                    iconeOpcional={BsPlayFill}
                    iconeTamanho="20px"
                    onClick={handleExcluirUsuarioClick}
                    className="mr-5 mb-3 flex h-2/6 items-center gap-1 rounded-[10px] bg-primary51 p-2 text-lg font-semibold text-on-primary"
                />
                <hr className="border-n90" />
                <form onSubmit={handleSubmit(alterarUsuario)}>
                    <input type="hidden" id="idUsuario" defaultValue={usuario.id_usuario} />
                    <div className="mt-4 flex flex-col">
                        <h1 className="font-semibold text-2xl text-center">Alteração de Dados Usuario</h1>
                    </div>
                    <div className="mt-5 flex flex-col">
                        <label
                            htmlFor="nomeUsuario"
                            className="text-base font-medium text-on-light"
                        >
                            Nome Completo:
                        </label>
                        <input
                            type="text"
                            className="w-1/2 rounded-md border border-n70 p-1"
                            id="nomeUsuario"
                            {...register(`nomeUsuario`)}
                        />
                        {errors.nomeUsuario && (
                            <label
                                htmlFor="nomeUsuario"
                                className="text-sm font-light text-error"
                            >
                                {errors.nomeUsuario.message}
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
                            {...register("emailUsuario")}
                        />
                        {errors.emailUsuario && (
                            <label
                                htmlFor="emailUsuario"
                                className="text-sm font-light text-error"
                            >
                                {errors.emailUsuario.message}
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
                            {...register("senhaUsuario")}
                        />
                        {errors.senhaUsuario && (
                            <label
                                htmlFor="senhaUsuario"
                                className="text-sm font-light text-error"
                            >
                                {errors.senhaUsuario.message}
                            </label>
                        )}
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label
                            htmlFor="confirmarSenhaUsuario"
                            className="text-base font-medium text-on-light">
                            Confirme a Senha:
                        </label>
                        <input
                            type="password"
                            className="w-1/2 rounded-md border border-n70 p-1"
                            {...register("confirmarSenhaUsuario")}
                        />
                        {errors.confirmarSenhaUsuario && (
                            <label
                                htmlFor="confirmarSenhaUsuario"
                                className="text-sm font-light text-error"
                            >
                                {errors.confirmarSenhaUsuario.message}
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
                        <InputMask
                            mask="(99) 99999-9999"
                            maskChar="_"
                            className="w-1/2 rounded-md border border-n70 p-1"
                            {...register("telefoneUsuario")}
                        />
                        {errors.telefoneUsuario && (
                            <label
                                htmlFor="telefoneUsuario"
                                className="text-sm font-light text-error"
                            >
                                {errors.telefoneUsuario.message}
                            </label>
                        )}
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
                            className="rounded-[10px] bg-primary50 p-2 text-lg font-semibold text-on-primary"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AlterarUsuario