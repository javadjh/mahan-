import React, {Fragment, useEffect, useState} from 'react'
import Select from "react-select";
import makeAnimated from "react-select/animated";
import moment from "moment-jalaali";
import {useDispatch, useSelector} from "react-redux";
import {insertEmailAction, updateEmailAction} from "../../stateManager/actions/EmailAction";
import {usersAutocompleteAction} from "../../stateManager/actions/UsersAction";
import generator from 'generate-password'
import PersianDatePickerComponent from "../../utility/PersianDatePickerComponent";
import {defaultDate} from "../../utility/dateUtil";
import {errorToast} from "../../utility/ShowToast";

const animatedComponents = makeAnimated();

const UpsertEmailDialog = ({isGetAll,documents,fileId,singleEmail})=>{
    const dispatch = useDispatch()
    const [usersReceiver,setUsersReceiver] = useState([])
    const [expireDate,setExpireDate] = useState(new Date().toISOString())
    const [singleDocuments,setSingleDocuments] = useState([])
    const [singleUsers,setSingleUsers] = useState([])
    const [emailInput,setEmailInput] = useState()
    const usersAutocomplete = useSelector(state => state.usersAutocomplete)



    useEffect(()=>{
       getData()
        if(singleEmail._id){
            setUpdateData()
        }else{
            setSingleDocuments([])
            setSingleUsers([])
            setExpireDate(new Date().toISOString())
            setUsersReceiver('')
        }
    },[singleEmail])

    const addUserReceiver = () => {
        if(!emailInput.includes("@"))
            return;
        if(!emailInput.includes("."))
            return;
        let data = {
            userName:emailInput,
            password:generator.generate({
                length:12,
                numbers:true,
            })
        }
        let usersReceiverCopy = [...usersReceiver]
        usersReceiverCopy.push(data)
        setUsersReceiver(usersReceiverCopy)
        setEmailInput('')
    }

    const removeUserReceiver = (user) => {
        let usersReceiverCopy = [...usersReceiver]
        usersReceiverCopy = usersReceiverCopy.filter(u=>u!==user)
        setUsersReceiver(usersReceiverCopy)
    }

    const setUpdateData = ()=>{
        console.log(singleEmail)
        setExpireDate(singleEmail.expireDate)
        documents = singleEmail.documents
        setSingleDocuments(documents)
        if(singleEmail.usersReceiver){
            console.log(singleEmail.usersReceiver)
            setUsersReceiver(singleEmail.usersReceiver)
        }

    }

    const getData = async ()=>{
        await dispatch(usersAutocompleteAction())
    }


    const sendData = async ()=>{
        if(usersReceiver.length>0){
            if(singleEmail._id){
                await dispatch(updateEmailAction(singleEmail._id,{
                    expireDate,
                    usersReceiver,
                    documents:singleDocuments
                },fileId))
            }
            console.log(usersReceiver)
            if(!singleEmail._id){
                await dispatch(insertEmailAction({
                    expireDate,
                    usersReceiver,
                    isGetAll,
                    documents,
                    fileId
                },fileId))
            }
        }else{
            errorToast("ایمیل ها را وارد کنید")
        }

    }

    const removeDocument = (document)=>{
        let copySingleDocuments = [...singleDocuments]
        copySingleDocuments = copySingleDocuments.filter(d=>d!==document)
        setSingleDocuments(copySingleDocuments)
    }
    const removeUser = (user)=>{
        let usersCopy = [...singleUsers]
        usersCopy = usersCopy.filter(u=>u!==user)
        setSingleUsers(usersCopy)
    }
    return(
        <Fragment>
            <div className="modal fade " id="upsertEmailDialog" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content p-4">
                        <p>اشتراک گذاری پرونده (ایمیل)</p>
                        <div className={"row mb-1 "}>
                            <div className={`col-lg-6 mb-1`}>
                                <label>آدرس ایمیل</label>
                                <div className={"row"}>
                                    <input type="text"
                                           dir={"ltr"}
                                           name={"emailInput"}
                                           value={emailInput}
                                           onChange={(e)=>{
                                               setEmailInput(e.target.value)
                                           }}
                                           className="form-control col-lg-8" id="validationCustom04"
                                           placeholder="...آدرس ایمیل" />
                                    <button onClick={addUserReceiver} className={"btn btn-dark"} style={{marginRight:5}}>افزودن</button>
                                </div>
                            </div>
                            <div className={`col-lg-6`}>
                                {/*<input type="text"
                                       name={"expireDate"}
                                       value={expireDate}
                                       onChange={(e)=>{
                                           if(e.target.value.length===10){
                                               try {
                                                   const finalDate = moment(e.target.value).locale('fa').format('YYYY/MM/DD')
                                                   if(finalDate!=="Invalid date"){
                                                       setExpireDate(finalDate)
                                                       setIsDateValid(true)
                                                   }else{
                                                       setIsDateValid(false)
                                                   }
                                               }catch (e){
                                                   setIsDateValid(false)
                                               }
                                           }else{
                                               setIsDateValid(false)
                                           }
                                           setExpireDate(e.target.value)
                                       }}
                                       className="form-control" id="validationCustom04"
                                       placeholder="تاریخ انقضا اشتراک گذاری..." />*/}
                               <label>تاریخ انقضا ایمیل</label>
                                <PersianDatePickerComponent value={expireDate} onSelect={(moment)=>{
                                    const miladiDate = moment.format("MM/DD/YYYY")
                                    const persianDate = moment.format("jYYYY/jMM/jDD")
                                    console.log(persianDate)
                                    console.log(miladiDate)
                                    setExpireDate(moment)
                                }}/>
                            </div>
                        </div>
                        {usersReceiver?(
                            <div className="button-items">
                                <p className={"my-1"}>لیست ایمیل های ارسال شده</p>
                                {usersReceiver.map(u=>(
                                    <button onClick={()=>{
                                        removeUserReceiver(u)
                                    }} className={"btn btn-info waves-effect waves-light ml-0 mr-1 mt-0"}>{u.userName}</button>
                                ))}
                            </div>
                        ):null}

                        {singleDocuments.length?(
                            <>
                                <p className={"my-1 mx-0"}>اسناد ارسال شده</p>
                                <div className={"row mr-1"}>
                                    {singleDocuments.map(d=>(
                                        <div style={{width:180}}>
                                            <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
                                                <div className={"btn btn-dark btn-block "}>{d.title.substr(0,15)}</div>
                                                <i className={"mdi mdi-close-box"} style={{color:"red",fontSize:24}} onClick={()=>{
                                                    removeDocument(d)
                                                }}/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>

                        ):null}


                        <div className={"row mx-1"}>
                            <div className={"col-lg-9"}></div>
                            <button onClick={sendData} className={"btn btn-success mt-3 col-lg-3"}>ثبت</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default UpsertEmailDialog
