import { useState, useEffect } from "react"
import axios from "../services/axios"

import { LuUsers } from "react-icons/lu";
import { TbUsersGroup } from "react-icons/tb";


function Colaboradores({ idProjeto }){
    const [visualizacaoAtual, setVisualizacaoAtual] = useState("Líderes")
    const mudarVisualizacao = (valor) => {
        const view = valor
        setVisualizacaoAtual(view)
    }

    const [colaboradores, setColaboradores] = useState()

    const getColaboradores = async () => {
        await axios.get(`/usuario/atribuidos/projeto/${idProjeto}`)
        .then((response) => {
            const colaboradores = response.data
            setColaboradores(colaboradores)
        })
    }
    useEffect( () => {
        getColaboradores()
    }, [idProjeto])


    return (
        <>
        <div className="mx-5 mb-2 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-on-light">
            {visualizacaoAtual}
            </h3>
            <div className="flex cursor-pointer">
            <div
                className={
                visualizacaoAtual === "Líderes"
                    ? "flex items-center gap-1 rounded-l-lg border-2 border-n90 bg-primary91 p-2 font-semibold text-primary20"
                    : "flex items-center gap-1 rounded-l-lg border-2 border-n90 p-2 text-n40"
                }
                onClick={(e) => mudarVisualizacao("Líderes")}
            >
                {" "}
                {visualizacaoAtual === "Líderes" ? (
                <LuUsers size={20} color="#675600" />
                ) : (
                <LuUsers size={20} color="#666666" />
                )}
                <span>Líderes</span>
            </div>
            <div
                className={
                visualizacaoAtual === "Analistas"
                    ? "flex items-center gap-1 rounded-r-lg border-2 border-n90 bg-primary91 p-2 font-semibold text-primary20"
                    : "flex items-center gap-1 rounded-r-lg border-2 border-n90 p-2 text-n40"
                }
                onClick={(e) => mudarVisualizacao("Analistas")}
            >
                {visualizacaoAtual === "Analistas" ? (
                <TbUsersGroup size={20} color="#675600" />
                ) : (
                <TbUsersGroup size={20} color="#666666" />
                )}
                <span>Analistas</span>
            </div>
            </div>
        </div>
        <hr className="border-n90"></hr>

        {visualizacaoAtual === 'Líderes' && (
            <table className="w-full mt-5">
                <thead className="bg-primary98 p-10 text-base uppercase text-center">
                    <tr>
                        <th className="w-1/12 py-3">Nível</th>
                        <th className="w-3/12 py-3 text-left">Descrição</th>
                        <th className="w-3/12 py-3 text-left">Nome</th>
                        <th className="w-3/12 py-3 text-left">Email</th>
                        <th className="w-2/12 py-3 pr-5">Cargo</th>		
                    </tr>
                </thead>
                <tbody>
                    {colaboradores?.lideresAtribuidos.map((lider, index) => (
                        <tr key={index} className="border-b border-n90">
                            <td className="py-3 text-lg font-semibold text-center">
                                {lider.ordemProjeto}
                            </td>
                            <td className="text-lg text-left">
                                {lider.descricaoProjeto}
                            </td>
                            <td className="text-lg text-left">
                                {lider.nomeUsuario}
                            </td>
                            <td className="text-lg text-left">
                                {lider.emailUsuario}
                            </td>
                            <td className="text-lg text-center pr-5">
                                {lider.cargoUsuario}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}

        {visualizacaoAtual === 'Analistas' && (
            <table className="w-2/3 mt-5">
                <thead className="bg-primary98 p-10 text-base uppercase text-center">
                    <tr>
                        <th className="pl-10 py-3 text-left">Nome</th>
                        <th className=" py-3 text-left">Email</th>	
                    </tr>
                </thead>
                <tbody>
                    {colaboradores?.analistasAtribuidos.map((analista, index) => (
                        <tr key={index} className="border-b border-n90">
                            <td className="pl-10 py-3 text-lg font-semibold">
                                {analista.nomeAnalista}
                            </td>
                            <td className="text-lg">
                                {analista.emailAnalista}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
        </>
    )
}

export default Colaboradores