const express = require('express')
const multer = require("multer");
const {setProfileImage} = require("../handler/user/command/SetProfileImageCommand");
const {adminDashboard} = require("../handler/user/query/AdminDashboardQuery");
const {getArchivesSupervisors} = require("../handler/user/query/GetArchivesSupervisorsQuery");
const {updateProfile} = require("../handler/user/command/UpdateProfileCommand");
const {changePassword} = require("../handler/user/command/ChangePasswordCommand");
const {getUsersProfile} = require("../handler/user/query/GetUsersProfileQuery");
const {userForgetPassword} = require("../handler/user/command/UserForgetPasswordCommand");
const {getUsersAutocomplete} = require("../handler/user/query/GetUsersAutocompleteQuery");
const {login} = require("../handler/user/command/LoginUserCommand");
const {getUsersArchives} = require("../handler/archive/query/GetUsersArchivesQuery");
const {deleteUser} = require("../handler/user/command/DeleteUserCommand");
const {UpsertUserData} = require("../handler/user/query/InsertUserDataQuery");
const {getSingleUser} = require("../handler/user/query/GetSingleUserQuery");
const {getAllUsers} = require("../handler/user/query/GetAllUsersQuery");
const {updateUser} = require("../handler/user/command/UpdateUserCommand");
const {firstGuard} = require("../authUtilities/Auth");
const {insertUser} = require("../handler/user/command/InsertUserCommand");
const {changeUsersPasswordAdmin} = require("../handler/user/command/ChangeUsersPasswordAdminCommand");
const {checkUsersToken} = require("../handler/user/query/CheckUsersToken");
const {getSupervisors} = require("../handler/user/query/GetSupervisorsQuery");
const router = express.Router()



//آپلود سند
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null,  Date.now()+"-"+file.originalname)
    }
})
const upload = multer({ storage: storage })


/*
@POST
@Body:{
    firstName,lastName,userName,password,phoneNumber,roleId(ObjectId)
}
@Access:{
    تعریف کاربر
}
*/
router.post('/insert/user',firstGuard,insertUser)

/*
@PUT
@Body:{
    firstName,lastName,userName,password,phoneNumber,roleId(ObjectId)
}
@Params:id
@Access:{
    کاربران
}
*/
router.put('/update/user/:id',firstGuard,updateUser)

/*
@GET
@Query : searchValue => firstName,lastName,phoneNumber,userName
@Access:{
    "تعریف کاربر","کاربران"
}
*/
router.get('/users',firstGuard,getAllUsers)

/*
@GET
@Params:id
@Access:{
    "تعریف کاربر","کاربران"
}
*/
router.get('/user/:id',firstGuard,getSingleUser)

/*
@GET

//disable
@Access:{
"تعریف کاربر","کاربران"
}
*/
router.get('/upsert/user/data',firstGuard,UpsertUserData)

/*
@DELETE

@Params : id(userId)
@Access:{
کاربران
}
*/
router.delete('/user/:id',firstGuard,deleteUser)

/*
@GET
به هیچی نیاز نداره
*/
router.get('/users/archives',firstGuard,getUsersArchives)

/*
@POST
@Body:password,userName
*/
router.post('/login',login)


/*
@GET
@Access:{
   'اشتراک گذاری اسناد با ایمیل','کاربران'
}
*/
router.get('/users/autocomplete',firstGuard,getUsersAutocomplete)


/*
@GET
@Body:{email,userName}
*/
router.post('/user/forget/password',userForgetPassword)


/*
@GET
*/
router.get('/users/profile',firstGuard,getUsersProfile)


/*
@PUT
@Body:{oldPassword,newPassword}
*/
router.put('/user/change/password',firstGuard,changePassword)


/*
@PUT
@Body:{oldPassword,newPassword}
*/
router.put('/user/update/profile',firstGuard,updateProfile)


/*
@GET
*/
router.get('/users/archives/supervisors',firstGuard,getArchivesSupervisors)


/*
@GET
@Access:{
    isAdmin
}
*/
router.get('/admin/dashboard',firstGuard,adminDashboard)


/*
@GET
*/
router.post('/user/profile/image',[firstGuard,upload.single("file")],setProfileImage)


/*
@GET
*/
router.put('/change/users/password/admin/:userId',firstGuard,changeUsersPasswordAdmin)




/*
@GET
*/
router.get('/check/user/token',checkUsersToken)


/**
 * @GET
 * res:{
 *     users that are supervisor
 * }
 */
router.get('/supervisors',firstGuard,getSupervisors)


module.exports = router
