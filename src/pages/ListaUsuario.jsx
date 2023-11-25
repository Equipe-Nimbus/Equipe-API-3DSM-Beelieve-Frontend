import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../contexts/authContext.jsx"

import axios from "../services/axios"

import InputPaginacao from "../components/InputPaginacao.jsx"
import Button from "../components/Button.jsx"

import { BsPlusCircle } from "react-icons/bs"
import { BiFilter } from "react-icons/bi";

function ListaUsuario() {
	const [usuarios, setUsuarios] = useState([])
	const navigate = useNavigate()
	const [departamentoFiltro, setDepartamentoFiltro] = useState()
	const [nomeFiltro, setNomeFiltro] = useState()
	const [cargoFiltro, setCargoFiltro] = useState()
	const [pagina, setPagina] = useState(0)
	const [totalPagina, setTotalPagina] = useState()
	const [render, setRender] = useState(0)

	const {user, autenticado} = useAuth()
	useEffect(() => {
		if(!autenticado){
			navigate("/")
		}
		else if(autenticado && user.cargo !== 'Gerente' && user.cargo !== 'Engenheiro Chefe'){
			navigate("/projetos")
		}
	})

	useEffect(() => {
		getUsuarios()
	}, []) //array vazio indica que este useEffect será executado uma vez quando o componente for montado

	useEffect(() => {
	}, [render])

	async function mudaInputPagina(valor) {
		console.log(valor)
		await mudaPagina(valor - 1)
	}

	function montaRequisicaoFiltragem() {
		let requisicao = ""
		if (departamentoFiltro != null && departamentoFiltro !== "") {
				requisicao = requisicao + "&departamento=" + departamentoFiltro
		}
		if (nomeFiltro != null && nomeFiltro !== "") {
				requisicao = requisicao + "&nome=" + nomeFiltro
		}

		if (cargoFiltro != null && cargoFiltro !== "") {
			requisicao = requisicao + "&cargo=" + cargoFiltro
		}


		return requisicao
	}

	async function getUsuarioFiltro(evento) {
		evento.preventDefault()
		let requisicao = montaRequisicaoFiltragem()
		requisicao = requisicao + `&page=0&size=10`
		console.log("Requisição: " + requisicao)
		try {
			await axios.get(`/usuario/lista/paginada?${requisicao}`).then((response) => {
				const data = response.data.content
				setUsuarios(data)
				const total = response.data.totalPages
				setTotalPagina(total)
				console.log(response)
			})
		} catch (erro) { }

	}

	async function mudaPagina(paginaMudada) {
		console.log("Pagina Mudada: " + paginaMudada)
		let requisicao = montaRequisicaoFiltragem()
		setPagina(paginaMudada)
		requisicao = requisicao + `&page=${paginaMudada}&size=10`
		console.log("Requisição: " + requisicao)
		try {
			await axios.get(`/usuario/lista/paginada?${requisicao}`).then((response) => {
				console.log(response)
				const data = response.data.content
				setUsuarios(data)
			})
		} catch (erro) { }
		setRender(render + 1)
	}

	async function getUsuarios() {
		try {
			await axios.get("/usuario/lista/paginada?page=0&size=10").then((response) => {
				//console.log(response)
				const data = response.data.content
				setUsuarios(data)
				const total = response.data.totalPages
				setTotalPagina(total)
			})
		} catch (erro) { }
	}

	return (
		<div className="m-5 rounded-md bg-bg100 p-7 drop-shadow-md">
			{user?.cargo !== 'Engenheiro Chefe' &&
			<Button
				texto="Novo"
				tipo="button"
				iconeOpcional={BsPlusCircle}
				iconeTamanho="20px"
				className="mb-5 flex items-center  gap-1.5 rounded-[10px] bg-primary50 p-2 text-lg font-semibold text-on-primary"
				onClick={() => navigate("/usuarios/novo-usuario")}
			/>}
			<hr className="border-n90"></hr>

			<details className="cursor-pointer my-5 text-n40 font-medium lg:hidden">
				<summary>Filtros</summary>
				<form
					className="flex flex-col mx-5 gap-4 my-5" onSubmit={(e) => { getUsuarioFiltro(e) }}
				>
					<input placeholder="Nome:" className="md:w-1/2 rounded-md border border-n70 p-0.5 pl-2" type="text" value={nomeFiltro} onChange={(e) => { setNomeFiltro(e.target.value) }} />
					<select className="md:w-1/2 rounded-md border border-n70 p-0.5" value={cargoFiltro} onChange={(e) => { setCargoFiltro(e.target.value) }}>
						<option selected value="">Cargo</option>
						<option value="Gerente">Gerente</option>
						<option value="EngenheiroChefe">Engenheiro Chefe</option>
						<option value="LiderDePacoteDeTrabalho">Líder de Pacote de Trabalho</option>
						<option value="Analista">Analista</option>
					</select>
					<select className="md:w-1/2 rounded-md border border-n70 p-0.5" value={departamentoFiltro} onChange={(e) => { setDepartamentoFiltro(e.target.value) }}>
						<option selected value="">Departamento</option>
						<option value="Departamento 1">Departamento 1</option>
						<option value="Departamento 2">Departamento 2</option>
						<option value="Departamento 3">Departamento 3</option>
						<option value="Departamento 4">Departamento 4</option>
						<option value="Departamento 5">Departamento 5</option>
					</select>

					<button className="w-24 border inline-flex border-n70 rounded-md justify-center items-center hover:bg-n90 duration-300" type="submit"><BiFilter/>Filtrar</button>
				</form>
			</details>

			<form
				className="hidden lg:flex justify-end mx-5 gap-4 my-5" onSubmit={(e) => { getUsuarioFiltro(e) }}
			>
				<input placeholder="Nome:" className="w-64 rounded-md border border-n70 p-0.5 pl-2" type="text" value={nomeFiltro} onChange={(e) => { setNomeFiltro(e.target.value) }} />
				<select className="w-48 rounded-md border border-n70 p-0.5" value={cargoFiltro} onChange={(e) => { setCargoFiltro(e.target.value) }}>
					<option selected value="">Cargo</option>
					<option value="Gerente">Gerente</option>
					<option value="Engenheiro_Chefe">Engenheiro Chefe</option>
					<option value="Lider_de_Pacote_de_Trabalho">Líder de Pacote de Trabalho</option>
					<option value="Analista">Analista</option>
				</select>
				<select className="w-48 rounded-md border border-n70 p-0.5" value={departamentoFiltro} onChange={(e) => { setDepartamentoFiltro(e.target.value) }}>
					<option selected value="">Departamento</option>
					<option value="Departamento 1">Departamento 1</option>
					<option value="Departamento 2">Departamento 2</option>
					<option value="Departamento 3">Departamento 3</option>
					<option value="Departamento 4">Departamento 4</option>
					<option value="Departamento 5">Departamento 5</option>
				</select>

				<button className="w-24 border inline-flex border-n70 rounded-md justify-center items-center hover:bg-n90 duration-300" type="submit"><BiFilter/>Filtrar</button>
			</form>
			
			<div className="flex flex-col gap-20 overflow-x-auto pb-5">
				<table className="w-12/12">
					<thead className="bg-primary98 text-base uppercase text-center block md:p-10 md:table-header-group">
						<tr className="hidden md:table-row">
							<th className="w-2/12 py-3 block md:table-cell">Matricula</th>
							<th className="w-4/12 py-3 block md:table-cell md:text-left">Nome</th>
							<th className="w-4/12 py-3 block md:table-cell md:text-left">Cargo</th>
							<th className="w-2/12 py-3 block md:table-cell md:pr-2">Departamento</th>	
						</tr>
					</thead>
					<tbody className="block md:table-row-group">
						{usuarios.map((linha, index) => (
							<tr key={index} className="block mr-4 border border-n70 even:bg-primary98 odd:bg-bg100 mb-0.5 md:table-row md:border-b md:border-t-0 md:border-x-0 md:even:bg-bg100">
								<td className="text-lg font-semibold block relative px-2 border-b md:hidden">
									{`Matrícula ${linha.id_usuario}`}
								</td>
								<td className="text-lg font-semibold hidden relative px-2 md:table-cell md:py-3 md:text-center md:border-none">
									{linha.id_usuario}
								</td>
								<td className="text-lg font-medium block border-b border-n40 relative px-2 md:table-cell md:text-left md:px-0 md:border-none">
									<Link
										to={`/usuarios/editar-informacoes/${linha.id_usuario}`}
									>
										{linha.nome}
									</Link>
								</td>
								<td className="text-lg block border-b border-n40 relative px-2 md:table-cell md:text-left md:px-0 md:border-none">
									{linha.cargo}
								</td>
								<td className="text-lg block border-b border-n40 relative px-2 md:table-cell md:text-center md:border-none">
									{linha.departamento}
								</td>
								
							</tr>
						))}
					</tbody>

				</table>
				<div className="flex justify-center items-center">
					<button className="mr-4 text-complementary-20 underline underline-offset-4 disabled:text-n40 disabled:no-underline" onClick={(e) => { mudaPagina(pagina - 1) }} disabled={pagina === 0}>Anterior</button>
					<InputPaginacao min={1} max={totalPagina} paginaAtual={pagina + 1} onValueChange={(valor) => {
						mudaInputPagina(valor)
					}} />
					<span className="ml-1 text-n40">/ {totalPagina}</span>
					<button className="ml-4 text-complementary-20 underline underline-offset-4 disabled:text-n40 disabled:no-underline" onClick={(e) => { mudaPagina(pagina + 1) }} disabled={!(pagina < totalPagina - 1)}>Próxima</button>
					</div>
				</div>
		</div>
	)
}

export default ListaUsuario
