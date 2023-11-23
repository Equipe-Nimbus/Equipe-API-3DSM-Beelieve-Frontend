import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'


import { configurarAxios } from '../services/axios'
import axios from '../services/axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = Cookies.get('user')
        return storedUser ? JSON.parse(storedUser) : null })
    const [token, setToken] = useState(() => Cookies.get('tokenJWT') || null)
    const autenticado = !!token
    const navigate = useNavigate()

    const login = async (data) => {
        try {
            //console.log(data)
            await axios.post('http://localhost:8080/usuario/login', data).then((response) => {
                //console.log(response)
                const user = {
                    nome: response.data.nome,
                    cargo: response.data.cargo
                }
                const tokenJWT = response.data.token
                setUser(user)
                setToken(tokenJWT)
                Cookies.set('tokenJWT', tokenJWT)
                Cookies.set('user', JSON.stringify(user))

                configurarAxios(tokenJWT)
                navigate("/projetos")
            })
            
        } catch (error) {
            //console.error(error)

            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                customClass: {
                    container: 'absolute mb-24 mr-48'
                }
              })

              Toast.fire({
                icon: "error",
                title: "Login ou senha incorretos."
              })
        }
    }

    const loggout = () => {
        Cookies.remove('tokenJWT')
        Cookies.remove('user')
        setToken(null)
        setUser(null)
        configurarAxios(null)
        navigate("/")
      }

    useEffect(() => {
        configurarAxios(token)
    }, [token])

    return (
        <AuthContext.Provider value={{user, login, loggout, autenticado, token}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error('useAuth só pode ser usado dentro de um AuthProvider')
    }
    return context
}