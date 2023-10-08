export function formatarEstrutura(projeto, tabelaWBS){

  //console.log('TABELA QUE CHEGA PRA FORMATAR: ', tabelaWBS)
    const novaEstruturaPacotes = []
    let nivelSubProjeto = ""
    tabelaWBS.forEach((linha) => {
      if (linha.nivel.length === 3) {
        novaEstruturaPacotes.push({
          id_sub_projeto: linha.id,
          ordem_sub_projeto: linha.nivel,
          nome_sub_projeto: linha.descricao,
          orcamento_sub_projeto: linha.orcamento,
          hora_humano_sub_projeto: parseFloat(linha.hora_homem),
          materiais_sub_projeto: linha.materiais,
          nivel_sub_projeto: [],
        })

        nivelSubProjeto = linha.nivel
      }

      if (linha.nivel.length > 3 && linha.nivel.startsWith(nivelSubProjeto)) {
        const indexSubProjeto = novaEstruturaPacotes.findIndex(
          (subprojeto) => subprojeto.ordem_sub_projeto === nivelSubProjeto,
        )

        novaEstruturaPacotes[indexSubProjeto].nivel_sub_projeto.push({
          id_nivel_sub_projeto: linha.id,
          ordem_nivel_sub_projeto: linha.nivel,
          nome_nivel_sub_projeto: linha.descricao,
          orcamento_nivel_sub_projeto: linha.orcamento,
          materiais_nivel_sub_projeto: linha.materiais,
          hora_humano_nivel_sub_projeto: parseFloat(linha.hora_homem)
        })
      }
    })

    projeto.sub_projetos = novaEstruturaPacotes

    //cálculos para lidar com alterações na estrutura 
    projeto.sub_projetos.forEach((subprojeto) => {
      if(subprojeto.nivel_sub_projeto.length > 0) {
        let orcamentoSubProjeto = 0
        let horaHomemSubProjeto = 0
        let materialSubProjeto = 0
        subprojeto.nivel_sub_projeto.forEach((nivel) => {
          orcamentoSubProjeto = orcamentoSubProjeto + nivel.orcamento_nivel_sub_projeto
          horaHomemSubProjeto = horaHomemSubProjeto + nivel.hora_humano_nivel_sub_projeto
          materialSubProjeto = materialSubProjeto + nivel.materiais_nivel_sub_projeto
        })

        subprojeto.orcamento_sub_projeto = orcamentoSubProjeto
        subprojeto.hora_humano_sub_projeto = horaHomemSubProjeto
        subprojeto.materiais_sub_projeto = materialSubProjeto
      }
    })

    let orcamentoTotalProjeto = 0
    let horaHomemTotalProjeto = 0
    let materialTotalProjeto = 0
    projeto.sub_projetos.forEach((subprojeto) => {
      orcamentoTotalProjeto = orcamentoTotalProjeto + subprojeto.orcamento_sub_projeto
      horaHomemTotalProjeto = horaHomemTotalProjeto + subprojeto.hora_humano_sub_projeto
      materialTotalProjeto = materialTotalProjeto + subprojeto.materiais_sub_projeto
    })

    projeto.orcamento_projeto = orcamentoTotalProjeto
    projeto.hora_humano_total = horaHomemTotalProjeto
    projeto.materiais_projeto = materialTotalProjeto

    //console.log('ESTRUTURA QUE SAI: ', estrutura)
    return projeto
}