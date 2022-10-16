import React, {Fragment, useContext, useEffect, useState} from 'react'
import {ArchiveTreeContext} from "../ArchiveTreeContext";
import {ArchiveTreeLineContext} from "../archiveTreeLine/ArchiveTreeLineContext";
import {mainArchiveTreesFormAction} from "../../stateManager/actions/ArchiveTreeAction";
import {useDispatch, useSelector} from "react-redux";
import {RootContext} from "../../RootComponent/RootContext";
import {getAllFormsAction} from "../../stateManager/actions/FormAction";

const ArchiveTreeSettingDialog = ({inTree = true,currentArchiveTree})=>{
    const {singleTreeData,changeArchiveTreeSettingHandle} = useContext(inTree?ArchiveTreeContext:ArchiveTreeLineContext)
    const [lang,setLang] = useState('both')

    useEffect(()=>{
        if(singleTreeData.title){
            setLang(singleTreeData.lang?singleTreeData.lang:'both')
        }else{
            setLang('both')
        }
    },[singleTreeData])



    const dispatch = useDispatch()
    const {handleHide} = useContext(RootContext)
    const forms = useSelector(state => state.forms)
    const singleArchive = useSelector(state => state.singleArchive.archive)
    const reloadMainParentArchiveTree = useSelector(state => state.reloadMainParentArchiveTree)
    const [form,setForm] = useState()
    const [isFormRequired,setIsFormRequired] = useState(false)
    useEffect(()=>{

        getData()
        if(currentArchiveTree)
            if(currentArchiveTree._id){
                setForm(currentArchiveTree.form)
                setIsFormRequired(currentArchiveTree.isFormRequired)
            }else{
                setForm(``)
                setIsFormRequired(false)
            }
    },[singleArchive,currentArchiveTree,reloadMainParentArchiveTree])
    const getData = async ()=>{
        if(!handleHide("انتخاب فرم برای بایگانی"))
            await dispatch(getAllFormsAction())
    }

    const onSubmitClickListener = async ()=>{
        await changeArchiveTreeSettingHandle({lang})
        if(currentArchiveTree)
            if(currentArchiveTree.isMain)
                await dispatch(mainArchiveTreesFormAction(currentArchiveTree._id,{formSelected:form,isFormRequired}))

    }

    return(
        <Fragment>
            <div className="modal fade" id="archiveTreeSettingDialog" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content p-4">
                        <div >
                            <h6 className={"mb-0 mt-3"}>انتخاب زبان قفسه</h6>
                            <div className={"row"}>
                                <div className={"col-lg-9"}>
                                    <div className="custom-control custom-radio mx-2 mt-1">
                                        <input type="radio" id={`en`}
                                               onClick={()=>{
                                                   setLang("en")
                                               }}
                                               checked={lang==="en"}
                                               name={`customRadio`} className="custom-control-input"/>
                                        <label className="custom-control-label" htmlFor={`en`}>انگلیسی (en)</label>
                                    </div>
                                    <div className="custom-control custom-radio mx-2 mt-1">
                                        <input type="radio" id={`fa`}
                                               onClick={()=>{
                                                   setLang("fa")
                                               }}
                                               checked={lang==="fa"}
                                               name={`customRadio`} className="custom-control-input"/>
                                        <label className="custom-control-label" htmlFor={`fa`}>فارسی (fa)</label>
                                    </div>
                                </div>

                                {/*<div className={"col-lg-3"} onClick={()=>{

                                }}>
                                    <button className={"btn btn-success btn-block"}>ثبت</button>
                                </div>*/}


                            </div>


                            {currentArchiveTree?(
                                <>
                                    {currentArchiveTree.isMain?(
                                        <span hidden={handleHide("انتخاب فرم برای بایگانی")}>
                                            <h6 className={"mb-0 mt-5"}>انتخاب روکش اسناد زیر مجموعه</h6>
                                            <div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <div className={"row "}>
                                                            <div className={"col-lg-6 mt-4"}>
                                                                <div className="custom-control custom-checkbox">
                                                                    <input type="checkbox" className="custom-control-input"
                                                                           onClick={()=>{
                                                                               setIsFormRequired(!isFormRequired)
                                                                           }}
                                                                           checked={isFormRequired}
                                                                           id={"isFormRequired"}/>
                                                                    <label className="custom-control-label mt-2" htmlFor={"isFormRequired"}>روکش سند برای این قفسه فعال شود.</label>
                                                                </div>
                                                            </div>
                                                            {isFormRequired?(
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="validationCustom04">انتخاب فرم</label>
                                                                        <select className="custom-select" onChange={(e)=>{
                                                                            setForm(e.target.value)
                                                                        }}>
                                                                            <option value={``} name={``}>انتخاب کنید</option>
                                                                            {forms.map(f=>(
                                                                                <option selected={form===f._id} value={f._id} name={f._id}>{f.title}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            ):null}

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </span>
                                    ):null}
                                </>
                            ):null}

                            <div className={"row"}>
                                <div className={"col-lg-9"}>

                                </div>
                                <div className={"col-lg-3"} onClick={onSubmitClickListener}>
                                    <button className={"btn btn-success btn-block"}>ثبت</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ArchiveTreeSettingDialog
