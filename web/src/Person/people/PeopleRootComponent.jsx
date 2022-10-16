import React, {useContext, useEffect, useState} from "react";
import AlertDialog from "../../utility/AlertDialog";
import MainLayout from "../../RootComponent/MainLayout";
import PeopleTableComponent from "./PeopleTableComponent";
import PagingComponent from "../../utility/PagingComponent";
import {useDispatch, useSelector} from "react-redux";
import {deletePersonAction, getPeopleAction} from "../../stateManager/actions/PeopleAction";
import UpsertPersonDialog from "../insertPerson/UpsertPersonDialog";
import {RootContext} from "../../RootComponent/RootContext";
import InsertPeopleFromExcelDialog from "../insertPerson/InsertPeopleFromExcelDialog";
const PeopleRootComponent = ()=>{
    const {handleHide} = useContext(RootContext)
    const people = useSelector(state => state.people)
    const [pageId,setPageId] = useState(1)
    const [searchValue,setSearchValue] = useState('')
    const [singlePerson,setSinglePerson] = useState({})
    const [personIdSelectForDelete,setPersonIdSelectForDelete] = useState()
    const dispatch = useDispatch()

    useEffect(()=>{
        getData()
    },[pageId,searchValue])
    const getData = async ()=>{
        await dispatch(getPeopleAction({pageId,eachPerPage:12,searchValue}))
    }
    const handlePaging = (page)=>{
        setPageId(page)
    }
    const editPersonHandle = (person)=>{
        setSinglePerson(person)
        window.$('#upsertPersonDialog').modal('show')
    }

    const onDeleteClickListener = (id)=>{
        setPersonIdSelectForDelete(id)
        window.$('#alertDialog').modal('show')
    }

    const deletePersonHandle = async ()=>{
        await dispatch(deletePersonAction(personIdSelectForDelete))
    }
    return(
        <MainLayout title={"لیست اشخاص حقیقی"}>
            <AlertDialog title={"آیا از حذف این شخص حقیقی مطمعن هستید؟"} deleteHandle={deletePersonHandle}/>
            <UpsertPersonDialog singlePerson={singlePerson}/>
            <InsertPeopleFromExcelDialog/>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">

                            <div className={"row"}>
                                <div className={"col-lg-8"}>
                                    <div className={"row mb-1"}>
                                        <button
                                            hidden={handleHide("مدیریت اشخاص حقیقی")}
                                            onClick={()=>{
                                                setSinglePerson({})
                                                window.$('#upsertPersonDialog').modal('show')
                                            }}
                                            type="button" className="btn btn-success ml-3 waves-effect waves-light"
                                            data-toggle="button" aria-pressed="false">افزودن شخص حقیقی جدید</button>

                                        <button
                                            onClick={()=>{
                                                window.$('#insertPeopleFromExcelDialog').modal('show')
                                            }}
                                            className="btn btn-primary ml-3 waves-effect waves-light">بارگذاری اکسل</button>
                                    </div>
                                    <p className="card-title-desc">تمامی اشخاص حقیقی سامانه را می توانید در لیست زیر مشاهده و مدیریت نمایید</p>
                                </div>
                                <input className="form-control col-lg-4" type="text" value={searchValue}
                                       placeholder={"جستجو..."}
                                       onChange={(e)=>{
                                           setSearchValue(e.target.value)
                                       }}
                                />
                            </div>
                            <PeopleTableComponent people={people.people} editPersonHandle={editPersonHandle} onDeleteClickListener={onDeleteClickListener}/>
                            <PagingComponent handlePaging={handlePaging} pageId={people.pageId} eachPerPage={people.eachPerPage} total={people.total}/>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
export default PeopleRootComponent
