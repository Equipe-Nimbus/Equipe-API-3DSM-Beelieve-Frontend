import * as yup from "yup"

const schemaInsercaoAtividade = yup.object().shape({
  tarefas: yup.array().of(
    yup.object().shape({
      descricao: yup
        .string()
        .required("Descrição é obrigatória"),

      resultadoEsperado: yup
        .string()
        .required("Resultado esperado é obrigatório"),

      status: yup
        .boolean(),

      peso: yup
        .number()
        .positive()
        .integer()
        .required(),

      prazo: yup
        .date()
        .nullable(),

      tendencia: yup
        .date()
        .nullable(),
    }),
  ),
})

export default schemaInsercaoAtividade
