import * as yup from "yup"

const schemaCadastroUsuario = yup.object().shape({
    nomeUsuario: yup
      .string()
      .required("Nome é obrigatório"),
  
    cpfUsuario: yup
      .string()
      .max(11, "Máximo de 11 caracteres")
      .required("CPF é obrigatório"),

      emailUsuario: yup
      .string()
      .required("Email é obrigatório"),
  
    senhaUsuario: yup
      .passord()
      .required("Senha é obrigatória"),
  
    cargoUsuario: yup
      .string()
      .required("")
  })

export default schemaCadastroUsuario