import React from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "../contexts/authContext"

import wbs from "../assets/images/wbs.png"
import Beelieve1 from "../assets/images/Beelieve1.png"

function Login() {
  const { register, handleSubmit } = useForm({})
  const { login } = useAuth()

  const handleLogin = async (data) => {
    await login(data)
  }

  return (
    <div className="from-bg24 to-bg5 flex h-screen bg-gradient-to-t to-40% p-5 lg:p-16 flex-col justify-center">
      <div className="h-fit w-full rounded-3xl bg-gradient-to-t from-bg98 to-bg100 p-8 shadow-xl">
        <div className="my-10 lg:flex lg:justify-between lg:items-center lg:px-10">
          <div className="flex justify-center lg:max-w-fit lg:flex-col lg:justify-start">
            <img src={Beelieve1} alt="beelieveLogo" className="mb-5 lg:w-44" />
            <img src={wbs} alt="detalhe" className="hidden lg:flex lg:w-96 xl:w-full" />
          </div>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="my-20 lg:flex lg:w-1/3 lg:flex-col items-center lg:mr-10"
          >
            <h2 className="text-center text-xl font-bold text-n20">
              Bem-Vindo
            </h2>
            <div className="mt-4 flex flex-col lg:w-11/12 xl:w-2/3">
              <label htmlFor="login" className=" text-sm font-medium text-n40">
                Login:
              </label>
              <input
                type="text"
                id="login"
                name="login"
                className="w-full rounded border border-n70 bg-primary98/0 p-1"
                required
                {...register("login")}
              />
            </div>

            <div className="mt-4 flex flex-col lg:w-11/12 xl:w-2/3">
              <label htmlFor="senha" className="text-sm font-medium text-n40">
                Senha:
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                className="w-full rounded border border-n70 bg-primary98/0 p-1"
                required
                {...register("senha")}
              />
            </div>
            <div className="mt-5 flex justify-center">
              <input
                type="submit"
                className="hover:bg-bg24 mt-3 cursor-pointer rounded bg-primary50 p-2 px-8 text-center drop-shadow-md"
                value="Entrar"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
