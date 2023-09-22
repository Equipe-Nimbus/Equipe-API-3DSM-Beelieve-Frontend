import React from "react"
import detalhe from "../images/detalhe.png"
import beelieveLogo from "../assets/images/Beelieve.png"

function Login() {
  return (
    <div className="to-white flex min-h-screen items-center bg-gradient-to-t from-primary50">
      <div className="border-gray-300 mx-auto flex h-[70vh] w-5/6 max-w-6xl rounded-lg border-4 bg-bg100 p-4">
        <div className="bg-100 w-2/3 p-4">
          <img
            src={beelieveLogo}
            alt="beelieveLogo"
            className="mb-4 mr-2 w-2/4"
          />
          <img src={detalhe} alt="" className="w-full" />
        </div>
        <form className="flex w-2/3 flex-col items-center justify-center p-4">
          <h2 className="text-gray-600 mb-4 text-center text-4xl font-extrabold">
            Bem Vindo
          </h2>
          <h3 className="mb-4 w-full pl-32 text-left">Login:</h3>
          <input
            type="text"
            className="border-gray-300 mb-4 w-2/4 rounded-lg border-2 p-2"
            required
          />
          <h3 className="mb-4 w-full pl-32 text-left">Senha:</h3>
          <input
            type="password"
            className="border-gray-300 mb-4 w-2/4 rounded-lg border-2 p-2"
            required
          />
          <input
            type="submit"
            className="text-2x1 mt-4 cursor-pointer rounded bg-primary50 px-20 py-4 font-bold shadow hover:shadow-lg"
            value="Entre"
          />
        </form>
      </div>
    </div>
  )
}

export default Login
