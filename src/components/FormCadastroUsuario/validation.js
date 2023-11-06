import * as yup from "yup"
import { isValidCPF } from './cpfValidation';

const schemaCadastroUsuario = yup.object().shape({

    nomeUsuario: yup
        .string()
        .required("O campo Nome Completo é obrigatório"),

    emailUsuario: yup
        .string()
        .required("O campo Email é obrigatório")
        .email("Email inválido"),

    cpfUsuario: yup
        .string()
        .required("O campo CPF é obrigatório")
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
        .test('cpf-valido', 'CPF inválido', (value) => {
            return isValidCPF(value);
        }),

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

export default schemaCadastroUsuario
