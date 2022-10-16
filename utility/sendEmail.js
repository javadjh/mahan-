const nodemailer = require("nodemailer");
const AppSettingModel = require("../model/AppSettingModel");
const {convertToShamsi} = require("./dateUtility");
const {emailTheme} = require("./emailTheme");
module.exports.sendEmail = async (email, subject, user,link,documents,expireDate,file,usersReceiver) => {
    const appSetting = await AppSettingModel.findOne()
    let documentsText = ''
    documents.map(d=>{
        documentsText += `<br/>• ${d.title}`
    })
    expireDate = convertToShamsi(expireDate)
    try {
        const transporter = nodemailer.createTransport({
            host: appSetting.mailHost,
            port: appSetting.mailPort,
            secure: true,
            auth: {
                user: appSetting.mailUser,
                pass: appSetting.mailPassword,
            }
        });
        for (let index = 0; index < usersReceiver.length; index++) {
            // Specify what the email will look like
            const mailOpts = {
                from: appSetting.mail,
                to: usersReceiver[index].userName,
                subject: subject,
                // text: text,
                html: emailTheme(user,documentsText,expireDate,file.title,link,usersReceiver[index]._id,usersReceiver[index].password)
            };
            // Attempt to send the email
            await transporter.sendMail(mailOpts, (error, response) => {
                if (error) {
                    console.log(error);
                    console.log("It failed!");
                } else {
                    console.log("email sended");
                }
            });
        }
    } catch (error) {
        console.log(error, "email not sent");
    }
};


module.exports.sendForgetPasswordEmail = async (email,firstName,lastName,userName,password) => {
    const appSetting = await AppSettingModel.findOne()
    try {
        const transporter = nodemailer.createTransport({
            host: appSetting.mailHost,
            port: appSetting.mailPort,
            secure: true,
            auth: {
                user: appSetting.mailUser,
                pass: appSetting.mailPassword,
            }
        });
        // Specify what the email will look like
        const mailOpts = {
            from: appSetting.mail,
            to: email,
            subject: "سامانه بایگانی ماهان - رمز جدید ارسال شد",
            text: `
                نام و نام خانوادگی : ${firstName} ${lastName}
                نام کاربری : ${userName}
                رمز جدید : ${password}
            `,
        };
        // Attempt to send the email
        await transporter.sendMail(mailOpts, (error, response) => {
            if (error) {
                console.log(error);
                console.log("It failed!");
            } else {
                console.log("email sended");
            }
        });
    } catch (error) {
        console.log(error, "email not sent");
    }
};
