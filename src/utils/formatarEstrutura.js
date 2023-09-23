export function formatarEstrutura(tabelaWBS){

    const estrutura = []
    let nivelSubProjeto = ""
    tabelaWBS.forEach((linha) => {
      if (linha.nivel.length === 3) {
        estrutura.push({
          id_sub_projeto: linha.id,
          ordem_sub_projeto: linha.nivel,
          nome_sub_projeto: linha.descricao,
          nivel_sub_projeto: [],
        })

        nivelSubProjeto = linha.nivel
      }

      if (linha.nivel.length > 3 && linha.nivel.startsWith(nivelSubProjeto)) {
        const indexSubProjeto = estrutura.findIndex(
          (subprojeto) => subprojeto.ordem_sub_projeto === nivelSubProjeto,
        )

        estrutura[indexSubProjeto].nivel_sub_projeto.push({
          id_nivel_sub_projeto: linha.id,
          ordem_nivel_sub_projeto: linha.nivel,
          nome_nivel_sub_projeto: linha.descricao,
        })
      }
    })

    return estrutura
}