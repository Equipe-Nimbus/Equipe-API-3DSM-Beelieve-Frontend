import { useFormik } from 'formik';
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
        className='rounded-md border border-n70 p-1 text-center w-8'
        onChange={handleValueChange}
        value={formik.values.number}
      />
  );
  
};

export default InputPaginacao;