import * as yup from "yup";

const schemaInsercaoAtividade = yup.object().shape({
  descricaoAtividade: yup
    .string()
    .required("Descrição é obrigatória"),

  resultadoEsperadoAtividade: yup
    .string()
    .max(120, "Máximo de 120 caracteres"),
    //.required("Resultado esperado é obrigatório"),

  statusAtividade: yup
    .number()
    .typeError("Somente números")
    .oneOf([0, 1], "Status deve ser 0 ou 1"),
    //.required("Status da atividade é obrigatório (Somente 1 ou 0)"),

  prazoAtividade: yup
    .date() 
    .typeError("Data inválida")
});

export default schemaInsercaoAtividade;
