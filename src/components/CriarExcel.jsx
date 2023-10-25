function CriarExcel({projeto}){
    var xlsx = require('xlsx')
    const jsonObject = require(projeto)
    var workBook = xlsx.utils.book_new()
    var workSheet = xlsx.utils.json_to_sheet(jsonObject)
    xlsx.utils.book_append_sheet(workBook, workSheet)
    xlsx.writeFile(workBook, "projeto")
}

export default CriarExcel