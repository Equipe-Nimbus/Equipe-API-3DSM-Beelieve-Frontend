import React from "react";
import * as XLSX from "xlsx";

function CriarExcel({projeto}){

    const excelData = [
        {   "Ordem Projeto": projeto.ordem_projeto,
            "Projeto": projeto.nome_projeto }
    ].concat(
        projeto.sub_projetos.map(sub_projeto => ({
            "Ordem Sub-projeto": sub_projeto.ordem_sub_projeto,
            "Sub-projeto": sub_projeto.nome_sub_projeto,
        }))
    );

    const gerarExcel = (data) =>{
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "DataSheet.xlsx");
    }

    return(
        <button onClick={()=>gerarExcel(excelData)}>Download Excel</button>
    )
}

export default CriarExcel