import * as yup from "yup"

const schemaCronograma = yup.object().shape({
  cronograma: yup.array().of(
    yup.object().shape({
      niveis: yup.array().of(
        yup.object().shape({
          progresso_planejado: yup
            .string()
            .test(
              "porcentagem-invalida",
              "Porcentagem deve estar entre 0 e 100",
              (valor) => {
                let valorNumerico = 0
                if (valor.slice(-1) === '%') {
                  valorNumerico = parseFloat(valor.slice(0, -1))
                } else {
                  valorNumerico = parseFloat(valor)
                }
                
                return (
                  !isNaN(valorNumerico) &&
                  valorNumerico >= 0 &&
                  valorNumerico <= 100
                )
              },
            ),
        }),
      ),
    }),
  ),
})

export default schemaCronograma
