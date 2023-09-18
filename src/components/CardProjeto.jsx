import React, { useState } from "react";
 
function CardProjeto({titulo, descricao, estadoProjeto}) {
    
    const [projetoIniciado, setProjetoIniciado] = useState(estadoProjeto)

    return(
        <>
        <div className="border flex flex-col w-64 mt-5 px-5 pt-7 border-n90 drop-shadow-md rounded-md cursor-pointer hover:border-l-8 hover:border-complementary-20">
            <h1 className="text-complementary-20 text-lg font-semibold">{titulo}</h1>
            <p className="text-n40 text-sm mt-2">{descricao}</p>
            {projetoIniciado ? 
            <p>Iniciado</p> :
            <p className="my-6 text-on-light">Não Iniciado</p>
            }
        </div>
        </>
    )
}

export default CardProjeto