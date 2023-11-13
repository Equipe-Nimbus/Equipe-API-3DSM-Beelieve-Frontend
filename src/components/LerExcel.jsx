import React, {useState} from 'react';
import * as XLSX from "xlsx";
import Swal from 'sweetalert2'
import { GrUploadOption } from 'react-icons/gr'


function LerExcel({ niveisExcel, setniveisExcel }) {
    const [arquivoSelecionado, setArquivoSelecionado] = useState(null)

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        setArquivoSelecionado(file)
        if (file) {
            const fileName = file.name;
            const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
            if (fileExtension === "xlsx" || fileExtension === "xls") {
                const reader = new FileReader();
                reader.readAsBinaryString(e.target.files[0]);
                reader.onload = (e) => {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: "binary" });
                    const sheetName = workbook.SheetNames[1];
                    const sheet = workbook.Sheets[sheetName];
                    const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                    const selectedData = parsedData.map(row => [row[0]]);
                    const jsonWBS = JSON.stringify(selectedData.map(item => {
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
                    var filteredWBS = parsedJsonWBS.filter(obj => Object.keys(obj).length !== 0);
                    filteredWBS.pop()


                    var filteredWBS = filteredWBS.reduce((acc, item, index) => {
                        const dots = (item.usavel ?? '').trim().split('.').length - 1;
                        const splitValue = (item.usavel ?? '').trim().split(' ');

                        if (index === 0) {
                            if (!acc.subProjeto) {
                                acc.subProjeto = [];
                            }
                            acc.subProjeto.push({
                                nivel: splitValue.shift().replace('.', ''),
                                descricao: splitValue.join(' ')
                            });
                        } else if (dots === 1 || dots === 2) {
                            if (!acc.subProjeto) {
                                acc.subProjeto = [];
                            }
                            acc.subProjeto.push({
                                nivel: splitValue.shift(),
                                descricao: splitValue.join(' ')
                            });
                        }

                        return acc;

                    }, {});
                    setniveisExcel(filteredWBS)
                };
            } else {
                e.target.value = "";
                Swal.fire('Por favor, selecione um arquivo .xlsx ou .xls.', '', 'error');
            }
        }
    }

    return (
        <div className='flex flex-col gap-2 justify-center mb-5'>
            <label className="relative inline-flex items-center space-x-2 px-4 py-2 bg-primary50 text-on-primary rounded-lg cursor-pointer w-fit">
            <span className="text-lg font-semibold">Subir um arquivo</span>
            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                className="hidden"
            />
            <GrUploadOption size='20px'/>
            </label>
            {arquivoSelecionado && (
                <p className="text-base font-medium text-on-light">Arquivo selecionado: {arquivoSelecionado.name}</p>
            )}
        </div>
    )
}

export default LerExcel