import React, {Fragment, useContext, useEffect, useState} from "react";
import MainLayout from "../../RootComponent/MainLayout";
import FormsTableComponent from "./FormsTableComponent";
import {useDispatch, useSelector} from "react-redux";
import {deleteFormAction, getAllFormsAction, setFormEventAction} from "../../stateManager/actions/FormAction";
import {useHistory} from "react-router";
import AlertDialog from "../../utility/AlertDialog";
import {RootContext} from "../../RootComponent/RootContext";
import ShowFileFormDialog from "../../ArchiveTree/dialog/ShowFileFormDialog";
const FormsRootComponent = ()=>{
    const {handleHide} = useContext(RootContext)
    const history = useHistory()
    const forms = useSelector(state => state.forms)
    const dispatch = useDispatch()
    const [singleForm,setSingleForm] = useState({})
    const childrenList = useSelector(state => state.formPreview)
    useEffect(()=>{
        getData()
    },[])
    const getData = async ()=>{
        await dispatch(getAllFormsAction())
    }
    const upsertFormIntent = async (form,isUpdate)=>{
        if(isUpdate)
            await dispatch(setFormEventAction(form))
        else
            await dispatch(setFormEventAction({
                children:[]
            }))
        await history.push("/upsert-form")
    }

    const onDeleteClickListener = (form)=>{
        setSingleForm(form)
        window.$('#alertDialog').modal('show')
    }

    const deleteFormHandle = async ()=>{
        await dispatch(deleteFormAction(singleForm._id))
    }
    return(
        <Fragment>
            <MainLayout title={"لیست فرم های سامانه"}>
                <ShowFileFormDialog childrenListInput={childrenList} history={history} isPreview={true}/>
                <AlertDialog title={"آیا از حذف این فرم مطمعن هستید؟"} deleteHandle={deleteFormHandle}/>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">

                                <div className={"row"}>
                                    <div className={"col-lg-8"}>
                                        <div className={"row mb-1"}>
                                            <h4 className="card-title ml-3 mt-1">فرم ها</h4>
                                            <button
                                                hidden={handleHide("افزودن فرم")}
                                                onClick={()=>{
                                                    upsertFormIntent(undefined,false)
                                                }}
                                                type="button" className="btn btn-success ml-3 waves-effect waves-light"
                                                data-toggle="button" aria-pressed="false">افزودن فرم جدید</button>
                                        </div>
                                        <p className="card-title-desc">تمامی سمت های سامانه را می توانید در لیست زیر مشاهده و مدیریت نمایید</p>
                                    </div>

                                </div>
                                <FormsTableComponent forms={forms} upsertFormIntent={upsertFormIntent} onDeleteClickListener={onDeleteClickListener}/>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </Fragment>
    )
}
export default FormsRootComponent
