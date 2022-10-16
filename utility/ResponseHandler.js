module.exports.errorResponse = (res,message)=>{
    let error = message
    switch (message){
        case 1:
            error = "خطا در ثبت اطلاعات رخ داد"
            break
        case 2:
            error = "یافت نشد"
            break
        case 3:
            error = "خطا در حذف رخ داد"
            break
        case 4:
            error = "خطا در بروزرسانی رخ داد"
            break
        case 5:
            error = "ای دی ارسال شده مشکل دارد"
            break
        case 6:
            error = "شما دسترسی به این بخش را ندارید"
            break
    }
    return res.status(400).send({error:error})
}
