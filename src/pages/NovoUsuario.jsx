import React from "react";
import FormCadastroUsuario from "../components/FormCadastroProjeto/FormCadastroUsuario";


function NovoUsuario() {
  return (
    <>
      <div className="bg-bg100 m-5 rounded-md p-7 drop-shadow-md">
        <FormCadastroUsuario />
      </div>
    </>
  );
}

export default NovoUsuario;