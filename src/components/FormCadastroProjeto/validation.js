import * as yup from "yup"

const schemaProjetoInicial = yup.object().shape({
  nomeProjeto: yup
    .string()
    .required("Título é obrigatório"),

  descricaoProjeto: yup
    .string()
    .max(120, "Máximo de 120 caracteres")
    .required("Descrição é obrigatória"),

  valorHora: yup
    .number(),

  prazoProjeto: yup
    .number()
    .nullable()
    .moreThan(0, 'Se preenchido, deve ser maior do que 0'),

  chefeProjeto: yup
    .string()
    .required("É necessário atribuir um Engenheiro Chefe")
    
})

export default schemaProjetoInicial
