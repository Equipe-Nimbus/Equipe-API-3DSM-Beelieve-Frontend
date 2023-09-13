import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import recurso from '../images/recurso.png'
import relatorio from '../images/relatorio.png'
import projeto from '../images/projeto.png'
import usuario from '../images/usuario.png'
import logout from '../images/logout.png'

function NavBar() {
    const [logado, setLogado] = useState(Boolean)
    const [nome, setNome] = useState('')
    const [funcao, setFuncao] = useState('')
    const navigate = useNavigate()
    return (
        <><nav className="">
            <Link className="" to={'/'}></Link>
            <div className="">
                <img className="" src={projeto} alt="" /> <a href=''>Projetos</a>
                <img className="" src={recurso} alt="" /> <a href=''>Recursos</a>
                <img className="" src={relatorio} alt="" /> <a href=''>Relatório</a>
            </div>
            <div className="">
                <img className="" src={usuario} alt="" /> <h1 className="nomeUsuario">{`Nome: ${sessionStorage.getItem('nomeUsuario')}`}</h1>
                <span className="funcaoUsuario">{`${sessionStorage.getItem('funcaoUsuario')}`}</span>
            </div>
            <img className="" src={logout} alt="" /> <button className='loggout'>Sair</button>
        </nav>
        </>
    )
}

export default NavBar