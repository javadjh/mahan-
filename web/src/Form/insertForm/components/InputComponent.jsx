import React, {Fragment, useContext, useEffect, useState} from 'react'
import { v4 as uuidv4 } from 'uuid';

import {UpsertFormContext} from "../UpsertFormContext";
import {useDispatch} from "react-redux";
import {setManualFormPreviewAction} from "../../../stateManager/actions/FormAction";
const InputComponent = ({uiId})=>{
    const dispatch = useDispatch()
    const {childrenList,setChildrenList,onUpOrDownHandle,deleteData} = useContext(UpsertFormContext)
    const [,setReload] = useState()
    const [clearRadios,setClearRadios] = useState()
    const [hasPattern,setHasPattern] = useState(false)
    const [inputTypeText,setInputTypeText] = useState('دریافت متن ساده')
    let data = childrenList.find(c=>c.uiId===uiId)?childrenList.find(c=>c.uiId===uiId):{}
    useEffect(()=>{
        init()
    },[data])


    const init = ()=>{
        data = childrenList.find(c=>c.uiId===uiId)
        if(data){
            setClearRadios(data.pattern?data.pattern:undefined)
            if(data.inputType==="melliCode"){
                onChangeLabel("کد ملی")
                setClearRadios("melliCode")
                onChangeType("melliCode")
                setHasPattern(true)
                setInputTypeText("دریافت کد ملی")
            }else if(data.inputType==="email"){
                onChangeLabel("ایمیل")
                setClearRadios("email")
                onChangeType("email")
                setHasPattern(true)
                setInputTypeText("دریافت ایمیل")
            }else if(data.inputType==="phoneNumber"){
                onChangeLabel("شماره تماس")
                setClearRadios("phoneNumber")
                onChangeType("phoneNumber")
                setHasPattern(true)
                setInputTypeText("دریافت شماره تماس")
            }else if(data.inputType==="number"){
                onChangeLabel("شماره")
                setClearRadios("number")
                onChangeType("number")
                setHasPattern(true)
                setInputTypeText("دریافت عدد")
            }else if(data.inputType==="unique"){
                onChangeLabel("ورودی یکتا")
                setClearRadios("unique")
                onChangeType("unique")
                setHasPattern(true)
                setInputTypeText("عنوان ورودی یکتا")
            }
        }
    }
    const onChangeIsRequired = (isChecked)=>{
        console.log(isChecked)
        data.isRequired = isChecked
        setChange()
    }

    const onChangeMin=(value)=>{
        console.log(value)
        data.min = value
        setChange()
    }
    const onChangeMax=(value)=>{
        console.log(value)
        data.max = value
        setChange()
    }

    const onChangeType=(value)=>{
        console.log(value)
        data.pattern = value
        setChange()
    }

    const onChangeLabel=(value)=>{
        console.log(value)
        data.label = value
        setChange()
    }

    const setChange = async ()=>{
        const index = childrenList.find(c=>c.uiId===uiId)
        let copy = childrenList
        copy[index] = data
        setChildrenList(copy)
        console.log(childrenList)
        setReload(uuidv4())
        await dispatch(setManualFormPreviewAction(childrenList))
    }
    return(
        <Fragment>
            {data.type?(
                <div>
                    <div>
                        <div className={"row text-center mb-0"}>
                            <i className="mdi mdi-text-recognition mx-3 mb-0" style={{fontSize:20}}/>
                            <p className={"mb-0"}>{inputTypeText}</p>
                        </div>
                    </div>
                    <div>
                        <div className={"row ml-1 mx-0 col-lg-12"}>

                            <div className="custom-control custom-checkbox col-lg-5 mt-2 ">
                                <input type="checkbox" className="custom-control-input"
                                       onClick={(e)=>{
                                           onChangeIsRequired(e.target.checked)
                                       }}
                                       checked={data.isRequired} id={uiId}/>
                                <label className="custom-control-label" htmlFor={uiId}>آیا اجباری میباشد؟</label>
                            </div>
                            {!hasPattern?(
                                <div className={"col-lg-7 row"}>
                                    <div className={"col-lg-6"}>
                                        <input id="txtFirstNameBilling"
                                               type="number"
                                               value={data.min}
                                               onChange={(e)=>{
                                                   onChangeMin(Number(e.target.value))
                                               }}
                                               placeholder={"حداقل (کاراکتر)"}
                                               className="form-control mx-1"/>
                                    </div>
                                    <div className={"col-lg-6"}>
                                        <input id="txtFirstNameBilling"
                                               type="number"
                                               value={data.max}
                                               onChange={(e)=>{
                                                   onChangeMax(Number(e.target.value))
                                               }}
                                               placeholder={"حداکثر (کاراکتر)"}
                                               className="form-control mx-1"/>
                                    </div>

                                </div>
                            ):null}
                        </div>
                        <div className={"col-lg-13 row p-0 ml-2"}>
                            <div style={{display:"flex",flexDirection:"column"}} className={"mx-1"}>
                                <i className="mdi mdi-arrow-up m-0 text-center" style={{fontSize:15,cursor:"pointer"}}
                                   onClick={()=>onUpOrDownHandle(uiId,false)}/>
                                <a className={"text-center"}>{data.sortNumber}</a>
                                <i className="mdi mdi-arrow-down m-0 text-center" style={{fontSize:15,cursor:"pointer"}}
                                   onClick={()=>onUpOrDownHandle(uiId,true)}/>
                            </div>
                            <input id="txtFirstNameBilling"
                                   type="text"
                                   value={data.label}
                                   onChange={(e)=>{
                                       onChangeLabel(e.target.value)
                                   }}
                                   placeholder={"عنوان / برچسب"}
                                   className="form-control col-lg-11 mt-3"/>
                        </div>
                        {/*<span className={"mx-2"}>در صورت انتخاب الگو نیاز به انتخاب حداقل و حداکثر نمیباشد</span>
                        <div className="custom-radio mb-2 col-lg-12 row mt-3" >
                            <div className="custom-control custom-radio mx-2">
                                <input type="radio" id={`number${uiId}`}
                                       checked={clearRadios === "number"}
                                       onClick={()=>{
                                           setClearRadios("number")
                                           onChangeType("number")
                                       }}
                                       name={`customRadio${uiId}`} className="custom-control-input"/>
                                <label className="custom-control-label" htmlFor={`number${uiId}`}>عدد</label>
                            </div>
                            <div className="custom-control custom-radio mx-2">
                                <input type="radio" id={`phoneNumber${uiId}`}
                                       checked={clearRadios === "phoneNumber"}
                                       onClick={()=>{
                                           setClearRadios("phoneNumber")
                                           onChangeType("phoneNumber")
                                       }}
                                       name={`customRadio${uiId}`} className="custom-control-input"/>
                                <label className="custom-control-label" htmlFor={`phoneNumber${uiId}`}>شماره تماس</label>
                            </div>

                            <div className="custom-control custom-radio mx-2">
                                <input type="radio" id={`email${uiId}`}
                                       checked={clearRadios === "email"}
                                       onClick={()=>{
                                           setClearRadios("email")
                                           onChangeType("email")
                                       }}
                                       name={`customRadio${uiId}`} className="custom-control-input"/>
                                <label className="custom-control-label" htmlFor={`email${uiId}`}>ایمیل</label>
                            </div>
                            <div className="custom-control custom-radio mx-2">
                                <input type="radio" id={`melliCode${uiId}`}
                                       checked={clearRadios === "melliCode"}
                                       onClick={()=>{
                                           setClearRadios("melliCode")
                                           onChangeType("melliCode")
                                       }}
                                       name={`customRadio${uiId}`} className="custom-control-input"/>
                                <label className="custom-control-label" htmlFor={`melliCode${uiId}`}>شماره ملی</label>
                            </div>

                            <button type="button"
                                    onClick={()=>{
                                        setClearRadios(undefined)
                                        onChangeType(undefined)
                                    }}
                                    className="btn btn-secondary btn-sm waves-effect waves-light px-2 py-0">نیاز به الگو نیست</button>
                        </div>*/}
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div className={"col-lg-10"}>

                        </div>

                        <button
                            onClick={()=>deleteData(uiId)}
                            type="button" className="btn btn-link waves-effect float-left col-lg-2" style={{color:"red"}}>حذف از فرم</button>
                    </div>
                    <hr/>
                </div>
            ):null}
        </Fragment>
    )
}
export default InputComponent
