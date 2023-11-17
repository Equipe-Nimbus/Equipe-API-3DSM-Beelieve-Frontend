import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

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

	useEffect(() => {
		getUsuarios()
	}, []) //array vazio indica que este useEffect será executado uma vez quando o componente for montado

	useEffect(() => {
		console.log("renderizou")
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
				console.log(response)
				const data = response.data.content
				setUsuarios(data)
				const total = response.data.totalPages
				setTotalPagina(total)
			})
		} catch (erro) { }
	}

	return (
		<div className="m-5 rounded-md bg-bg100 p-7 drop-shadow-md">
			<Button
				texto="Novo"
				tipo="button"
				iconeOpcional={BsPlusCircle}
				iconeTamanho="20px"
				className="mb-5 flex items-center  gap-1.5 rounded-[10px] bg-primary50 p-2 text-lg font-semibold text-on-primary"
				onClick={() => navigate("/usuarios/novo-usuario")}
			/>
			<hr className="border-n90"></hr>
			<form
				className="flex justify-end mx-5 gap-4 my-5" onSubmit={(e) => { getUsuarioFiltro(e) }}
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
			
			<div className="mx-10 flex flex-col gap-20 overflow-x-auto pb-5">
				<table className="w-12/12">
					<thead className="bg-primary98 p-10 text-base uppercase text-center">
						<tr>
							<th className="w-2/12 py-3">Matricula</th>
							<th className="w-4/12 py-3 text-left">Nome</th>
							<th className="w-4/12 py-3 text-left">Email</th>
							<th className="w-4/12 py-3 text-left">Cargo</th>
							<th className="w-2/12 py-3">Departamento</th>	
						</tr>
					</thead>
					<tbody>
						{usuarios.map((linha, index) => (
							<tr key={index} className="border-b border-n90">
								<td className="py-3 text-lg font-semibold text-center">
									{linha.id_usuario}
								</td>
								<td className="text-lg text-left underline underline-offset-4 decoration-n70">
									<Link
										to={`/usuarios/editar-informacoes/${linha.id_usuario}`}
									>
										{linha.nome}
									</Link>
								</td>
								<td className="text-lg text-left">
									{linha.email}
								</td>
								<td className="text-lg text-left">
									{linha.cargo}
								</td>
								<td className="text-lg text-center">
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
