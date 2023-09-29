export function formatarEstrutura(tabelaWBS){

  //console.log('TABELA QUE CHEGA PRA FORMATAR: ', tabelaWBS)

    const estrutura = []
    let nivelSubProjeto = ""
    tabelaWBS.forEach((linha) => {
      if (linha.nivel.length === 3) {
        estrutura.push({
          id_sub_projeto: linha.id,
          ordem_sub_projeto: linha.nivel,
          nome_sub_projeto: linha.descricao,
          orcamento_sub_projeto: linha.orcamento,
          hora_humano_sub_projeto: parseFloat(linha.hora_homem),
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
          orcamento_nivel_sub_projeto: linha.orcamento,
          hora_humano_nivel_sub_projeto: parseFloat(linha.hora_homem)
        })
      }
    })



    //console.log('ESTRUTURA QUE SAI: ', estrutura)
    return estrutura
}