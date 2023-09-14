import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import recurso from '../images/recurso.png'
import relatorio from '../images/relatorio.png'
import projeto from '../images/projeto.png'
import usuario from '../images/usuario.png'
import logout from '../images/logout.png'
import api from '../services/axios.js'

function NavBar() {
    const [logado, setLogado] = useState(Boolean)
    const [nome, setNome] = useState('')
    const [funcao, setFuncao] = useState('')
    const navigate = useNavigate()

    async function veLogado() {
        let dadoUsuario = await api.get('/confereLogado')
        if (dadoUsuario.data.logado) {
            setLogado(true)
            setNome(dadoUsuario.data.nome)
            setFuncao(dadoUsuario.data.funcao)
            //console.log(funcao)
        }
        else {
            setLogado(false)
        }

    }

    async function loggout() {
        const log = await api.get('/loggout')
        console.log(log.data)
        navigate('/')
    }

    useEffect(() => {
        veLogado()
    })

    if (logado) {
        return (
            <><nav className="">
                <Link className="" to={'/'}><img className="" src={logo} alt="" /></Link>
                <div className="">
                    <img className="" src={projeto} alt="" /> <Link className="" to={'/'}>Projetos</Link>
                    <img className="" src={recurso} alt="" /> <Link className="" to={'/'}>Recursos</Link>
                    <img className="" src={relatorio} alt="" /> <Link className="" to={'/'}>Relatórios</Link>
                </div>
                <div className="">
                    <img className="" src={usuario} alt="" /> <h1 className="nomeUsuario">{`Nome: ${sessionStorage.getItem('nomeUsuario')}`}</h1>
                    <span className="funcaoUsuario">{`${sessionStorage.getItem('funcaoUsuario')}`}</span>
                </div>
                <img className="" src={logout} alt="" /> <button className='loggout' onClick={loggout}>Sair</button>
            </nav>
            </>
        )
    }
}

export default NavBar