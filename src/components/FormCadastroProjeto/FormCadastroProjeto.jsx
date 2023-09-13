import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import schemaProjetoInicial from "./validation";
import Button from "../Button";
import axios from "../../services/axios";

import { FiPlus } from "react-icons/fi";

function FormCadastroProjeto() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      valorHora: 0,
    },
    resolver: yupResolver(schemaProjetoInicial),
  });

  const [tabelaWBS, setTabelaWBS] = useState([
    {
      nivel: "1",
      descricao: "Objetivo Final",
      subnivel: [],
    },
  ]);

  const adicionarSubnivel = (nivelPai) => {
    if (nivelPai.split(".").length >= 3) {
      return;
    }

    const novoNivel = calcularProximoNivel(nivelPai);

    const novaLinha = {
      nivel: novoNivel,
      descricao: "Nova Descrição",
    };

    const novaTabela = [...tabelaWBS];

    const indexNivelPai = novaTabela.findIndex(
      (linha) => linha.nivel === nivelPai,
    );

    if (indexNivelPai !== -1) {
      let indexInsercao = indexNivelPai + 1;

      while (
        indexInsercao < novaTabela.length &&
        novaTabela[indexInsercao].nivel.startsWith(nivelPai)
      ) {
        indexInsercao++;
      }

      novaTabela.splice(indexInsercao, 0, novaLinha);
    } else {
      novaTabela.push(novaLinha);
    }

    setTabelaWBS(novaTabela);
  };

  const calcularProximoNivel = (nivelPai) => {
    const subniveisExistentes = tabelaWBS
      .filter((linha) => linha.nivel.toString().startsWith(nivelPai + "."))
      .map((linha) => linha.nivel);

    let proximoSubnivel = 1;
    while (subniveisExistentes.includes(`${nivelPai}.${proximoSubnivel}`)) {
      proximoSubnivel++;
    }

    return `${nivelPai}.${proximoSubnivel}`;
  };

  const cadastrarProjeto = async (data) => {
    const projeto = {
      nomeProjeto: data.nomeProjeto,
      descricaoProjeto: data.descricaoProjeto,
      valorHoraProjeot: data.valorHora,
      subProjeto: [],
    };

    const wbsProjeto = data.tabelaWBS[1];

    for (const subprojeto in wbsProjeto) {
      if (subprojeto !== "descricao") {
        projeto.subProjeto.push({
          nomeSubProjeto: wbsProjeto[subprojeto].descricao,
          moduloSubProjeto: [],
        });

        for (const modulo in wbsProjeto[subprojeto]) {
          if (modulo !== "descricao") {
            const indexSubProjeto = projeto.subProjeto.findIndex(
              (subprojetoAlvo) =>
                subprojetoAlvo.nomeSubProjeto ===
                wbsProjeto[subprojeto].descricao,
            );

            projeto.subProjeto[indexSubProjeto].moduloSubProjeto.push({
              nomeModuloSubProjeto: wbsProjeto[subprojeto][modulo].descricao,
            });
          }
        }
      }
    }

    //console.log(projeto)
    await axios.post("/cadastrar/projeto", projeto);
  };

  return (
    <form onSubmit={handleSubmit(cadastrarProjeto)}>
      <div className="mt-4 flex flex-col">
        <label
          htmlFor="nomeProjeto"
          className="text-on-light text-base font-medium"
        >
          Título do Projeto
        </label>
        <input
          type="text"
          id="nomeProjeto"
          className="border-n70 w-1/2 rounded-md border p-1"
          {...register("nomeProjeto")}
        />
        {errors?.nomeProjeto && (
          <label
            htmlFor="nomeProjeto"
            className="text-error text-sm font-light"
          >
            {errors.nomeProjeto.message}
          </label>
        )}
      </div>
      <div className="mt-4 flex flex-col">
        <label
          name="descricaoProjeto"
          className="text-on-light text-base font-medium"
        >
          Descrição
        </label>
        <input
          type="text"
          className="border-n70 w-1/2 rounded-md border p-1"
          {...register("descricaoProjeto")}
        />
        {errors?.descricaoProjeto && (
          <label
            htmlFor="descricaoProjeto"
            className="text-error text-sm font-light"
          >
            {errors.descricaoProjeto.message}
          </label>
        )}
      </div>
      <div className="mt-4 flex flex-col">
        <label name="valorHora" className="text-on-light text-base font-medium">
          Valor/Hora de trabalho
        </label>
        <input
          type="number"
          step="any"
          className="border-n70 w-1/2 rounded-md border p-1"
          {...register("valorHora")}
        />
        {errors?.valorHora && (
          <label htmlFor="valorHora" className="text-error text-sm font-light">
            {errors.valorHora.message}
          </label>
        )}
      </div>
      <div className="ml-5 mt-5">
        <h2 className="text-on-light text-xl font-semibold">WBS</h2>
        <table id="wbsTable" className="text-on-light  mt-5 w-1/3 text-left">
          <thead className="bg-primary98 text-base uppercase">
            <tr>
              <th className="px-4 py-2">Nível</th>
              <th className="px-4 py-2">Descrição</th>
              <th className="flex justify-center px-4 py-2">Ação</th>
            </tr>
          </thead>
          <tbody className="text-lg">
            {tabelaWBS.map((linha, index) => (
              <tr key={index}>
                <td className="px-4 py-1.5 font-semibold">{linha.nivel}</td>
                <td className="w-max px-4 py-1.5">
                  <input
                    type="text"
                    defaultValue={linha.descricao}
                    className="w-full"
                    {...register(`tabelaWBS[${linha.nivel}].descricao`)}
                  />
                </td>
                {linha.nivel.toLocaleString().split(".").length < 3 && (
                  <td className="flex justify-center px-4 py-1.5">
                    <Button
                      iconeOpcional={FiPlus}
                      tipo="button"
                      onClick={() => adicionarSubnivel(`${linha.nivel}`)}
                      className="bg-primary50 rounded-full"
                      iconeTamanho="24px"
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 flex justify-end gap-5">
        <Button
          texto="Cancelar"
          tipo="button"
          className=" text-bg22 border-bg22 flex items-center gap-0.5 rounded-[10px] border-2 p-2 text-lg font-semibold"
        />
        <Button
          texto="Confirmar"
          tipo="submit"
          className="bg-primary50 text-on-primary flex items-center rounded-[10px] p-2 text-lg font-semibold"
        />
      </div>
    </form>
  );
}

export default FormCadastroProjeto;
