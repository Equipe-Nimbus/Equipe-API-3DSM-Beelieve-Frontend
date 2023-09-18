import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FormValorHora() {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await axios.get(''); // entrar com a tabela
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    return(
        <table class="table-fixed text-on-light  mt-5 w-1/3 text-left border-collapse border-spacing-0.5 border">
            <thead class="bg-primary98 text-base uppercase ">
                <tr>
                    <th class="border">Nível</th>
                    <th class="border">Descrição</th>
                    <th class="border">Orçamento</th>
                    <th class="border">Hora Homem</th>
                    <th class="border">Atribuição</th>
                </tr>
            </thead>
            <tbody class="text-lg">
                <tr>
                    <td >a</td>
                    <td>{}</td>
                    <td>{}</td>
                    <td>{}</td>
                    <td>{}</td>
                </tr>
            {/* {data.map((row) => (
                <tr key={row}>
                    <td class="border">{}</td>
                    <td class="border">{}</td>
                    <td class="border">{}</td>
                    <td class="border"><form><input type="text" id="hora" name="hora" /></form></td>
                    <td class="border">{}</td>
                </tr>
            ))} */}
            </tbody>
        </table>
    );
}

export default FormValorHora;