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
        <div className="mx-5 mb-2 flex flex-col gap-2 items-center justify-between md:flex-row md:gap-0">
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
                <thead className="bg-primary98  text-base uppercase text-center block md:p-10 md:table-header-group">
                    <tr className="hidden md:table-row">
                        <th className="w-1/12 py-3">Nível</th>
                        <th className="w-3/12 py-3 text-left">Descrição</th>
                        <th className="w-3/12 py-3 text-left">Nome</th>
                        <th className="w-3/12 py-3 text-left">Email</th>
                        <th className="w-2/12 py-3 pr-5">Cargo</th>		
                    </tr>
                </thead>
                <tbody className="block md:table-row-group">
                    {colaboradores?.lideresAtribuidos.map((lider, index) => (
                        <tr key={index} className="block mr-4 border border-n70 even:bg-primary98 odd:bg-bg100 mb-0.5 md:table-row md:border-b md:border-t-0 md:border-x-0 md:even:bg-bg100">
                            <td className="py-3 text-lg font-semibold text-center border border-n70 block md:hidden">
                                {`Nível ${lider.ordemProjeto}`}
                            </td>
                            <td className="py-3 text-lg font-semibold text-center hidden md:table-cell">
                                {lider.ordemProjeto}
                            </td>
                            <td className="text-lg text-left pl-2 border border-n70 block  md:table-cell md:border-none md:pl-0">
                                {lider.descricaoProjeto}
                            </td>
                            <td className="text-lg text-left pl-2 border border-n70 block md:table-cell md:border-none md:pl-0">
                                {lider.nomeUsuario}
                            </td>
                            <td className="text-lg text-left pl-2 border border-n70 block md:table-cell md:border-none md:pl-0">
                                {lider.emailUsuario}
                            </td>
                            <td className="text-lg pl-2 border border-n70 block md:pr-5 md:table-cell md:border-none md:text-center">
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
                        <div className=" mt-5 text-lg">
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
                                <Button texto="Confirmar" tipo="submit" className="p-1 font-medium bg-primary50 rounded-lg md:ml-5 hover:bg-bg24"/>
                            </form>
                        </div>
                    )
                }
                
                <table className="w-full xl:w-2/3 mt-5">
                    <thead className="bg-primary98  text-base uppercase text-center block md:p-10 md:table-header-group">
                        <tr className="hidden md:table-row">
                            <th className="w-2/5 block md:pl-10 md:py-3 md:text-left md:table-cell">Nome</th>
                            <th className="w-2/5 block md:text-left md:table-cell">Email</th>
                            <th className="w-1/5 block md:text-center md:table-cell">Ação</th>		
                        </tr>
                    </thead>
                    <tbody className="block md:table-row-group">
                        {colaboradores?.analistasAtribuidos.map((analista, index) => (
                            <tr key={index} className="block mr-4 border border-n70 even:bg-primary98 odd:bg-bg100 mb-0.5 md:table-row md:border-b md:border-t-0 md:border-x-0 md:even:bg-bg100">
                                <td className="text-lg font-semibold relative block text-center border border-n70 md:table-cell md:text-left md:pl-10 md:py-3 md:border-none">
                                    {analista.nomeAnalista}
                                </td>
                                <td className="text-lg relative text-center border border-n70 block md:table-cell md:text-left md:border-none">
                                    {analista.emailAnalista}
                                </td>
                                <td className="relative border border-n70 block md:table-cell md:border-none">
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