import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schemaInsercaoAtividade from "./validationAtividade";
import axios from "../../services/axios";


const TabFormAtividade = () => {
  const [atividades, setAtividades] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [resultadoEsperado, setResultadoEsperado] = useState('');
  const [peso, setPeso] = useState('');
  const [status, setStatus] = useState(0);
  const [prazo, setPrazo] = useState('');


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      descricao: null,
      resultadoEsperado: null,
      peso: null,
      status: false,
      prazo: null 
    },
    resolver: yupResolver(schemaInsercaoAtividade),
  });


  const handleAddAtividade = () => {
    schemaInsercaoAtividade
      .validate(
        {
          descricaoAtividade: descricao,
          resultadoEsperadoAtividade: resultadoEsperado,
          pesoAtividade: peso,
          statusAtividade: status,
          prazoAtividade: prazo,
        },
        { abortEarly: false }
      )
      .then(() => {
        const novaAtividade = {
          id: atividades.length + 1,
          descricao,
          resultadoEsperado,
          peso,
          status,
          prazo,
        };

        setAtividades([...atividades, novaAtividade]);
        setDescricao('');
        setResultadoEsperado('');
        setPeso('');
        setStatus(0);
        setPrazo('');
      })
      .catch((errors) => {
        console.error(errors);
      });
  };

  return (
    <form onSubmit={handleSubmit(TabFormAtividade)}>
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Resultado Esperado</th>
            <th>Execução</th>
            <th>Peso</th>
            <th>Previsão</th>
          </tr>
        </thead>
        <tbody>
          {atividades.map((atividade) => (
            <tr key={atividade.id}>
              <td>{atividade.id}</td>
              <td>{atividade.descricao}</td>
              <td>{atividade.resultadoEsperado}</td>
              <td>{atividade.status}</td>
              <td>{atividade.peso}</td>
              <td>{atividade.prazo}</td>
            </tr>
          ))}
          <tr>
            <td>ID</td>
            <td>
              <input
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={resultadoEsperado}
                onChange={(e) => setResultadoEsperado(e.target.value)}
              />
            </td>
            <td>
              <label>
                Execução
                <input
                  type="checkbox"
                  checked={status === 1}
                  onChange={() => setStatus(status === 1 ? 0 : 1)}

                />
              </label>
            </td>
            <td>
              <input
                type="number"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}

              />
            </td>
            <td>
              <input
                type="date"
                value={prazo}
                onChange={(e) => setPrazo(e.target.value)}

              />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleAddAtividade}>Adicionar Atividade</button>
    </div>
    </form>
  );
};

export default TabFormAtividade;
