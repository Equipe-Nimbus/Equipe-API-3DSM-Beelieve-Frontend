import React from "react";

function CardProjeto({titulo, descricao}) {

    return(
        <>
        <div className="border flex flex-col w-64 mt-5 px-5 py-7 border-n90 drop-shadow-md rounded-md">
            <h1 className="text-complementary-20 text-lg font-semibold">{titulo}</h1>
            <p className="text-n40 text-sm mt-2">{descricao}</p>
        </div>
        </>
    )
}

export default CardProjeto