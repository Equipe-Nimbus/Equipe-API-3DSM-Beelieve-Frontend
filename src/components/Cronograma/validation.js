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
                if (valor !== '0') {
                  console.log(typeof valor)
                  const valorNumerico = parseFloat(valor.slice(0, -1))
                  return (
                    !isNaN(valorNumerico) &&
                    valorNumerico >= 0 &&
                    valorNumerico <= 100
                  )
                } else {
                  return true
                }
              },
            ),
        }),
      ),
    }),
  ),
})

export default schemaCronograma
