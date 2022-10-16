import React, {useContext, useEffect, useState} from 'react'
import {ElementsContext} from "./ElementsContext";
import { v4 as uuidv4 } from 'uuid';
import {Checkbox} from "antd";

const CheckElementComponent = ({option,isDisable,isPreview})=>{
    const [values,setValues] = useState([])
    const {childrenList,setChildrenList} = useContext(ElementsContext)
    const [isShowValidator,setIsShowValidator] = useState(false)
    const [,setReload] = useState()
    let data = childrenList.find(c=> c.uiId===option.uiId)?childrenList.find(c=>c.uiId===option.uiId):{}
    useEffect(()=>{
        console.log("data.values")
        console.log("data.values")
        console.log("data.values")
        console.log("data.values")
        console.log("data.values")
        console.log("data.values")
        console.log(data.values)
        setValues(data.values?data.values:[])
    },[data])
    const setChange = ()=>{
        const index = childrenList.find(c=>c.uiId===option.uiId)
        let copy = childrenList
        copy[index] = data
        setChildrenList(copy)
        console.log(childrenList)
        setReload(uuidv4())
    }
    return(
        <div className="form-group">


            <label htmlFor="validationCustom04">{option.label}<span style={{color:"red"}}>{option.isRequired?" * ":""}</span></label>
            <div className="button-items">
                {values.map((v,index)=>(
                    <div>
                        <Checkbox disabled={isDisable} onClick={()=>{
                            console.log("cdddddddddddddddcd")
                            if(!data.answer){
                                data.answer = []
                            }
                            if(data.answer.includes(v))
                                data.answer = data.answer.filter(a=>a!==v)
                            else
                                data.answer.push(v)
                            if(option.isRequired && data.answer.length<=0){
                                setIsShowValidator(true)
                                data.isValid = false
                            }else{
                                setIsShowValidator(false)
                                data.isValid = true
                            }
                            if(!isPreview)
                                setChange()
                        }}>{v}</Checkbox>
                    </div>
                    /*<div className="mb-2" >
                        <div className="custom-control custom-checkbox">
                            <input
                                disabled={isDisable}
                                onClick={()=>{
                                    console.log("cdddddddddddddddcd")
                                    if(!data.answer){
                                        data.answer = []
                                    }
                                    if(data.answer.includes(v))
                                        data.answer = data.answer.filter(a=>a!==v)
                                    else
                                        data.answer.push(v)
                                    if(option.isRequired && data.answer.length<=0){
                                        setIsShowValidator(true)
                                        data.isValid = false
                                    }else{
                                        setIsShowValidator(false)
                                        data.isValid = true
                                    }
                                    if(!isPreview)
                                        setChange()
                                }} type="checkbox" className="custom-control-input" id={v}/>
                            <label className="custom-control-label" htmlFor={v}>{v}</label>
                        </div>
                    </div>*/
                ))}
                {isShowValidator?(
                    <p style={{color:"red"}}>لطفا این فیلد را وارد کنید</p>
                ):null}
                <hr className={"mt-4 mb-0"}/>
            </div>
        </div>
    )
}
export default CheckElementComponent
