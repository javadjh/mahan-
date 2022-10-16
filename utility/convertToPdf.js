const fs = require('fs')
module.exports.convertToPdf = async (document)=>{
    let outputPath
    if(document.ex==="png"||document.ex==="jpg"||document.ex==="jpge"||document.ex==="docx"||document.ex==="xlsm" || document.ex==="xlsx"||document.ex==="txt"){
        try {
            let path = "uploads\\\\\\\\" + document.documentName
            const ext = '.pdf'
            const inputPath = path;
            outputPath = path.substr(0,path.lastIndexOf("."))+".pdf"

            const docxBuf = await fs.readFileSync(inputPath);

            let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);

            await fs.writeFileSync(outputPath, pdfBuf);

            let file = await fs.readFileSync(outputPath)

            return file


        }catch (e){
            console.log(e)
        }

    }



}
