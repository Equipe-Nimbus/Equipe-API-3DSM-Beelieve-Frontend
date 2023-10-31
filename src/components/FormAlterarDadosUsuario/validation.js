import * as yup from "yup"

const schemaAtualizarUsuario = yup.object().shape({

    nomeUsuario: yup
        .string()
        .required("O campo Nome Completo é obrigatório")
        .nullable(),

    emailUsuario: yup
        .string()
        .required("O campo Email é obrigatório")
        .email("Email inválido"),

    senhaUsuario: yup
        .string()
        .required('A senha é obrigatória')
        .min(8, 'A senha deve ter pelo menos 8 caracteres'),

    confirmarSenhaUsuario: yup
        .string()
        .oneOf([yup.ref('senhaUsuario'), null], 'As senhas não coincidem')
        .required('Confirme a senha'),

    telefoneUsuario: yup
        .string()
        .required("O campo Telefone é obrigatório")
        .matches(
            /\(\d{2}\) \d{5}-\d{4}/,
            "O telefone deve estar no formato (99) 99999-9999"
        ),
})

export default schemaAtualizarUsuario
