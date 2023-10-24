import { useFormik } from 'formik';
import { number } from 'prop-types';
import { useEffect } from 'react';
import * as Yup from 'yup';

const InputPaginacao = ({ min, max, onValueChange, paginaAtual }) => {
	const validacao = Yup.object().shape({
    number: Yup.number()
      .min(min, `Deve ser maior ou igual a ${min}`)
      .max(max, `Deve ser menor ou igual a ${max}`)
  });
  
  const formik = useFormik({
    initialValues: {
      number: paginaAtual,
    },
    validacao,
    onSubmit: (values) => {
      // Lidar com a submissão do formulário, se necessário
      console.log(values);
    },
  });
  
  const handleValueChange = (e) =>{
	if(e.target.value <= max && e.target.value >= min){
		formik.handleChange(e); // Atualiza o valor no formik
    	onValueChange(e.target.value); // Chame a função no componente pai
	}
	else if(e.target.value === ""){
		formik.handleChange(e);
	}
  }
  
  useEffect(() => {
    // Atualize o valor do campo sempre que o valor das props for alterado
    if (paginaAtual !== formik.values.number) {
      formik.setValues({ number: paginaAtual });
    }
  }, [paginaAtual]);
  
  return(
	  <input
        type="text"
        id="number"
        name="number"
        onChange={handleValueChange}
        value={formik.values.number}
      />
  );
  
};

export default InputPaginacao;