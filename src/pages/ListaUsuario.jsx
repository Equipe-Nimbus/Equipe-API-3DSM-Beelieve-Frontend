import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "../services/axios"
import { FiEye } from "react-icons/fi"

import Button from "../components/Button.jsx"

import { BsPlusCircle } from "react-icons/bs"

function ListaUsuario() {
    const [usuarios, setUsuarios] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getUsuarios()
    }, []) //array vazio indica que este useEffect será executado uma vez quando o componente for montado

    async function getUsuarios() {
        try {
            await axios.get("/usuario/listar").then((response) => {
                const data = response.data
                setUsuarios(data)
            })
        } catch (erro) { }
    }

    return (
        <div>
            <div className="m-5 rounded-md bg-bg100 p-7 drop-shadow-md">
                <Button
                    texto="Novo"
                    tipo="button"
                    iconeOpcional={BsPlusCircle}
                    iconeTamanho="20px"
                    className="mb-5 flex items-center  gap-0.5 rounded-[10px] bg-primary50 p-2 text-lg font-semibold text-on-primary"
                    onClick={() => navigate("/usuario/novo-usuario")}
                />
                <hr className="border-n90"></hr>
                <div className="mx-10 flex flex-row flex-wrap gap-10 my-10 gap-2 overflow-x-auto pb-5">
                    <table className="mx-auto rounded px-16">
                        <thead className="bg-primary98 p-10 text-base uppercase">
                            <tr>
                                <th class="px-12 py-3">Matricula</th>
                                <th class="px-12 py-3">Usuários</th>
                                <th class="px-12 py-3">Cargo</th>
                                <th class="px-12 py-3">Visualizar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((linha, index) => (
                                <tr key={index} className="border-b border-n90">
                                    <td className="px-4 py-3 text-lg font-semibold">
                                        {linha.matricula}
                                    </td>
                                    <td className="px-4 py-3 text-lg font-semibold">
                                        {linha.nome}
                                    </td>
                                    <td className="px-4 py-3 text-lg font-semibold">
                                        {linha.cargo}
                                    </td>
                                    <td className="px-4 py-3 text-lg font-semibold">
                                        
                                        <Link
                                            to={`/usuario/listar/${linha.id_usuario}`}
                                            state={{
                                                
                                            }}
                                        >
                                            {<Button
                                            iconeOpcional={FiEye}
                                            tipo="button"
                                            className="m-2 rounded-full"
                                            iconeTamanho="24px"
                                        />}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ListaUsuario
