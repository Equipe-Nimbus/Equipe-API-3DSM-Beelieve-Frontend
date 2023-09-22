import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Button from '../components/Button.jsx';
import CardProjeto from '../components/CardProjeto.jsx';

import { BsPlusCircle } from "react-icons/bs"

function ListaProjeto(){
    const [projetos,setProjetos] = useState([])

    useEffect(() => {
        getProjeto();
    }, []); //array vazio indica que este useEffect será executado uma vez quando o componente for montado

    async function getProjeto() {
        try{
            await axios.get("/projeto/listagem").then((resposta)=> setProjetos(resposta.projetos))
        }
        catch(erro){
        }
    }

    return (
        <div>
            <Breadcrumbs/>
            <div className="bg-bg100 m-5 rounded-md p-7 drop-shadow-md">
                <Button texto="Novo" 
                iconeOpcional={BsPlusCircle}
                iconeTamanho="20px" 
                className="bg-primary50 text-on-primary mb-5  flex items-center gap-0.5 rounded-[10px] p-2 text-lg font-semibold"/>
                <hr className="border-n90"></hr>
                <div className='flex flex-row flex-wrap gap-10 mx-10'>
                    {projetos.map((projeto,index) => (
                         <CardProjeto titulo={projeto.nome} descricao={projeto.descricao} estadoProjeto={false} onClick={() => navegate(`/projeto/${projeto.id}`)}/> 
                         
                    ))}
                </div>
            </div>
            
        </div>
    );
}

export default ListaProjeto;

