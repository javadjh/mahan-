import React, {useContext, useEffect, useRef, useState} from "react";
import MainLayout from "../../RootComponent/MainLayout";
import BaseInformationUpsertUserComponent from "./BaseInformationUpsertUserComponent";
import SecondInformationUpsertUserComponent from "./SecondInformationUpsertUserComponent";
import {validatorSP} from "../../utility/formValidator";
import {UpsertUserContext} from "./UpsertUserContext";
import {useDispatch, useSelector} from "react-redux";
import {insertUserAction, updateUserAction, upsertUserDataAction} from "../../stateManager/actions/UsersAction";
import {useHistory} from "react-router";
const UpsertUserRootComponent = ()=>{
    let history =useHistory()
    const dispatch = useDispatch()
    const upsertUserData = useSelector(state => state.upsertUserData)
    const singleUser = useSelector(state => state.singleUser)
    const {
        firstName,setFirstName,
        id,setId,
        email,setEmail,
        lastName,setLastName,
        phoneNumber,setPhoneNumber,
        userName,setUserName,
        password,
        dataRole,setDataRole,
        formValidator,
        position,setPosition,
        showMelliCodeError,setShowMelliCodeError,
        setReloadValidator,
        fileAccess
    } = useContext(UpsertUserContext)

    useEffect(()=>{
        getData()
    },[])

    const getData = async ()=>{
        await dispatch(upsertUserDataAction())
    }

    useEffect(()=>{
        if(singleUser._id){
            setId(singleUser._id)
            setFirstName(singleUser.firstName)
            setLastName(singleUser.lastName)
            setPhoneNumber(singleUser.phoneNumber)
            setUserName(singleUser.userName)
            setDataRole(singleUser.role)
            setId(singleUser._id)
            setEmail(singleUser.email)
            setPosition(singleUser.position)
            setShowMelliCodeError(false)
        }
    },[singleUser])
    const sendData = async ()=>{
        if(!showMelliCodeError){
            if(singleUser._id){
                if(dataRole &&
                    firstName &&
                    lastName &&
                    phoneNumber &&
                    position &&
                    userName){
                    await dispatch(updateUserAction(singleUser._id,{
                        role:dataRole,
                        firstName,
                        lastName,
                        phoneNumber,
                        position,
                    },history))
                }
            }else{
                if(formValidator.current.allValid()){
                    let data = {
                        role:dataRole,
                        firstName,
                        lastName,
                        phoneNumber,
                        userName,
                        email,
                        position,
                    }
                    if(singleUser._id)
                        await dispatch(updateUserAction(singleUser._id,data,history))
                    else{
                        data.password = password
                        await dispatch(insertUserAction(data,history))
                    }
                }else{
                    formValidator.current.showMessages()
                    setReloadValidator(0)
                }
            }
        }
    }
    return(
        <MainLayout title={singleUser._id?"ویرایش کاربر":"افزودن کاربر جدید"}>
            <div className="btn-group-fab" role="group" aria-label="FAB Menu">
                <div>
                    {/*<button onClick={sendData} type="button" className="btn btn-main btn-success has-tooltip" data-placement="left"
                            title="افزودن کاربر"><i className="mdi mdi-plus-thick" style={{fontSize:29}}></i></button>*/}
                </div>
            </div>
            <div>
                <div className={"row ml-2"}>
                    <BaseInformationUpsertUserComponent/>
                    <SecondInformationUpsertUserComponent getData={getData} upsertUserData={upsertUserData} sendData={sendData}/>
                </div>
            </div>
        </MainLayout>
    )
}
export default UpsertUserRootComponent
