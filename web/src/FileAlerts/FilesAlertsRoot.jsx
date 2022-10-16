import React, {useEffect, useState} from "react";
import MainLayout from "../RootComponent/MainLayout";
import {useDispatch, useSelector} from "react-redux";
import {getUsersFilesAlertsAction} from "../stateManager/actions/FileAlertAction";
import FilesAlertsTable from "./FilesAlertsTable";
import PagingComponent from "../utility/PagingComponent";
const FilesAlertsRoot = ()=>{
    const filesAlerts = useSelector(state => state.filesAlerts)
    const dispatch = useDispatch()
    const [pageId,setPageId] = useState(1)
    const [searchValue,setSearchValue] = useState('')
    useEffect(()=>{
        getData()
    },[pageId])
    const getData = async ()=>{
        dispatch(getUsersFilesAlertsAction({
            pageId,
            eachPerPage:12,
            searchValue
        }))
    }
    return(
        <MainLayout title={"هشدار ها"} isMain={true}>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">

                            <div className={"row"}>
                                <div className={"col-lg-8"}>
                                    <div className={"row mb-1"}>
                                        <h4 className="card-title ml-3 mt-1">لیست هشدار ها</h4>
                                    </div>
                                    <p className="card-title-desc">در این قسمت میتوانید لیست هشدار های ثبت شده را مشاهده کنید</p>
                                </div>
                            </div>
                            {/*<LendsTableComponent lends={lends} setDialogData={setDialogData}/>*/}
                            <FilesAlertsTable filesAlerts={filesAlerts.filesAlerts}/>
                            <PagingComponent pageId={filesAlerts.pageId} eachPerPage={filesAlerts.eachPerPage} total={filesAlerts.total} handlePaging={(page)=>{
                                setPageId(page)
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
export default FilesAlertsRoot