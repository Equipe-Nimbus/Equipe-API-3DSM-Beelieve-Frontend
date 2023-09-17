import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import style from '../style.css'
import beelieveLogo from '../images/beelieveLogo.png'
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
        <>
            <nav className="navBar2">
                <div className='logo'>
                    <img className="fotoLogo" src={beelieveLogo} alt="logo" />
                </div>
                <div className="sideBar">
                    <div className='navegadores'>
                        <ul>
                            <li>
                                <a href='' className='navegador'><img className="fotoProjeto" src={projeto} alt="projetos" />Projetos</a>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <a href='' className='navegador'><img className="fotoRecurso" src={recurso} alt="" />Recurso</a>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <a href='' className='navegador'><img className="fotoRelatorio" src={relatorio} alt="" />Relatório</a>
                            </li>
                        </ul>
                    </div>
                    <div className='informacaoUsuario'>
                        <img className="fotoUsuario" src={usuario} alt="" /> <h1 className="nomeUsuario">{`${sessionStorage.getItem('nomeUsuario')}`}</h1>
                        <span className="funcaoUsuario">{`${sessionStorage.getItem('funcaoUsuario')}`}</span>
                    </div>
                </div>
                <div className="loggoutButton">
                    <button className='loggout'><img className="loggoutFoto" src={logout} alt="" />Sair</button>
                </div>
            </nav>
        </>
    )
}

export default NavBar