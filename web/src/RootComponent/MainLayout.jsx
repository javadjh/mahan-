import React from 'react'
import AppSettingDialog from "../dialog/AppSettingDialog";
import ResetPasswordDialog from "../dialog/ResetPasswordDialog";
import {useHistory, useLocation} from "react-router";
const MainLayout = ({isMain=false,children,title="عنوان را وارد کنید",html,history})=>{
    history = useHistory()
    const location = useLocation();
    window.onbeforeunload = function() {
        /*if(location.pathname!=="/archive-trees")
            localStorage.clear();*/
    }
    return(
        <div className="page-content m-0 px-0 mx-1">

            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                        <div className={"row mx-3"}>
                            <i hidden={isMain} className={"mdi mdi-arrow-right mt-2 page-title custom-cursor"} style={{color:"white",fontSize:25}} onClick={()=>{
                                history.goBack()
                            }}/>
                            <h4 className="page-title mb-0 font-size-18 mx-3 mt-2">{title}</h4>
                        </div>
                        <span>{html}</span>
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}
export default MainLayout
