import React from "react"
import detalhe from '../images/detalhe.png'
import beelieveLogo from '../images/beelieveLogo.png'

function Login(){
    return(
        <div class="bg-gradient-to-t from-bg33 via-bg33 to-bg100 h-screen flex items-center justify-center">
            <div className="bg-gradient-to-t from-bg98 via-bg98 to-bg100 w-4/5 h-4/5 p-8 rounded-md">
        <div>
        <img src={beelieveLogo} alt="beelieveLogo" />Beelieve
        <img src={detalhe} alt="detalhe" className="h-auto" />
        </div>
        <form className="max-w-md mx-auto mt-[-25rem] mr-[10rem]">
        <h2>Bem-Vindo</h2>
        <br></br>
          <div className="mb-4">
            <label htmlFor="login" className="block text-gray-700 text-sm font-bold mb-2">
              Login:
            </label>
            <input
              type="text"
              id="login"
              name="login"
              className="w-full border border-none p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="senha" className="block text-gray-700 text-sm font-bold mb-2">
              Senha:
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              className="w-full border border-none p-2"
              required
            />
          </div>

          <input
            type="submit"
            className="p-2"
            value="Entrar"
          />
        </form>
        </div>
        </div>
    )

}

export default Login