import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "../services/axios"
import { RiFilter2Fill } from "react-icons/ri";

import InputPaginacao from "../components/InputPaginacao.jsx"
import Button from "../components/Button.jsx"

import { BsPlusCircle } from "react-icons/bs"

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
			if (requisicao !== "") {
				requisicao = requisicao + "departamento=" + departamentoFiltro
			}
			else {
				requisicao = requisicao + "&departamento=" + departamentoFiltro
			}
		}
		if (nomeFiltro != null && nomeFiltro !== "") {
			if (requisicao !== "") {
				requisicao = requisicao + "nome=" + nomeFiltro
			}
			else {
				requisicao = requisicao + "&nome=" + nomeFiltro
			}
		}

		if (cargoFiltro != null && cargoFiltro !== "") {
			if (requisicao !== "") {
				requisicao = requisicao + "cargo=" + cargoFiltro
			}
			else {
				requisicao = requisicao + "&cargo=" + cargoFiltro
			}
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
				<form
					className="mx-40 mt-8 absolute inset-x-0 top-0 mb-0 gap-0.5 h-16" onSubmit={(e) => { getUsuarioFiltro(e) }}
				>
					<input placeholder="Nome:" className="w-64 my-px rounded-md border border-n70 p-1 ml-3" type="text" value={nomeFiltro} onChange={(e) => { setNomeFiltro(e.target.value) }} />
					<select className="my-0 w-48 ml-4 rounded-md border border-n70 p-1" value={cargoFiltro} onChange={(e) => { setCargoFiltro(e.target.value) }}>
						<option disabled selected value="">Cargo</option>
						<option value="Gerente">Gerente</option>
						<option value="EngenheiroChefe">Engenheiro Chefe</option>
						<option value="LiderDePacoteDeTrabalho">Líder de Pacote de Trabalho</option>
						<option value="Analista">Analista</option>
					</select>
					<select className="my-0 w-48 ml-4 rounded-md border border-n70 p-1" value={departamentoFiltro} onChange={(e) => { setDepartamentoFiltro(e.target.value) }}>
						<option disabled selected value="">Departamento</option>
						<option value="Departamento 1">Departamento 1</option>
						<option value="Departamento 2">Departamento 2</option>
						<option value="Departamento 3">Departamento 3</option>
						<option value="Departamento 4">Departamento 4</option>
						<option value="Departamento 5">Departamento 5</option>
					</select>
					{/* <input placeholder="Departamento:" className="ml-1 w-64 rounded-md border border-n70 p-1 ml-4" type="text" value={departamentoFiltro} onChange={(e) => { setDepartamentoFiltro(e.target.value) }} /> */}

					<button className="w-24 border inline-flex border-n70 rounded-md p-1 ml-2" type="submit"><RiFilter2Fill className="ml-3" />Filtrar</button>
				</form>
				<hr className="border-n90"></hr>
				<div className="mx-10 flex flex-row flex-wrap gap-10 my-10 gap-2 overflow-x-auto pb-5">
					<table className="mx-auto rounded px-16">
						<thead className="bg-primary98 p-10 text-base uppercase text-center">
							<tr>
								<th className="px-12 py-3">Matricula</th>
								<th className="px-12 py-3">Cargo</th>
								<th className="px-12 py-3">Departamento</th>
								<th className="px-12 py-3">Usuários</th>
							</tr>
						</thead>
						<tbody>
							{usuarios.map((linha, index) => (
								<tr key={index} className="border-b border-n90">
									<td className="px-4 py-3 text-lg font-semibold text-center">
										{linha.id_usuario}
									</td>
									<td className="px-4 py-3 text-lg font-semibold text-center">
										{linha.cargo}
									</td>
									<td className="px-4 py-3 text-lg font-semibold text-center">
										{linha.departamento}
									</td>
									<td className="px-4 py-3 text-lg font-semibold text-center">
										<Link
											to={`/usuario/listar/${linha.id_usuario}`}
										>
											{linha.nome}
										</Link>
									</td>
								</tr>
							))}
						</tbody>

					</table>
					<div className="ml-auto mt-12">
						{pagina !== 0 ?
							<button className="mr-4" onClick={(e) => { mudaPagina(pagina - 1) }}>Anterior</button>
							:
							<button className="mr-4" onClick={(e) => { mudaPagina(pagina - 1) }} disabled>Anterior</button>
						}

						<InputPaginacao min={1} max={totalPagina} paginaAtual={pagina + 1} onValueChange={(valor) => {
							mudaInputPagina(valor)
						}} />
						<span>/{totalPagina}</span>

						{pagina < totalPagina - 1 ?
							<button className="ml-4" onClick={(e) => { mudaPagina(pagina + 1) }}>Proxima</button>
							:
							<button className="ml-4" onClick={(e) => { mudaPagina(pagina + 1) }} disabled>Proxima</button>
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ListaUsuario
