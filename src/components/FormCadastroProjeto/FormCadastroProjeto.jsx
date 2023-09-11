import React, { useState } from "react";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import schemaProjetoInicial from "./validation";
import Button from "../Button";
import axios from "../../services/axios";


function FormCadastroProjeto(){

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            valorHora: 0
        },
        resolver: yupResolver(schemaProjetoInicial)
    })

    const [tabelaWBS, setTabelaWBS] = useState([
        {
            nivel: '1',
            descricao: 'Objetivo Final',
            subnivel: [],
        },
    ])


    const adicionarSubnivel = (nivelPai) => {
        if (nivelPai.split('.').length >= 3) {
          return
        }
    
        const novoNivel = calcularProximoNivel(nivelPai)
    
        const novaLinha = {
          nivel: novoNivel,
          descricao: "Nova Descrição",
        };
    
        const novaTabela = [...tabelaWBS]
    
        const indexNivelPai = novaTabela.findIndex((linha) => linha.nivel === nivelPai)
    
        if (indexNivelPai !== -1) {
          
          let indexInsercao = indexNivelPai + 1;
          
          while (
            indexInsercao < novaTabela.length &&
            novaTabela[indexInsercao].nivel.startsWith(nivelPai)
          ) {
            indexInsercao++
            
          }
    
          novaTabela.splice(indexInsercao, 0, novaLinha)
        } else {

          novaTabela.push(novaLinha)
        }
    
        setTabelaWBS(novaTabela)
      }
    
    const calcularProximoNivel = (nivelPai) => {
        
        const subniveisExistentes = tabelaWBS
          .filter((linha) => linha.nivel.toString().startsWith(nivelPai + '.'))
          .map((linha) => linha.nivel)
        
    
        let proximoSubnivel = 1;
        while (subniveisExistentes.includes(`${nivelPai}.${proximoSubnivel}`)) {
          proximoSubnivel++
        }
    
        return `${nivelPai}.${proximoSubnivel}`
      };
    
    const cadastrarProjeto = async (data) => {
        const projeto = {
            nomeProjeto: data.nomeProjeto,
            descricaoProjeto: data.descricaoProjeto,
            valorHoraProjeot: data.valorHora,
            subProjeto: []
        }

        const wbsProjeto = data.tabelaWBS[1]

        for(const subprojeto in wbsProjeto){
            if(subprojeto !== 'descricao'){
            
                projeto.subProjeto.push({
                    nomeSubProjeto: wbsProjeto[subprojeto].descricao,
                    moduloSubProjeto: []
                })

                for(const modulo in wbsProjeto[subprojeto]){
                    if(modulo !== 'descricao'){
                        const indexSubProjeto = projeto.subProjeto.findIndex((subprojetoAlvo) => 
                                subprojetoAlvo.nomeSubProjeto === wbsProjeto[subprojeto].descricao)

                        projeto.subProjeto[indexSubProjeto].moduloSubProjeto.push({
                            nomeModuloSubProjeto: wbsProjeto[subprojeto][modulo].descricao
                        })
                    }
                }
            }
        }

        //console.log(projeto)
        await axios.post("/cadastrar/projeto", projeto)
    }

    return (
        <form onSubmit={handleSubmit(cadastrarProjeto)}>
            <div>
                <label htmlFor="nomeProjeto">Título do Projeto</label>
                <input type="text" id="nomeProjeto" {...register("nomeProjeto")}/>
                {errors?.nomeProjeto && <label htmlFor="nomeProjeto">{errors.nomeProjeto.message}</label>}
            </div>
            <div>
                <label name="descricaoProjeto">Descrição</label>
                <input type="text" {...register("descricaoProjeto")}/>
                {errors?.descricaoProjeto && <label htmlFor="descricaoProjeto">{errors.descricaoProjeto.message}</label>}
            </div>
            <div>
                <label name="valorHora">Valor/Hora de trabalho</label>
                <input type="number" step="any" {...register("valorHora")}/>
                {errors?.valorHora && <label htmlFor="valorHora">{errors.valorHora.message}</label>}
            </div>
            <div>
                <h2>WBS</h2>
                <table id="wbsTable">
                    <thead>
                    <tr>
                        <th>Nível</th>
                        <th>Descrição</th>
                        <th>Ação</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tabelaWBS.map((linha, index) => (
                        <tr key={index}>
                        <td>{linha.nivel}</td>
                        <td>
                            <input type="text"
                                   defaultValue={linha.descricao}
                                   {...register(`tabelaWBS[${linha.nivel}].descricao`)}
                            />
                        </td>
                        {linha.nivel.toLocaleString().split('.').length < 3 && (
                            <td>
                            <button type="button"
                                    onClick={() => adicionarSubnivel(`${linha.nivel}`)}>Adicionar Subnível
                            </button>
                            </td>
                        )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div>
                <Button texto="Cancelar" tipo='button'/>
                <Button texto="Confirmar" tipo='submit'/>
            </div>
        </form>
    )
}

export default FormCadastroProjeto