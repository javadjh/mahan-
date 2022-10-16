import React, {Fragment, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {searchFileAction, setManualSearchFileAction} from "../../stateManager/actions/FileAction";
const SearchFileDialog = ({changeDocumentFileHandle})=>{
    const dispatch = useDispatch()
    const [searchValue,setSearchValue] = useState('')
    const searchFile = useSelector(state => state.searchFile)
    useEffect(()=>{
        getData()
    },[searchValue])

    const getData = async ()=>{
        if(searchValue.length>0){
            await dispatch(searchFileAction(searchValue))
        }else{
            await dispatch(setManualSearchFileAction([]))
        }
    }
    return(
        <Fragment>
            <div className="modal fade" id="searchFileDialog" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content p-4">
                        <div>
                            <div className="form-group">
                                <label htmlFor="validationCustom04">جستجو در پرونده</label>
                                <input type="text"
                                       name={"searchValue"}
                                       value={searchValue}
                                       onChange={(e)=>{
                                           setSearchValue(e.target.value)
                                       }}
                                       className="form-control" id="validationCustom04"
                                       placeholder="عنوان پرونده را وارد کنید..." required/>
                            </div>
                            {searchFile.map(s=>(
                                <div className={"card p-3 my-3  custom-cursor row"} onClick={()=>{
                                    changeDocumentFileHandle(s.archiveTreeId.archive,s._id)
                                }}>
                                    <span>{s.archiveTreeId.route}<span style={{color:"green"}}> / {s.title}</span></span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default SearchFileDialog
