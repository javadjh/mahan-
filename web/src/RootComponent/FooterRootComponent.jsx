import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getAppInfoAction} from "../stateManager/actions/AppSettingAction";
import {store} from "../stateManager/Store";
const FooterRootComponent = ()=>{
    const dispatch = useDispatch()
    const appInfo = useSelector(state => state.appInfo)
    useEffect(()=>{
        dispatch(getAppInfoAction())
    },[])
    return(
        <footer className="footer text-center" style={{
            display:"block",
            position: "fixed",
            bottom:0,
            zIndex:100,
        }}>

            <div className="container-fluid">
                <div className="row">
                    <span className="col-sm-8">
                        تمام حقوق این سامانه متعلق به شرکت لیلو هوشمند سازان اروند می باشد - 1401 © lilooco.com
                    </span>
                    <span className="col-sm-4">

                            سامانه مدیریت اسناد ماهان ({appInfo.version})

                    </span>
                </div>
            </div>
        </footer>
    )
}
export default FooterRootComponent
