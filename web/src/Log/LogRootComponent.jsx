import React, {useEffect, useState} from "react";
import MainLayout from "../RootComponent/MainLayout";
import {useDispatch, useSelector} from "react-redux";
import PeopleTableComponent from "../Person/people/PeopleTableComponent";
import PagingComponent from "../utility/PagingComponent";
import LogsTableComponent from "./LogsTableComponent";
import {getLogsAction} from "../stateManager/actions/LogsAction";
import {getLogsFileService} from "../service/LogService";
import { saveAs } from 'file-saver';
import Select from "react-select";
import {getAllUsersAction, usersAutocompleteAction} from "../stateManager/actions/UsersAction";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

const LogRootComponent = ()=>{
    const dispatch = useDispatch()
    const logs = useSelector(state => state.logs)
    const usersAutocomplete = useSelector(state => state.usersAutocomplete)
    const [pageId,setPageId] = useState(1)
    const [searchValue,setSearchValue] = useState('')
    const [method,setMethod] = useState()
    const [users,setUsers] = useState([])
    useEffect(()=>{
        getData()
    },[pageId,searchValue,method,users])
    useEffect(()=>{
       getUsers()
    },[])

    const getUsers = async ()=>{
        await dispatch(usersAutocompleteAction())
    }

    const getData = async ()=>{
        let usersList = []
        users.map(u=>{
            usersList.push(u.value)
        })
        await dispatch(getLogsAction({
            pageId,
            eachPerPage:50,
            searchValue,
            method,
            users:usersList
        }))
    }

    const handlePaging = (page)=>{
        setPageId(page)
    }
    const getLogsFileHandler = async ()=>{
        let usersList = []
        users.map(u=>{
            usersList.push(u.value)
        })
        const {data,status} = await getLogsFileService({
            pageId,
            eachPerPage:50,
            searchValue,
            method,
            users:usersList
        })
        if(status===200){
            saveAs(data, Date.now() + ".xlsx");
        }
    }
    return(
        <MainLayout title={"تاریخچه تغییرات"} isMain={true}>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">

                            <div className={"row"}>
                                <div className={"col-lg-8"}>
                                    <div className={"row mb-1"}>
                                        <h4 className="card-title ml-3 mt-1">تاریخچه تغییرات سامانه</h4>
                                    </div>
                                    <p className="card-title-desc">در این قسمت میتوانید تاریخچه تغییرات سامانه را مشاهده کنید</p>
                                </div>

                            </div>
                            <div className={"row mb-4"}>
                                <div className={"col-lg-4"}>
                                    <label>جست و جو در عنوان</label>
                                    <input className="form-control mx-1" type="text"
                                           placeholder={"جستجو..."}
                                           onChange={(e)=>{
                                               setSearchValue(e.target.value)
                                           }}
                                    />
                                </div>
                                <div className={"col-lg-4 "}>
                                    <label>نوع درخواست کاربر</label>
                                    <select className="custom-select mx-1" onChange={(e)=>{
                                        setMethod(e.target.value)
                                    }}>
                                        <option value={undefined} name={undefined}>انتخاب کنید نوع درخواست</option>
                                        <option value={"GET"} name={"GET"}>دریافت</option>
                                        <option value={"POST"} name={"POST"}>ثبت</option>
                                        <option value={"PUT"} name={"PUT"}>ویرایش</option>
                                        <option value={"DELETE"} name={"DELETE"}>حذف</option>

                                    </select>
                                </div>
                                <div className={"col-lg-4 "}>
                                    <label>انتخاب کاربران</label>
                                    <Select
                                        onChange={(e)=>{
                                            setUsers(e)
                                        }}
                                        noOptionsMessage={()=>"یافت نشد"}
                                        placeholder={"جست و جو در مخاطبین..."}
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isMulti
                                        options={usersAutocomplete} />
                                </div>

                            </div>
                            <div className={" align-right text-right"}>
                                <button className="btn btn-primary waves-effect waves-light mb-3 align-right text-right" onClick={getLogsFileHandler}>
                                    <i className="fas fa-file-excel font-size-16 align-middle mr-2"></i> دریافت خروجی excel
                                </button>
                            </div>
                            <LogsTableComponent logs={logs.logs} />
                            <PagingComponent handlePaging={handlePaging} pageId={logs.pageId} eachPerPage={logs.eachPerPage} total={logs.total}/>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
export default LogRootComponent
