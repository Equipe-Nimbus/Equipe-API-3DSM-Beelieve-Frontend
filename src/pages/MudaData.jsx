import React, { useState } from "react";
import axios from "../services/axios";


function MudaData() {
	
	const [dataNova, setDataNova] = useState()
	
	const handleSubmit = async (evento) => {
		evento.preventDefault();
		let data = {
			dataNova:dataNova
		}
		
		try{
			await axios.post("/data/muda", data)
		}
		catch(error){}
	}
	
	return(
		<form onSubmit={handleSubmit}>
			<label htmlFor="novaData">Nova data:</label> <br/>
			<input
				id="novaData"
				type="date"
          		value={dataNova}
          		onChange={(e) => setDataNova(e.target.value)}
			/><br/>
			<button type="submit">Enviar</button>	
		</form>
	)
}
export default MudaData