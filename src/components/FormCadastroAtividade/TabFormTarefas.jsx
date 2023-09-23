import React, { useState } from 'react';
//import schemaInsercaoAtividade from './validationAtividade';
import axios from 'axios';

const TabFormTarefas = () => {
    const [ tarefa, setTarefa ] = useState( [ { id: '', descricao: '', resultadoEsperado: '', status: '', peso: '', prazo: '' } ] );

    const addRow = () => {
        const novaTarefa = [ ...tarefa ];
        const novaLinha = { id: '', descricao: '', resultadoEsperado: '', status: '', peso: '', prazo: '' };

        novaTarefa.push( novaLinha );
        setTarefa( novaTarefa );
    };

    const handleDescricao = ( evento, index ) => {
        const novaDescricao = evento.target.value;
        const novaTabela = [ ...tarefa ];
        novaTabela[ index ].descricao = novaDescricao;
        setTarefa( novaTabela );
    };

    const handleResultadoEsperado = ( evento, index ) => {
        const novoResultadoEsperado = evento.target.value;
        const novaTabela = [ ...tarefa ];
        novaTabela[ index ].resultadoEsperado = novoResultadoEsperado;
        setTarefa( novaTabela );
    };

    const handlePeso = ( evento, index ) => {
        const novoPeso = evento.target.value;
        const novaTabela = [ ...tarefa ];
        novaTabela[ index ].peso = novoPeso;
        setTarefa( novaTabela );
    };

    const handlePrazo = ( evento, index ) => {
        const novoPrazo = evento.target.value;
        const novaTabela = [ ...tarefa ];
        novaTabela[ index ].prazo = novoPrazo;
        setTarefa( novaTabela );
    };

    const handleStatus = ( evento, index ) => {
        const novoStatus = evento.target.value;
        const novaTabela = [ ...tarefa ];
        novaTabela[ index ].status = novoStatus;
        setTarefa( novaTabela );
    };

    const saveTarefa = async () => {
        console.log( tarefa );

        const geraJsonTarefas = listaTarefas();

     //await axios.put('/tarefa/atualizar', geraJsonTarefas);

        /*schemaInsercaoAtividade.validate( tarefa )
            .then( tarefa => {
                axios.post( '/tarefa/cadastrar', tarefa ).then( response => setTarefa( response.tarefa ));
            } )
            .catch( errors => {
                console.error( errors );
            } );*/

        console.log( 'Dados Salvos:', geraJsonTarefas );
    };

    const listaTarefa = async () => {
        try {
            const response = await axios.get( '/tarefa/listar' );
            setTarefa( response.tarefa );
            console.log( 'Dados Listados:', tarefa );
        } catch ( error ) {
            console.error( 'Erro ao listar dados:', error );
        }
    };

    const deleteRow = ( index ) => {
        /*axios.put( `/tarefa/atualizar/${ id }` ).then( response => setTarefa( updatedtarefa ) );*/

        const tarefasExistentes = [...tarefa]

        tarefasExistentes.splice(index, 1)

        setTarefa(tarefasExistentes)

        console.log(tarefasExistentes)
    };

function listaTarefas() {

    const listaTarefas = {
        tipo_pai:"subprojeto",
        id_pai:"2",
        lista_tarefas:[]
    }

    tarefa.forEach((atividade) => {
          listaTarefas.lista_tarefas.push({
            id_tarefa:atividade.id,
            descricao_atividade_tarefa:atividade.descricao,
            resultado_esperado_tarefa:atividade.resultadoEsperado,
            peso_tarefa:atividade.peso,
            status_tarefa:atividade.status,
            prazo_tarefa:atividade.prazo,
          })
    });

    return listaTarefas;
}

    return (
        <div>
            <button onClick={() => window.history.back()}>Voltar</button>
            <h1>Titulo do Projeto</h1>
            <hr className="border-n90" />
            <div>
                <button onClick={listaTarefa}>Listar</button>
                <button onClick={addRow}>Nova Tarefa</button>
                <tr></tr>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Descrição</th>
                            <th>Resultado Esperado</th>
                            <th>Execução</th>
                            <th>Peso</th>
                            <th>Previsão</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tarefa.map( ( item, index ) => (
                            <tr key={index}>
                                <td className="font-semibold">{item.id}</td>
                                <td className="w-1/4 px-4 py-1.5">
                                    <input
                                        type="text"
                                        className="w-full"
                                        value={tarefa[ index ].descricao}
                                        onChange={( e ) => handleDescricao( e, index )}
                                    />
                                </td>
                                <td className="w-1/4 px-4 py-1.5">
                                    <input
                                        type="text"
                                        className="w-full"
                                        value={tarefa[ index ].resultadoEsperado}
                                        onChange={( e ) => handleResultadoEsperado( e, index )}
                                    />
                                </td>
                                <td className="w-1/4 px-4 py-1.5">
                                    <input
                                        type="checkbox"
                                        className="w-full"
                                        value={tarefa[ index ].status}
                                        onChange={( e ) => handleStatus( e, index )}
                                    />
                                </td>
                                <td className="w-1/4 px-4 py-1.5">
                                    <input
                                        type="number"
                                        className="w-full"
                                        value={tarefa[ index ].peso}
                                        onChange={( e ) => handlePeso( e, index )}
                                    />
                                </td>
                                <td className="w-1/4 px-4 py-1.5">
                                    <input
                                        type="date"
                                        className="w-full"
                                        value={tarefa[ index ].prazo}
                                        onChange={( e ) => handlePrazo( e, index )}
                                    />
                                </td>
                                <td>
                                    <button onClick={() => deleteRow( index )}>Excluir</button>
                                </td>
                            </tr>
                        ) )}
                    </tbody>
                </table>
                <button onClick={saveTarefa}>Salvar</button>
            </div>
        </div>
    );
};

export default TabFormTarefas;
