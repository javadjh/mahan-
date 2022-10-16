import React, {useContext, useState} from 'react'
import {ElementsContext} from "./ElementsContext";
import { v4 as uuidv4 } from 'uuid';
import {setManualFormPreviewAction} from "../../stateManager/actions/FormAction";
import {useDispatch} from "react-redux";

const InputElementComponent = ({option,isDisable,isPreview})=>{
    const validator = (value)=>{
        switch (option.pattern){
            // enum:['melliCode','phoneNumber','email','number']
            case "melliCode":
                if(value.length!==10){
                    setIsShowValidator(true)
                    setAlertText("شماره ملی صحیح نمیباشد")
                    if(!isPreview)
                        data.isValid = false
                }else{
                    let L=value.length;

                    if(L<8 || parseInt(value,10)==0) return false;
                    value=('0000'+value).substr(L+4-10);
                    if(parseInt(value.substr(3,6),10)==0) return false;
                    let c=parseInt(value.substr(9,1),10);
                    let s=0;
                    for(let i=0;i<9;i++)
                        s+=parseInt(value.substr(i,1),10)*(10-i);
                    s=s%11;
                    let isValid = (s<2 && c===s) || (s>=2 && c===(11-s));
                    setIsShowValidator(!isValid)
                    setAlertText("شماره ملی صحیح نمیباشد")
                    if(!isPreview)
                        data.isValid = isValid
                }
                break
            case "phoneNumber":
                if(value.length!==11){
                    setIsShowValidator(true)
                    setAlertText("شماره همراه صحیح نمیباشد")
                    if(!isPreview)
                        data.isValid = false
                }else{
                    setIsShowValidator(false)
                    if(!isPreview)
                        data.isValid = true
                }
                break
            case "email":
                if(!value.includes("@") || !value.includes(".")){
                    setIsShowValidator(true)
                    setAlertText("ایمیل صحیح نمیباشد")
                    if(!isPreview)
                        data.isValid = false
                }else{
                    setIsShowValidator(false)
                    if(!isPreview)
                        data.isValid = true
                }
                break
            case "number":
                if(!Number(value)){
                    setIsShowValidator(true)
                    setAlertText("عدد وارد کنید فقط")
                    if(!isPreview)
                        data.isValid = false
                }else{
                    setIsShowValidator(false)
                    if(!isPreview)
                        data.isValid = true
                }
                break
        }
    }
    const [alertText,setAlertText] = useState()
    const {childrenList,setChildrenList} = useContext(ElementsContext)
    const [isShowValidator,setIsShowValidator] = useState(false)
    const [,setReload] = useState()
    let data = childrenList.find(c=> c.uiId===option.uiId)?childrenList.find(c=>c.uiId===option.uiId):{}
    const setChange = async ()=>{
        const index = childrenList.find(c=>c.uiId===option.uiId)
        let copy = childrenList
        copy[index] = data
        setChildrenList(copy)
        console.log(childrenList)
        setReload(uuidv4())
    }
    return(
        <>
            <div className="form-group">
                <label htmlFor="validationCustom04">{option.label}<span style={{color:"red"}}>{option.isRequired?" * ":""}</span></label>
                <input type={option.pattern==="number"?"number":"text"}
                       name={"input"}
                       disabled={isDisable}
                       value={data.answer}
                       onChange={(e)=>{
                           if(option.pattern==="melliCode" || option.pattern==="email"|| option.pattern==="phoneNumber"){
                               validator(e.target.value)
                           }else{
                               if(e.target.value.length>option.max || e.target.value.length<option.min){
                                   setIsShowValidator(true)
                                   if(!isPreview)
                                       data.isValid = false
                               }
                               else{
                                   setIsShowValidator(false)
                                   if(!isPreview)
                                       data.isValid = true
                               }
                               console.log(data)
                           }
                           if(!isPreview){
                               data.answer = e.target.value
                               setChange()
                           }
                       }}
                       className="form-control" id="validationCustom04"
                       placeholder={option.label} required/>
                {isShowValidator?(
                    <p style={{color:"red"}}>{alertText?alertText:`حداقل تعداد کاراکتر ${option.min} و همچنین حداکثر ${option.max}`}</p>
                ):null}
                <hr className={"mt-4 mb-0"}/>
            </div>
        </>
    )
}
export default InputElementComponent
