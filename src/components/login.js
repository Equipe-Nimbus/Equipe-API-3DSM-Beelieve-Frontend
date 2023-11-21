import React from 'react';
import { useState, useEffect } from 'react';

import loginStyle from '../loginStyle.css'
import detalhe from '../images/detalhe.png'
import beelieveLogo from '../images/beelieveLogo.png';
import { useNavigate } from 'react-router-dom';

function Login2() {
    let navegate = useNavigate()

    return (
        <>
            <div className='login-body'>
                <div className='login-box'>
                    <div className='mainContent'>
                        <div className='state'>
                            <h1><img src={beelieveLogo} alt="beelieveLogo" className='loginLogo' />BeeLieve</h1>
                            <img src={detalhe} className='beeHive' />
                            <form>
                                <br></br>
                                <p></p>
                                <br></br>
                                <div className='loginTitle'>
                                    <h2>Bem Vindo</h2>
                                </div>
                                <div className='loginText'>
                                    <h3 className='login-text'>Login:</h3>
                                    <input type="text" className='loginInput' required />
                                </div>
                                <div className='senhaText'>
                                    <h3 className='login-text'>Senha:</h3>
                                    <input type="password" className='senhaInput' required />
                                </div>
                                <p></p>
                                <input type="submit" className="login_button" value='Entre' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login2