import React, {useContext, useEffect, useState} from 'react'
import AlertDialog from "../../utility/AlertDialog";
import UpsertPersonDialog from "../../Person/insertPerson/UpsertPersonDialog";
import PagingComponent from "../../utility/PagingComponent";
import MainLayout from "../../RootComponent/MainLayout";
import LegalPeopleTableComponent from "./LegalPeopleTableComponent";
import {useDispatch, useSelector} from "react-redux";
import {deleteLegalPeopleAction, getLegalPeopleAction} from "../../stateManager/actions/LegalPeopleAction";
import UpsertLegalPersonDialog from "../insertLegalPerson/UpsertLegalPersonDialog";
import {RootContext} from "../../RootComponent/RootContext";
import InsertLegalPeopleFromExcelDialog from "../insertLegalPerson/InsertLegalPeopleFromExcelDialog";
const LegalPeopleRootComponent = ()=>{
    const {handleHide} = useContext(RootContext)
    const dispatch = useDispatch()
    const legalPeople = useSelector(state => state.legalPeople)
    const [singleLegalPerson,setSingleLegalPerson] = useState({})
    const [searchValue,setSearchValue] = useState('')
    const [singleId,setSingleId] = useState('')
    const [pageId,setPageId] = useState(1)

    useEffect(()=>{
        getData()
    },[pageId,searchValue])

    const getData = async ()=>{
        await dispatch(getLegalPeopleAction({
            pageId,
            eachPerPage:12,
            searchValue
        }))
    }

    const onClickEditLegalPerson = (legalPerson)=>{
        setSingleLegalPerson(legalPerson)
        window.$('#upsertLegalPersonDialog').modal('show')
    }

    const deleteLegalPerson = async ()=>{
        await dispatch(deleteLegalPeopleAction(singleId))
    }

    const onClickDeleteLegalPerson = (id)=>{
        setSingleId(id)
        window.$('#alertDialog').modal('show')
    }

    const handlePaging = (page)=>{
        setPageId(page)
    }
    return(
        <MainLayout title={"لیست اشخاص حقوقی"}>
            <AlertDialog title={"آیا از حذف این شخص حقوقی مطمعن هستید؟"} deleteHandle={deleteLegalPerson} />
            <UpsertLegalPersonDialog singleLegalPerson={singleLegalPerson} />
            <InsertLegalPeopleFromExcelDialog/>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">

                            <div className={"row"}>
                                <div className={"col-lg-8"}>
                                    <div className={"row mb-1"}>
                                        <button
                                            hidden={handleHide("مدیریت اشخاص حقوقی")}
                                            onClick={()=>{
                                                onClickEditLegalPerson({})
                                            }}
                                            type="button" className="btn btn-success ml-3 waves-effect waves-light"
                                            data-toggle="button" aria-pressed="false">افزودن شخص حقوقی جدید</button>
                                        <button
                                            onClick={()=>{
                                                window.$('#insertLegalPeopleFromExcelDialog').modal('show')
                                            }}
                                            className="btn btn-primary ml-3 waves-effect waves-light">بارگذاری اکسل</button>
                                    </div>
                                    <p className="card-title-desc">تمامی اشخاص حقوقی سامانه را می توانید در لیست زیر مشاهده و مدیریت نمایید</p>
                                </div>
                                <input className="form-control col-lg-4" type="text" value={searchValue}
                                       placeholder={"جستجو..."}
                                       onChange={(e)=>{
                                           setSearchValue(e.target.value)
                                       }}
                                />
                            </div>
                            <LegalPeopleTableComponent legalPeople={legalPeople.legalPeople} onClickEditLegalPerson={onClickEditLegalPerson} onClickDeleteLegalPerson={onClickDeleteLegalPerson}/>
                            <PagingComponent handlePaging={handlePaging} pageId={legalPeople.pageId} eachPerPage={legalPeople.eachPerPage} total={legalPeople.total}/>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
export default LegalPeopleRootComponent
