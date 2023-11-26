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
      <FormAlterarDadosUsuario />
    </>
  );
}

export default AlterarUsuario;