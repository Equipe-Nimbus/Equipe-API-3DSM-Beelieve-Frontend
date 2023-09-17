import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios.js'

function ListaProjeto(){
    const [id, setId] = useState(null);
    const [projeto, setProjeto] = useState([]);
    const [funcao, setFuncao] = useState('');
    const [renderizou, setRenderizou] = useState(false);
    const navegate = useNavigate();

    useEffect(() => {
        getProjeto();
    }, []); //array vazio indica que este useEffect será executado uma vez quando o componente for montado

    async function getProjeto() {
        try{
            const response = await api.get('/listaProjeto');
            setProjeto(response.data.tabelaProjeto); //pegando os dados da resposta
            console.log(response.data.tabelaProjeto);
        }
        catch(erro){
            console.log(erro);
        }
    }

    return (
        <div>
            <h1 className="mainTitle">PROJETOS</h1>
            {projeto.map((projeto, index) => (
                <div key={index} onClick={() => navegate(`/projeto/${projeto.id}`)}>
                    <h1>{projeto.nome} - {projeto.valor}</h1>
                    <div>
                        <p>Horas homem: {projeto.horaHomem}</p>
                        <p>Valor total: {projeto.valor}</p>
                        <p>Status do projeto: {projeto.status}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ListaProjeto;
