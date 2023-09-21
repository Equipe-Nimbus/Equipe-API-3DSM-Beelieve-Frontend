import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FormValorHora() {
    const jsonData =
    {
        "ordem_projeto": "1",
        "nome_projeto": "Missil Espaguete",
        "chefe_projeto": "Ernesto Neto",
        "sub_projeto": [
          {
            "ordem_sub_projeto": "1.1",
            "nome_sub_projeto": "Propulsor",
            "nivel_sub_projetos": [
              {
                "ordem_nivel_sub_projeto": "1.1.1",
                "nome_nivel_sub_projeto": "Seleção de materiais",
                "tarefas": [
                  {
                    "descricao_atividade_tarefa": "Levantamento de preços",
                    "resultado_esperado_tarefa": "Material a ser usado",
                    "peso_tarefa": 1,
                    "status_tarefa": 1,
                    "prazo_tarefa": "2023-09-19"
                  },
                  {
                    "descricao_atividade_tarefa": "Levantamento de fornecedores",
                    "resultado_esperado_tarefa": "Fornecedor que compraremos o material",
                    "peso_tarefa": 1,
                    "status_tarefa": 1,
                    "prazo_tarefa": "2023-09-19"
                  }
                ],
                "prazo_nivel_sub_projeto": "2023-09-19",
                "hora_humano_nivel_sub_projeto": 10,
                "progresso_nivel_sub_projeto": 10,
                "orcamento_nivel_sub_projeto": 1000
              }
            ],
            "chefe_sub_projeto": "Pedro Otário",
            "prazo_sub_projeto": "2023-09-19",
            "progresso_sub_projeto": 10,
            "hora_humano_sub_projeto": 10,
            "orcamento_sub_projeto": 10
          },
          {
            "ordem_sub_projeto": "1.2",
            "nome_sub_projeto": "dale",
            "nivel_sub_projetos": [
              {
                "ordem_nivel_sub_projeto": "1.2.1",
                "nome_nivel_sub_projeto": "dole",
                "tarefas": [
                  {
                    "descricao_atividade_tarefa": "Levantamento de preços",
                    "resultado_esperado_tarefa": "Material a ser usado",
                    "peso_tarefa": 1,
                    "status_tarefa": 1,
                    "prazo_tarefa": "2023-09-19"
                  },
                  {
                    "descricao_atividade_tarefa": "Levantamento de fornecedores",
                    "resultado_esperado_tarefa": "Fornecedor que compraremos o material",
                    "peso_tarefa": 1,
                    "status_tarefa": 1,
                    "prazo_tarefa": "2023-09-19"
                  }
                ],
                "prazo_nivel_sub_projeto": "2023-09-19",
                "hora_humano_nivel_sub_projeto": 10,
                "progresso_nivel_sub_projeto": 10,
                "orcamento_nivel_sub_projeto": 1000
              }
            ],
            "chefe_sub_projeto": "Pedro Otário",
            "prazo_sub_projeto": "2023-09-19",
            "progresso_sub_projeto": 10,
            "hora_humano_sub_projeto": 10,
            "orcamento_sub_projeto": 10
          },
        ],
        "progresso_projeto": 100,
        "prazo_projeto": "2023-09-19",
        "descricao_projeto": "Míssil de espaguete de 50 metros de espaguete para 50 espaguete",
        "hora_valor_projeto": 10,
        "data_inicio_projeto": "2023-09-19",
        "orcamento_projeto": 10,
        "hora_humano_total": 10
      };
      
      const ordem_projeto = jsonData.ordem_projeto;
      const nome_projeto = jsonData.nome_projeto;

      const Projeto = [
        {id: 1, "ordem_projeto": ordem_projeto, "nome_projeto": nome_projeto}
      ]

      const subProjeto = [];

      jsonData.sub_projeto.forEach((item) => {
        const ordem_sub_projeto = item.ordem_sub_projeto;
        const nome_sub_projeto = item.nome_sub_projeto;
        subProjeto.push (
          {id: item.id, "ordem_sub_projeto": ordem_sub_projeto, "nome_sub_projeto": nome_sub_projeto});
      })


      
      const subNivel = [];

      jsonData.sub_projeto.forEach((sub_Projeto) => {
        sub_Projeto.nivel_sub_projetos.forEach((item) => {
        const ordem_nivel_sub_projeto = item.ordem_nivel_sub_projeto;
        const nome_nivel_sub_projeto = item.nome_nivel_sub_projeto;
        subNivel.push (
          {id: item.id, "ordem_nivel_sub_projeto": ordem_nivel_sub_projeto, "nome_nivel_sub_projeto": nome_nivel_sub_projeto});
      })})


      // const lista = 

    return(
        <div class="bg-bg100 m-5 rounded-md p-7 drop-shadow-md">
        <table class="table-fixed mt-5 w-2/3 text-center">
            <thead class="bg-primary98 text-base uppercase ">
                <tr>
                    <th class="border">Nível</th>
                    <th class="border">Descrição</th>
                    <th class="border">Orçamento</th>
                    <th class="border">Hora Homem</th>
                    <th class="border">Atribuição</th>
                </tr>
            </thead>
            <tbody class="text-lg">
               {Projeto.map((item) => (                
                  <tr key={item.id}>
                      <td class="border px-1 break-all">{item.ordem_projeto}</td>
                      <td class="border px-1 break-all">{item.nome_projeto}</td>
                      <td class="border px-1 break-all">{}</td>
                      <td class="border px-1 break-all"><form><input type="text" id="hora" name="hora" /></form></td>
                      <td class="border px-1 break-all">{}</td>
                  </tr>
          ))}
          {subProjeto.map((item) => (                
                  <tr key={item.id}>
                      <td class="border px-1 break-all">{item.ordem_sub_projeto}</td>
                      <td class="border px-1 break-all">{item.nome_sub_projeto}</td>
                      <td class="border px-1 break-all">{}</td>
                      <td class="border px-1 break-all"><form><input type="text" id="hora" name="hora" /></form></td>
                      <td class="border px-1 break-all">{}</td>
                  </tr>
          ))}
          {subNivel.map((item) => (                
                  <tr key={item.id}>
                      <td class="border px-1 break-all">{item.ordem_nivel_sub_projeto}</td>
                      <td class="border px-1 break-all">{item.nome_nivel_sub_projeto}</td>
                      <td class="border px-1 break-all">{}</td>
                      <td class="border px-1 break-all"><form><input type="text" id="hora" name="hora" /></form></td>
                      <td class="border px-1 break-all">{}</td>
                  </tr>
          ))}
            </tbody>
        </table>
        </div>
    );
}

export default FormValorHora;