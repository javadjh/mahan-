import React, {useContext} from "react";
import {ContextMenu, MenuItem} from "react-contextmenu";
import {ArchiveTreeContext} from "./ArchiveTreeContext";
import {deleteArchiveTreeAction} from "../stateManager/actions/ArchiveTreeAction";
import {useDispatch} from "react-redux";
import {RootContext} from "../RootComponent/RootContext";
const RightClickArchiveTreeComponent = ()=>{
    const {setIsShowAddFile,setSingleForAddFile,singleTreeData} = useContext(ArchiveTreeContext)
    const {handleHide} = useContext(RootContext)
    const dispatch = useDispatch()
    return(
        <ContextMenu id="archiveTreeRightClick" rtl={true} >
            <div className={"card px-2 py-1"} style={{border:"2px solid #a3a3a3",borderRadius:3,backgroundColor:"#f5f5f5"}}>
                <MenuItem data={{foo: 'bar'}} >
                        <span hidden={handleHide("ویرایش پرونده")} onClick={()=>{
                            setSingleForAddFile(singleTreeData)
                            setIsShowAddFile(true)
                        }}>
                            <i className="mdi mdi-plus-thick" style={{fontSize:17,color:"green",marginLeft:5}}/>
                            <a style={{cursor:"pointer"}}>ثبت پرونده جدید</a>
                            <hr className={"p-0 m-0"}/>
                        </span>
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} >
                        <span hidden={handleHide("حذف پرونده")} onClick={ async ()=>{
                            await dispatch(deleteArchiveTreeAction(singleTreeData._id))
                        }}>
                            <i className="mdi mdi-delete" style={{fontSize:17,color:"red",marginLeft:5}}/>
                            <a style={{cursor:"pointer"}}>حذف</a>
                        </span>
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} >
                        <span hidden={handleHide("مدیریت درخت")} onClick={()=>{
                            window.$('#addTreeDialog').modal('show')
                        }}>
                            <i className="mdi mdi-pencil" style={{fontSize:17,color:"royalblue",marginLeft:5}}/>
                            <a style={{cursor:"pointer"}}>ویرایش </a>
                        </span>
                </MenuItem>
                <MenuItem  data={{foo: 'bar'}} >
                        <span hidden={handleHide("مدیریت درخت")}  onClick={()=>{
                            window.$('#archiveTreeSettingDialog').modal('show')
                        }}>
                            <i className="mdi mdi-settings" style={{fontSize:17,color:"orange",marginLeft:5}}/>
                            <a style={{cursor:"pointer"}}>تنظیمات </a>
                        </span>
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} >
                        <span>
                            <i className="mdi mdi-cancel" style={{fontSize:17,color:"darkred",marginLeft:5}}/>
                            <a style={{cursor:"pointer"}}>انصرف </a>
                        </span>
                </MenuItem>
            </div>
        </ContextMenu>
    )
}
export default RightClickArchiveTreeComponent
