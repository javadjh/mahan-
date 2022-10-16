import moment from "moment-jalaali";
export const defaultDate = (isShamsi)=>{
    console.log("isShamsi?moment().locale('fa').format('jYYYY/jMM/jDD'):moment().locale('fa').format('DD/MM/YYYY')")
    console.log(isShamsi?moment().locale('fa').format('jYYYY/jMM/jDD'):moment().locale('fa').format('DD/MM/YYYY'))
    return isShamsi?moment().locale('fa').format('jYYYY/jMM/jDD'):moment().locale('fa').format('DD/MM/YYYY')
}
