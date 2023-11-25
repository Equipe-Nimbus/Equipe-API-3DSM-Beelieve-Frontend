import React from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "../contexts/authContext"

import detalhe from '../images/detalhe.png'
import Beelieve1 from '../images/Beelieve1.png'

function Login(){

  const { register, handleSubmit } = useForm({})
  const { login } = useAuth()

  const handleLogin = async (data) => {
    await login(data)
  }

    return(
        <div className="bg-gradient-to-t from-bg33 via-bg33 to-bg100 h-screen flex items-center justify-center">
            <div className="shadow-xl bg-gradient-to-t from-bg98 via-bg98 to-bg100 w-4/5 h-4/5 p-8 rounded-md">
        <div>
        <img src={Beelieve1} alt="beelieveLogo" className="mb-5" />
        <img src={detalhe} alt="detalhe" className="h-96" />
        </div>
        <form onSubmit={handleSubmit(handleLogin)} className="max-w-md mx-auto mt-[-25rem] mr-[10rem]">
        <h2 className="text-center font-bold">Bem-Vindo</h2>
        <br></br>
          <div className="mb-4">
            <label htmlFor="login" className="block text-gray-700 text-sm font-thin mb-2">
              Login:
            </label>
            <input
              type="text"
              id="login"
              name="login"
              className="w-full border border-n70 rounded p-2"
              required
              {...register("login")}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="senha" className="block text-gray-700 text-sm font-thin mb-2">
              Senha:
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              className="w-full border border-n70 rounded p-2"
              required
              {...register("senha")}
            />
          </div>

          <input
            type="submit"
            className="p-2 bg-primary50 rounded px-8 hover:bg-bg33 text-center w-64 ml-24 mt-3"
            value="Entrar"
          />
        </form>
        </div>
        </div>
    )

}

export default Login