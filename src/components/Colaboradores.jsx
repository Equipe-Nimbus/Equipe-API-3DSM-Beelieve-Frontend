import { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/authContext";
import Swal from "sweetalert2";
import axios from "../services/axios"

import Button from "./Button";
import { LuUsers } from "react-icons/lu";
import { TbUsersGroup } from "react-icons/tb";
import { FiMinus } from "react-icons/fi"


function Colaboradores({ idProjeto }){
    const { user } = useAuth()
    const { register, handleSubmit, setValue } = useForm()
    const [atualizar, setAtualizar] = useState(false)

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

    const [analistasAtribuicao, setAnalistasAtribuicao] = useState()
    
    const getAnalistasAtribuicao = async () => {
        await axios.get(`usuario/listar/atribuicao`)
        .then((response) => {
            const analistasAtribuicao = response.data.Analista
            setAnalistasAtribuicao(analistasAtribuicao)
        })
    }

    useEffect( () => {
        getColaboradores()

        if(user?.cargo !== 'Analista'){
            getAnalistasAtribuicao()
        }

        if(atualizar){
            setAtualizar(false)
        }

    }, [idProjeto, atualizar])

    const atribuirAnalista = async (data) => {
        const dadosAtribuicaoAnalista = {
            id_analista: data.id_analista,
            id_projeto: idProjeto
        }

        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-start",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })

        const analistaJaAtribuido = colaboradores.analistasAtribuidos.some(analista => analista.idAnalista === parseInt(data.id_analista))
        if(!analistaJaAtribuido){
            //console.log(dadosAtribuicaoAnalista)
            await axios.post(`/projeto/atribuir/analista`, dadosAtribuicaoAnalista)
            .then(() => {
                Toast.fire({
                    icon: "success",
                    title: "Analista atribuido."
                  })
                setValue('id_analista', "")
                setAtualizar(true)
            })
        }
        else {
              Toast.fire({
                icon: "error",
                title: "O analista selecionado já está atribuido ao projeto."
              })
        }
    }

    const desatribuirAnalista = async(idAnalista) => {
        const desatribuicaoAnalista = {
            id_analista: idAnalista,
            id_projeto: parseInt(idProjeto)
        }

        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-start",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        })

        try {
            await axios.put("/projeto/desatribuir/analista", desatribuicaoAnalista).then(() => {
                Toast.fire({
                    icon: "success",
                    title: "Analista desatribuído."
                  })
                setAtualizar(true)
            })
        } catch (error) {
            console.error(error)
            Toast.fire({
                icon: "error",
                title: "Ocorreu um erro ao desatribuir o analista."
              })
        }
    }

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
            <>
                {
                    user?.cargo !== 'Analista' && (
                        <div className="ml-4 mt-5 text-lg">
                            <form onSubmit={handleSubmit(atribuirAnalista)}>
                                <label className='font-medium'>Atribuir um novo analista: </label>
                                <select className='border p-2 rounded-lg border-n90' {...register('id_analista')}>
                                    <option value="" selected disabled>Selecione um analista</option>
                                    {analistasAtribuicao.map((analista, index) => (
                                        <option key={index} value={analista.id_usuario}>
                                        {analista.nome}
                                        </option>
                                    ))}
                                </select>
                                <Button texto="Confirmar" tipo="submit" className="p-1 ml-5 font-medium bg-primary50 rounded-lg"/>
                            </form>
                        </div>
                    )
                }
                
                <table className="w-2/3 mt-5">
                    <thead className="bg-primary98 p-10 text-base uppercase text-center">
                        <tr>
                            <th className="w-2/5 pl-10 py-3 text-left">Nome</th>
                            <th className="w-2/5 text-left">Email</th>
                            <th className="w-1/5 text-center">Ação</th>		
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
                                <td>
                                    <div className="flex items-center justify-center">
                                        <Button
                                        iconeOpcional={FiMinus}
                                        tipo="button"
                                        onClick={() => desatribuirAnalista(analista.idAnalista)}
                                        className="m-2 rounded-full bg-n40"
                                        iconeTamanho="24px"
                                        iconeCor="white"
                                        />
                                        <span className="text-n40 font-medium">Desatribuir</span>
                                    </div>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        )}
        </>
    )
}

export default Colaboradores