import React, {useEffect} from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router";
import FormAlterarDadosUsuario from "../components/FormAlterarDadosUsuario/FormAlterarDadosUsuario";


function AlterarUsuario() {
  const navigate = useNavigate()
  const {user, autenticado} = useAuth()
	useEffect(() => {
		if(!autenticado){
			navigate("/")
		}
		else if(autenticado && user.cargo !== 'Gerente'){
			navigate("/usuarios")
		}
	})

  return (
    <>
      <div className="bg-bg100 m-5 rounded-md p-7 drop-shadow-md">
        <FormAlterarDadosUsuario />
      </div>
    </>
  );
}

export default AlterarUsuario;