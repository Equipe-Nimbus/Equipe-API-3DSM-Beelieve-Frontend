import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import projeto from '../images/projeto.png'
import usuario from '../images/usuario.png'
import api from '../services/api';

function NavBar() {
    const navigate = useNavigate()

        return (
            <><nav className="">
                <Link className="" to={'/'}><img className="" src={logo} alt="" /></Link>
                <div className="">
                    <img className="" src={projeto} alt="" /> <Link className="" to={'/'}>Projetos</Link>
                </div>
                <div className="">
                    <img className="" src={usuario} alt="" /> <h1 className="nomeUsuario">{`Nome: ${sessionStorage.getItem('nomeUsuario')}`}</h1>
                    <span className="funcaoUsuario">{`${sessionStorage.getItem('funcaoUsuario')}`}</span>
                </div>
            </nav>
            </>
        )
}

export default NavBar