import React, { useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Button from '../components/Button.jsx';
import CardProjeto from '../components/CardProjeto.jsx';

import { BsPlusCircle } from "react-icons/bs"

function ListaProjeto(){

    useEffect(() => {
        getProjeto();
    }, []); //array vazio indica que este useEffect será executado uma vez quando o componente for montado

    async function getProjeto() {
        try{
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
                    <CardProjeto titulo="Projeto X" descricao="Míssel spaghetti joga molho de tomate em 50m e desmaia 50 pessoas" estadoProjeto={false}/>
                </div>
            </div>
            
            {/* {projeto.map((projeto, index) => (
                <div key={index} onClick={() => navegate(`/projeto/${projeto.id}`)}>
                    <h1>{projeto.nome} - {projeto.valor}</h1>
                    <div>
                        <p>Horas homem: {projeto.horaHomem}</p>
                        <p>Valor total: {projeto.valor}</p>
                        <p>Status do projeto: {projeto.status}</p>
                    </div>
                </div>
            ))} */}
        </div>
    );
}

export default ListaProjeto;
