const moment = require('jalali-moment')

module.exports.convertToShamsi = (date)=>{
    return moment(date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
}

module.exports.convertToMiladi = (date)=>{
    return moment.from(date, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');
}
module.exports.daysCalculate = (date1, date2)=> {

    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1 - date2);

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);

}
module.exports.getMonth = (date,local="fa")=>{
    const month = date.substr(5,2)
    switch (parseInt(month)){
        case 1:
            if(local==="fa") {
                return "فروردین"
            }else{
                return "Jan"
            }
        case 2:
            if(local==="fa") {
                return "اردیبهشت"
            }else{
                return "Feb"
            }
        case 3:
            if(local==="fa") {
                return "خرداد"
            }else{
                return "Mar"
            }
        case 4:
            if(local==="fa") {
                return "تیر"
            }else{
                return "Apr"
            }
        case 5:
            if(local==="fa") {
                return "مرداد"
            }else{
                return "May"
            }
        case 6:
            if(local==="fa") {
                return "شهریور"
            }else{
                return "June"
            }
        case 7:
            if(local==="fa") {
                return "مهر"
            }else{
                return "July"
            }
        case 8:
            if(local==="fa") {
                return "آبان"
            }else{
                return "Aug"
            }
        case 9:
            if(local==="fa") {
                return "آذر"
            }else{
                return "Sept"
            }
        case 10:
            if(local==="fa") {
                return "دی"
            }else{
                return "Oct"
            }
        case 11:
            if(local==="fa") {
                return "بهمن"
            }else{
                return "Nov"
            }
        case 12:
            if(local==="fa") {
                return "اسفند"
            }else{
                return "Dec"
            }
    }
}
module.exports.getDay = (date)=>{
    const day = date.substr(8,10)
    return parseInt(day)
}
