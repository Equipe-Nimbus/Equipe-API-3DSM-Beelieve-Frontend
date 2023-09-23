import React, { useEffect } from "react"
import Button from "./Button"

import { FiPlus, FiMinus } from "react-icons/fi"

function TabelaWbs({ tabelaWBS, setTabelaWBS, edicaoNivel1 }) {
	
	
  const gerarTabela = (tabelaWBS) => {
    return (
      <table id="wbsTable" className="mt-5 w-1/3 text-left text-on-light">
        <thead className="bg-primary98 text-base uppercase">
          <tr>
            <th className="w-1/6 px-4 py-2">Nível</th>
            <th className="w-3/6 px-4 py-2">Descrição</th>
            <th className="w-2/6">Ação</th>
          </tr>
        </thead>
        <tbody className="text-lg">
          {tabelaWBS.map((linha, index) => (
            <tr key={index}>
              <td className="w-1/4 px-4 py-1.5 font-semibold">{linha.nivel}</td>
              <td className="w-1/4 px-4 py-1.5">
              {!edicaoNivel1 && linha.nivel === "1" ?
              	<input
                  type="text"
                  className="w-full"
                  value={tabelaWBS[index].descricao}
                  onChange={(e) => handleDescricaoSubProjeto(e, index)}
                  disabled
                /> :
                <input
                  type="text"
                  className="w-full"
                  value={tabelaWBS[index].descricao}
                  onChange={(e) => handleDescricaoSubProjeto(e, index)}
                  
                />
              }
              </td>
              {linha.nivel.toLocaleString().split(".").length < 3 && (
                <Button
                  iconeOpcional={FiPlus}
                  tipo="button"
                  onClick={() => adicionarSubnivel(`${linha.nivel}`)}
                  className="m-2 rounded-full bg-primary50"
                  iconeTamanho="24px"
                />
              )}
              {linha.nivel !== "1" && (
                <Button
                  iconeOpcional={FiMinus}
                  tipo="button"
                  onClick={() => removerNivel(`${linha.nivel}`)}
                  className="m-2 rounded-full bg-n40"
                  iconeTamanho="24px"
                  iconeCor="white"
                />
              )}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  const adicionarSubnivel = (nivelPai) => {
    if (nivelPai.split(".").length >= 3) {
      return
    }

    const novoNivel = calcularProximoNivel(nivelPai)

    const novaLinha = {
      nivel: novoNivel,
      descricao: "Nova Descrição",
    }

    const novaTabela = [...tabelaWBS]

    const indexNivelPai = novaTabela.findIndex(
      (linha) => linha.nivel === nivelPai,
    )

    if (indexNivelPai !== -1) {
      let indexInsercao = indexNivelPai + 1

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
      .filter((linha) => linha.nivel.toString().startsWith(nivelPai + "."))
      .map((linha) => linha.nivel)

    let proximoSubnivel = 1
    while (subniveisExistentes.includes(`${nivelPai}.${proximoSubnivel}`)) {
      proximoSubnivel++
    }

    return `${nivelPai}.${proximoSubnivel}`
  }

  const handleDescricaoSubProjeto = (evento, index) => {
    const novaDescricao = evento.target.value
    const novaTabela = [...tabelaWBS]
    novaTabela[index].descricao = novaDescricao
    setTabelaWBS(novaTabela)
  }

  const removerNivel = (nivelPai) => {
    const indiceNivelRemovido = tabelaWBS.findIndex(
      (linha) => linha.nivel === nivelPai,
    )

    const novaTabela = [...tabelaWBS]

    nivelPai = nivelPai.split(".")

    if (nivelPai.length === 3) {
      novaTabela.splice(indiceNivelRemovido, 1)

      let novaOrdem = 1
      novaTabela.forEach((linha) => {
        const nivelQuebrado = linha.nivel.split(".")

        if (
          nivelQuebrado.length === 3 &&
          nivelQuebrado.slice(0, 2).toString() ===
            nivelPai.slice(0, 2).toString()
        ) {
          linha.nivel = `${
            nivelPai.slice(0, 2).toString().replaceAll(",", ".") +
            "." +
            novaOrdem.toString()
          }`
          novaOrdem++
        }
      })
    } else if (nivelPai.length === 2) {
      const subNiveisAfetados = novaTabela.filter((linha) => {
        return (
          linha.nivel.split(".").slice(0, 2).toString() === nivelPai.toString()
        )
      }).length

      novaTabela.splice(indiceNivelRemovido, subNiveisAfetados)

      let novaOrdem = 1
      let novaOrdemSubnivel = 1
      let nivelAntigo = ""
      let novoNivel = ""
      novaTabela.forEach((linha) => {
        const nivelQuebrado = linha.nivel.split(".")

        if (nivelQuebrado.length === 2) {
          nivelAntigo = linha.nivel.split(".")
          novoNivel = linha.nivel = `${"1." + novaOrdem}`
          novaOrdem++
        }

        if (
          nivelQuebrado.length > 2 &&
          nivelQuebrado.slice(0, 2).toString() === nivelAntigo.toString()
        ) {
          console.log("chegou")
          linha.nivel = `${novoNivel + "." + novaOrdemSubnivel}`
          novaOrdemSubnivel++
        }
      })
    }

    setTabelaWBS(novaTabela)
  }

  return <>{gerarTabela(tabelaWBS)}</>
}

export default TabelaWbs
