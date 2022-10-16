import React, {Fragment, useContext, useEffect, useState} from "react";
import InputElementComponent from "../../Form/Elements/InputElementComponent";
import CheckElementComponent from "../../Form/Elements/CheckElementComponent";
import RadioElementComponent from "../../Form/Elements/RadioElementComponent";
import SelectorElementComponent from "../../Form/Elements/SelectorElementComponent";
import TextAreaElementComponent from "../../Form/Elements/TextAreaElementComponent";
import DateElementComponent from "../../Form/Elements/DateElementComponent";
import DateMiladiElementComponent from "../../Form/Elements/DateMiladiElementComponent";
import {RootContext} from "../../RootComponent/RootContext";
import {useSelector} from "react-redux";
import {ElementsContext} from "../Elements/ElementsContext";
const FormPreviewDialog = ()=>{
    const {fileForm,childrenList} = useContext(ElementsContext)
    const formState = useSelector(state => state.fileStatistic)
    const formPreview = useSelector(state => state.formPreview)
    const [form,setForm] = useState([])
    useEffect(()=>{
        setForm(formPreview)
    },[formState,childrenList,formPreview])
    const {handleHide} = useContext(RootContext)
    return(
        <Fragment>
            <div>
                <div >
                    <div className="modal-content p-4">
                        <h6>{fileForm.form.title}</h6>
                        <p>{fileForm.form.description}</p>
                        <p>فرم زیر را تکمیل کنید</p>
                        {form?form.map(c=>(
                            <>
                                {c.type==="input"?(
                                    <InputElementComponent option={c} isDisable={handleHide("ویرایش روکش پرونده")} />
                                ):null}
                                {c.type==="checkBox"?(
                                    <CheckElementComponent option={c} isDisable={handleHide("ویرایش روکش پرونده")}/>
                                ):null}
                                {c.type==="radio"?(
                                    <RadioElementComponent option={c} isDisable={handleHide("ویرایش روکش پرونده")}/>
                                ):null}
                                {c.type==="selector"?(
                                    <SelectorElementComponent option={c} isDisable={handleHide("ویرایش روکش پرونده")}/>
                                ):null}
                                {c.type==="textArea"?(
                                    <TextAreaElementComponent option={c} isDisable={handleHide("ویرایش روکش پرونده")}/>
                                ):null}
                                {c.type==="date"?(
                                    <DateElementComponent option={c} isDisable={handleHide("ویرایش روکش پرونده")}/>
                                ):null}
                                {c.type==="dateMiladi"?(
                                    <DateMiladiElementComponent option={c} isDisable={handleHide("ویرایش روکش پرونده")}/>
                                ):null}
                            </>
                        )):null}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default FormPreviewDialog
