import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FormValorHora() {


    return(
        <div class="bg-bg100 m-5 rounded-md p-7 drop-shadow-md">
        <table class="table-fixed mt-5 w-2/3 text-center">
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
                    <td class="border px-1 break-all">a</td>
                    <td class="border px-1 break-all">{}</td>
                    <td class="border px-1 break-all">{}</td>
                    <td class="border px-1 break-all"><form><input type="text" id="hora" name="hora" /></form></td>
                    <td class="border px-1 break-all">{}</td>
                </tr>
            {/* {data.map((row) => (
                <tr key={row}>
                    <td class="border px-1 break-all">{}</td>
                    <td class="border px-1 break-all">{}</td>
                    <td class="border px-1 break-all">{}</td>
                    <td class="border px-1 break-all"><form><input type="text" id="hora" name="hora" /></form></td>
                    <td class="border px-1 break-all">{}</td>
                </tr>
            ))} */}
            </tbody>
        </table>
        </div>
    );
}

export default FormValorHora;