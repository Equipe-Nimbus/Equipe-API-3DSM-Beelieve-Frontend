import React, { useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router";
import FormCadastroProjeto from "../components/FormCadastroProjeto/FormCadastroProjeto";


function NovoProjeto() {
  const navigate = useNavigate()
  const { user, autenticado, token } = useAuth()
  useEffect(() => {
    if(!autenticado) {
      navigate("/")
    }
    else if(autenticado && user.cargo !== 'Gerente'){
      navigate("/projetos")
    }
  })

  return (
    <>
      <div className="bg-bg100 m-5 rounded-md p-7 drop-shadow-md">
        <FormCadastroProjeto />
      </div>
    </>
  );
}

export default NovoProjeto;
