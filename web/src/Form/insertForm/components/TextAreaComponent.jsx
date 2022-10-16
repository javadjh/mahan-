import React, {Fragment, useContext, useEffect, useState} from 'react'
import {UpsertFormContext} from "../UpsertFormContext";
import { v4 as uuidv4 } from 'uuid';
import {useDispatch} from "react-redux";
import {setManualFormPreviewAction} from "../../../stateManager/actions/FormAction";

const TextAreaComponent = ({uiId})=>{
    const dispatch = useDispatch()
    const {childrenList,setChildrenList,onUpOrDownHandle,deleteData} = useContext(UpsertFormContext)
    const [,setReload] = useState()
    let data = childrenList.find(c=>c.uiId===uiId)?childrenList.find(c=>c.uiId===uiId):{}
    useEffect(()=>{
        init()
    },[data])
    const init = ()=>{
        data = childrenList.find(c=>c.uiId===uiId)
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
                    <div className={"row text-center mb-0"}>
                        <i className="mdi mdi-format-text-rotation-down-vertical mx-3 mb-0" style={{fontSize:20}}/>
                        <p className={"mb-0"}>نوشتن چند خطی</p>
                    </div>
                    <div>
                        <div className={"row my-2 mx-0 col-lg-12"}>

                            <div className="custom-control custom-checkbox col-lg-5 mt-2">
                                <input type="checkbox" className="custom-control-input"
                                       onClick={(e)=>{
                                           onChangeIsRequired(e.target.checked)
                                       }}
                                       checked={data.isRequired} id={uiId}/>
                                <label className="custom-control-label" htmlFor={uiId}>آیا اجباری میباشد؟</label>
                            </div>
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
                                <div className={"col-lg-6  col-lg-6"}>
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
                                      rows={5}
                                      value={data.label}
                                      onChange={(e)=>{
                                          onChangeLabel(e.target.value)
                                      }}
                                      placeholder={"عنوان / برچسب"}
                                      className="form-control col-lg-11 mt-3"/>
                        </div>
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
export default TextAreaComponent
