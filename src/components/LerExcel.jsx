import { useState } from 'react';
import { json } from 'react-router-dom';
import * as XLSX from "xlsx";
 
function LerExcel() {
    
    const [data, setdata] = useState([])
 
    const handleFileUpload = (e) =>{
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, {type: "binary"});
            const sheetName = workbook.SheetNames[1];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); 
            const selectedData = parsedData.map(row => [row[0]]);

            setdata(selectedData);
        };
    }

    const jsonWBS = JSON.stringify(data.map(item => {
        const value = item.toString();
        const valueArray = value.split(' ');
    
        let result = {};
    
        if (valueArray.length === 1) {
        } else {
            result.usavel = value;
        }
        
        return result;
    }));
    
    const parsedJsonWBS = JSON.parse(jsonWBS);
    const filteredWBS = parsedJsonWBS.filter(obj => Object.keys(obj).length !== 0);
    filteredWBS.pop()
      
    const niveis = filteredWBS.reduce((acc, item, index) => {
        const dots = (item.usavel ?? '').trim().split('.').length - 1;
      
        if (index === 0) {
          acc.projeto = (item.usavel ?? '').trim();
        } else if (dots === 1) {
          if (!acc.subProjeto) {
            acc.subProjeto = [];
          }
          acc.subProjeto.push((item.usavel ?? '').trim());
        } else if (dots === 2) {
          if (!acc.subNivel) {
            acc.subNivel = [];
          }
          acc.subNivel.push((item.usavel ?? '').trim());
        }
      
        return acc;
      }, {});

    console.log(niveis);

    return (
        <div>
            <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="bg-primary50 text-on-primary mb-5  flex items-center gap-0.5 rounded-[10px] p-2 text-lg font-semibold"
            />

<tbody>
    {data.map((row, index) => (
        <tr key={index}>
            <td>{row[0]}</td>
        </tr>
    ))}
</tbody>
        </div>
    )
}    

export default LerExcel