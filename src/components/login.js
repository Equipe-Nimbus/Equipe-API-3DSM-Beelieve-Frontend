import React from 'react';
import { useState, useEffect } from 'react';
import api from '../services/api';
import logo from '../images/logo.png'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
    let navegate = useNavigate()

    return (
        <>
            <div className='login'>
                <img src={logo} alt="Sabiá Laranjeira" className='sabia' />
                <div className='login-center'>
                    <div className='mainContent'>
                        <div className='state'>
                            <form>
                                <br></br>
                                <p></p>
                                <div className='logocentro'>
                                    <img className="logo" src={logo} alt="logo" /></div>
                                <br></br>
                                <h3 className='login-text'>Login:</h3>
                                <input type="text" required />
                                <h3 className='login-text'>Senha:</h3>
                                <input type="password" required />
                                <p></p>
                                <input type="submit" className="login_button" value='Entrar' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login