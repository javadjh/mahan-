import React from "react";
import MainLayout from "../RootComponent/MainLayout";
import UsersProfileComponent from "../dashboard/UsersProfileComponent";
import ResetPasswordDialog from "../dialog/ResetPasswordDialog";
const ProfileRootComponent = ({history})=>{
    return(
        <MainLayout title={"نمایه کاربری"}>
            <ResetPasswordDialog/>
            <div className={"row mx-2"}>
                <div className={"col-lg-4"}>
                    <div className={"custom-cursor"} onClick={()=>{
                        history.goBack()
                    }}>
                        <i className={"mdi mdi-arrow-right"} style={{fontSize:20}}/>
                        <span style={{marginTop:5,marginRight:2}}>بازگشت</span>
                    </div>
                    <UsersProfileComponent/>
                </div>
            </div>
        </MainLayout>
    )
}
export default ProfileRootComponent
