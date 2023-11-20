import React, {useState} from "react"
import detalhe from '../images/detalhe.png'
import Beelieve1 from '../images/Beelieve1.png'

function Login(){
  const [credenciais, setCredenciais] = useState({
    login: '',
    senha: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredenciais({
      ...credenciais,
      [name]: value,
    });
  };

  const handleLogin = () => {
    const credenciaisJSON = JSON.stringify(credenciais);
    console.log(credenciaisJSON);
  };

    return(
        <div class="bg-gradient-to-t from-bg33 via-bg33 to-bg100 h-screen flex items-center justify-center">
            <div className="shadow-xl bg-gradient-to-t from-bg98 via-bg98 to-bg100 w-4/5 h-4/5 p-8 rounded-md">
        <div>
        <img src={Beelieve1} alt="beelieveLogo" className="mb-5" />
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
              value={credenciais.email}
              onChange={handleInputChange}
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
              value={credenciais.senha}
              onChange={handleInputChange}
            />
          </div>

          <input
            type="submit"
            className="p-2 bg-primary50 rounded px-8 hover:bg-bg33"
            value="Entrar"
            onClick={handleLogin}
          />
        </form>
        </div>
        </div>
    )

}

export default Login