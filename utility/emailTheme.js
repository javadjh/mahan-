module.exports.emailTheme = (user,documentsText,expireDate,fileTitle,link,email,password)=>{
    return `
<!DOCTYPE html PUBLIC " -//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>
    </title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <style type="text/css">body, html {
        margin: 0px;
        padding: 0px;
        -webkit-font-smoothing: antialiased;
        text-size-adjust: none;
        width: 100% !important;
    }
    table td, table {
    }
    #outlook a {
        padding: 0px;
    }
    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
        line-height: 100%;
    }
    .ExternalClass {
        width: 100%;
    }
    @media only screen and (max-width: 480px) {
        table, table tr td, table td {
            width: 100% !important;
        }
        img {
            width: inherit;
        }
        .layer_2 {
            max-width: 100% !important;
        }
        .edsocialfollowcontainer table {
            max-width: 25% !important;
        }
        .edsocialfollowcontainer table td {
            padding: 10px !important;
        }
        .edsocialfollowcontainer table {
            max-width: 25% !important;
        }
        .edsocialfollowcontainer table td {
            padding: 10px !important;
        }
    }
    </style>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
</head>
<body style="padding:0; margin: 0;">
<table style="height: 100%; width: 100%; background-color: #efefef;" align="center">
    <tbody>
    <tr>
        <td valign="top" id="dbody" data-version="2.31" style="width: 100%; height: 100%; padding-top: 30px; padding-bottom: 30px; background-color: #efefef;">
            <!--[if (gte mso 9)|(IE)]><table align="center" style="max-width:600px" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
            <!--[if (gte mso 9)|(IE)]><table align="center" style="max-width:600px" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
            <!--[if (gte mso 9)|(IE)]><table align="center" style="max-width:600px" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
            <table class="layer_1" align="center" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; box-sizing: border-box; width: 100%; margin: 0px auto;">
                <tbody>
                <tr>
                    <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                        <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                        <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                        <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                        <div class="layer_2" style="max-width: 300px; display: inline-block; vertical-align: top; width: 100%;">
                            <table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%">
                                <tbody>
                                <tr>
                                    <td valign="top" class="edtext" style="padding: 20px; text-align: right; color: #5f5f5f; font-size: 16px; font-family: Tahoma, Geneva, sans-serif; word-break: break-word; direction: rtl; box-sizing: border-box;">
                                        <p style="text-align: left; font-size: 9px; margin: 0px; padding: 0px;">سامانه بایگانی ماهان</p>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <!--[if (gte mso 9)|(IE)]></td><td valign="top"><![endif]-->
                        <!--[if (gte mso 9)|(IE)]></td><td valign="top"><![endif]-->
                        <!--[if (gte mso 9)|(IE)]></td><td valign="top"><![endif]-->
                        <div class="layer_2" style="max-width: 300px; display: inline-block; vertical-align: top; width: 100%;">
                            <table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%">
                                <tbody>
                                <tr>
                                    <td valign="top" class="edtext" style="padding: 20px; text-align: right; color: #5f5f5f; font-size: 16px; font-family: Tahoma, Geneva, sans-serif; word-break: break-word; direction: rtl; box-sizing: border-box;">

                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                    </td>
                </tr>
                <tr>
                    <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                        <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                        <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                        <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                        <div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;">
                            <table class="edcontent" style="border-collapse: collapse;width:100%" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                <tr>
                                    <td class="edimg" valign="top" style="padding: 20px; box-sizing: border-box; text-align: center;">
                                        <a ><img style="border-width: 0px; border-style: none; max-width: 150px; width: 100%;" width="150" alt="Netssa Yeacomm Logo" src="https://s6.uupload.ir/files/emaillogo_tude.png"></a></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                    </td>
                </tr>
                <tr>
                    <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                        <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                        <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                        <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                        <div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;">
                            <table class="edcontent" style="border-collapse: collapse;width:100%" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                <tr>
                                    <td class="edimg" valign="top" style="padding: 10px; box-sizing: border-box; text-align: center;">
                                        <a ><img style="border-width: 0px; border-style: none; max-width: 579.961px; width: 100%;" width="579.961" alt="LTE Modem Yeacomm P11 4G/LTE" src="https://s6.uupload.ir/files/download_nglo.jpg"></a></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                    </td>
                </tr>
                <tr>
                    <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                        <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                        <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                        <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                        <div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;">
                            <table class="edcontent" style="border-collapse: collapse;width:100%" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                <tr>
                                    <td class="edtext" valign="top" style="padding: 20px; text-align: right; color: #5f5f5f; font-size: 16px; font-family: Tahoma, Geneva, sans-serif; word-break: break-word; direction: rtl; box-sizing: border-box;">
                                        <div class="text-center" style="text-align: center;">
                                            <font color="#000000" face="Arial, Helvetica, sans-serif">
                                  <span style="font-size: 32px;">
                                    <b>اسنادی از طرف کاربر ${user.lastName} ${user.firstName} ارسال شد
                                    </b>
                                  </span>
                                            </font>
                                        </div>
                                        <br>
                                        
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                    </td>
                </tr>
                <tr>
                    <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                        <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                        <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                        <div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;">
                            <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%">
                                <tbody>
                                <tr>
                                    <td valign="top" class="breakline" style="padding: 0px;">
                                        <div style="border-style: dotted none none; border-width: 6px 0px 0px; margin: 32px; border-top-color: #e0cfcf;">
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                    </td>
                </tr>
                <tr>
                    <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                        <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                        <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                        <div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;">
                            <table class="edcontent" style="border-collapse: collapse;width:100%;" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                <tr>
                                    <td class="edtext" valign="top" style="padding: 24px; text-align: right; color: #5f5f5f; font-size: 16px; font-family: Tahoma, Geneva, sans-serif; word-break: break-word; direction: rtl; box-sizing: border-box;">
                                        <p class="style1" style="margin: 0px; padding: 0px; color: #000000; font-size: 32px; font-family: Arial, Helvetica, sans-serif;">
                                        <h4>لیست اسناد</h4>
                                        ${documentsText}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                    </td>
                </tr>
                <tr>
                    <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                        <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                        <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                        <div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;">
                            <table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%">
                                <tbody>
                                <tr>
                                    <td valign="top" class="edtext" style="padding: 10px; text-align: right; color: #5f5f5f; font-size: 16px; font-family: Tahoma, Geneva, sans-serif; word-break: break-word; direction: rtl; box-sizing: border-box;">
                                        <p class="text-center" style="text-align: center; margin: 0px; padding: 0px;">تاریخ انقضا : ${expireDate}
                                            <br>
                                        </p>
                                        <p class="text-center" style="line-height: 1.75em; text-align: center; margin: 0px; padding: 0px;">
                                            <strong>پرونده : ${fileTitle}
                                                <br>
                                            </strong>
                                        </p>
                                        <p style="margin: 0px; padding: 0px;">
                                            <br>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="top" class="edtext" style="padding: 10px; text-align: right; color: #5f5f5f; font-size: 16px; font-family: Tahoma, Geneva, sans-serif; word-break: break-word; direction: rtl; box-sizing: border-box;">
                                        <p class="text-center" style="text-align: center; margin: 0px; padding: 0px;">اطلاعات کاربری موقت 
                                            <br>
                                        </p>
                                        <p class="text-center" style="line-height: 1.75em; text-align: center; margin: 0px; padding: 0px;">
                                            <strong>نام کاربری:  ${email}
                                                <br>
                                            </strong>
                                        </p>
                                        <p class="text-center" style="line-height: 1.75em; text-align: center; margin: 0px; padding: 0px;">
                                            <strong>رمز عبور:  ${password}
                                                <br>
                                            </strong>
                                        </p>
                                        <p style="margin: 0px; padding: 0px;">
                                            <br>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="top" class="edbutton" style="padding: 10px;">
                                        <table cellspacing="0" cellpadding="0" style="text-align: center;margin:0 auto;" align="center">
                                            <tbody>
                                            <tr>
                                                <td align="center" style="border-radius: 54px; padding: 8px; background: #235fd4;">
                                                    <a href="${link}" target="_blank" style="font-weight: bold; font-size: 25px; color: #ffffff; font-family: Helvetica, Arial, sans-serif; text-decoration: none; display: inline-block;"><span style="color: #ffffff;">مشاهده اسناد</span></a></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                    </td>
                </tr>
                <tr>
                    <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                        <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                        <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                        <div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;">
                            <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%">
                                <tbody>
                                <tr>
                                    <td valign="top" class="emptycell" style="padding: 20px;">
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                    </td>
                </tr>
                </tbody>
            </table>
            <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
            <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
            <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
        </td>
    </tr>
    </tbody>
</table>
</body>
</html>
`
}
