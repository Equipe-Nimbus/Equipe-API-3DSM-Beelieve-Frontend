import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/axios';

import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Button from '../components/Button.jsx';
import CardProjeto from '../components/CardProjeto.jsx';

import { BsPlusCircle } from "react-icons/bs"

function ListaProjeto(){
    const [projetos, setProjetos] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getProjeto();
    }, []); //array vazio indica que este useEffect será executado uma vez quando o componente for montado

    async function getProjeto() {
        try{
            await axios.get("/projeto/listar").then((response)=> {
            console.log(response)
            const data = response.data
            setProjetos(data)
        })}

        catch(erro){
        }
    }

    return (
        <div>
            <Breadcrumbs/>
            <div className="bg-bg100 m-5 rounded-md p-7 drop-shadow-md">
                <Button texto="Novo"
                tipo='button' 
                iconeOpcional={BsPlusCircle}
                iconeTamanho="20px" 
                className="bg-primary50 text-on-primary mb-5  flex items-center gap-0.5 rounded-[10px] p-2 text-lg font-semibold"
                onClick={() => navigate("/projetos/novo-projeto")}/>
                <hr className="border-n90"></hr>
                <div className='flex flex-row flex-wrap gap-10 mx-10'>
                    {projetos.map((projeto, index) => (
                         <CardProjeto key={projeto.id_projeto} titulo={projeto.nome_projeto} descricao={projeto.descricao_projeto} estadoProjeto={false} onClick={() => navigate(`/projetos/${projeto.id_projeto}`)}/> 
                         
                    ))}
                </div>
            </div>
            
        </div>
    );
}

export default ListaProjeto;

