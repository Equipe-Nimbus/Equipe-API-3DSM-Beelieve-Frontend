import React from "react";
import Button from "../components/Button";
import FormCadastroProjeto from "../components/FormCadastroProjeto/FormCadastroProjeto";

import { HiOutlineArrowUpCircle } from "react-icons/hi2";

function NovoProjeto() {
  return (
    <>
      <div className="bg-bg100 m-5 rounded-md p-7 drop-shadow-md">
        <Button
          texto="Subir arquivo"
          tipo="button"
          iconeOpcional={HiOutlineArrowUpCircle}
          iconeTamanho="24px"
          className="bg-primary50 text-on-primary mb-5  flex items-center gap-0.5 rounded-[10px] p-2 text-lg font-semibold"
        />
        <hr className="border-n90" />
        <FormCadastroProjeto />
      </div>
    </>
  );
}

export default NovoProjeto;
