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
    .number()
    .required("Valor/Hora é obrigatório")
    .positive("Valor/Hora é obrigatório")
})

export default schemaProjetoInicial
