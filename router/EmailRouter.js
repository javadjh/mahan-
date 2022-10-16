const express = require('express')
const {updateEmail} = require("../handler/email/command/UpdateEmailCommand");
const {getDocumentsFileEmail} = require("../handler/email/query/GetDocumentsFileEmailQuery");
const {getFilesEmailsHistory} = require("../handler/email/query/GetFilesEmailsHistoryQuery");
const {getEmailsDocuments} = require("../handler/email/query/GetEmailsDocumentsQuery");
const {insertEmail} = require("../handler/email/command/InsertEmailCommand");
const {firstGuard} = require("../authUtilities/Auth");
const router = express.Router()


/*
@POST
@Body:{documents,usersReceiver,expireDate}
@Access:{
   اشتراک گذاری اسناد با ایمیل
}
*/
router.post('/insert/email',[firstGuard],insertEmail)


/*
@GET
@Params:id
@Access:{
   فقط لاگین بکنه
}
*/
router.get('/email',[firstGuard],getEmailsDocuments)


/*
@GET
//fileId
@Params:id
@Access:{
   نمایش سندها
}
*/
router.get('/emails/:id',[firstGuard],getFilesEmailsHistory)


/*
@GET
//document And emailId
@Params:document,emailId

*/
router.get('/email/document',[firstGuard],getDocumentsFileEmail)


/*
@PUT
//emailId And emailId
@Params:id
@body:{documents,usersReceiver,expireDate}
@Access:{
   اشتراک گذاری اسناد با ایمیل
}
*/
router.put('/update/email/:id',[firstGuard],updateEmail)


module.exports = router
