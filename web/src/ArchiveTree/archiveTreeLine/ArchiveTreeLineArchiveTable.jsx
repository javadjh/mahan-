import React, {useContext, useState} from 'react'
import {ArchiveTreeLineContext} from "./ArchiveTreeLineContext";
import {useDispatch} from "react-redux";
import {deleteArchiveTreeAction} from "../../stateManager/actions/ArchiveTreeAction";

const ArchiveTreeLineArchiveTable = ({archives,setMainParent,mainParent})=>{
    const {setSingleTreeData,setCurrentTree,setIsShowAddFile,setSingleForAddFile,isShowAddFile,setMainArchiveTree} = useContext(ArchiveTreeLineContext)
    const [onHoverData,setOnHoverData] = useState({})
    const dispatch = useDispatch()
    return(
        <>
            <div className={"row text-center"}>
                {archives.map(a=>(
                    <span className={"card mx-2 custom-cursor"} style={{width:150}} onMouseOver={()=>{
                        if(!isShowAddFile){
                            setSingleForAddFile(a)
                            setSingleTreeData(a)
                            setOnHoverData(a)
                        }
                    }} >

                        <div className={"card-body"} >
                            <div onClick={()=>{
                                if(a.isMain)
                                    setMainArchiveTree(a)
                                setIsShowAddFile(false)
                                setSingleForAddFile(a)
                                setCurrentTree(a._id)
                                const mainParentCopy = [...mainParent]
                                mainParentCopy.push(a)
                                setMainParent(mainParentCopy)
                            }} >
                                <img src="./assets/images/folder.png" width={60} height={60} className={"mt-1"}/>
                            <p className={"m-0 p-0"} style={{color:"black"}}>{a.title.substr(0,10)}{a.title.length>10?"...":null} ({a.totalFileCount})</p>
                            <p className={"m-0 p-0"} style={{color:"#b5b5b5"}}>{a.createDate}</p>
                            </div>
                            <div className={"row"}>
                                {onHoverData._id===a._id?(
                                        <>
                                            <i onClick={()=>{
                                                setMainArchiveTree(a)
                                                setSingleForAddFile(a)
                                                setIsShowAddFile(true)
                                            }} className="mdi mdi-plus-thick" style={{fontSize:17,marginBottom:"-10px",color:"green",marginLeft:5}}/>
                                            <i onClick={ async ()=>{
                                                await dispatch(deleteArchiveTreeAction(a._id))
                                            }} className="mdi mdi-delete" style={{fontSize:17,marginBottom:"-10px",color:"red",marginLeft:5}}/>
                                            <i onClick={()=>{
                                                window.$('#addTreeDialog').modal('show')
                                            }} className="mdi mdi-pencil" style={{fontSize:17,marginBottom:"-10px",color:"royalblue",marginLeft:5}}/>
                                            <i onClick={()=>{
                                               window.$('#archiveTreeSettingDialog').modal('show')
                                            }} className="mdi mdi-settings" style={{fontSize:17,marginBottom:"-10px",color:"orange",marginLeft:5}}/>
                                            {/*<i onClick={()=>{
                                               window.$('#upsertMainArchiveTreesForm').modal('show')
                                            }} hidden={!a.isMain} className="mdi mdi-book-information-variant" style={{fontSize:17,marginBottom:"-10px",marginLeft:5}}/>*/}
                                        </>
                                    ):null}
                                <i className="mdi mdi-plus-thick" style={{fontSize:17,marginBottom:"-10px",color:"white",marginLeft:5}}/>
                            </div>
                        </div>
                    </span>
                ))}
                <span className={"card mx-2 custom-cursor"} onClick={()=>{
                    window.$('#addTreeDialog').modal('show')
                }} style={{width:150,paddingTop:20}} onMouseOver={()=>{
                    if(!isShowAddFile){
                        setCurrentTree(mainParent[mainParent.length-1])
                        setSingleTreeData({})
                    }
                }} >
                        <div className={"card-body"}>
                            <i className="mdi mdi-plus-thick" style={{fontSize:40,marginBottom:"-10px",color:"green",marginLeft:5}}/>
                            <p className={"m-0 p-0"} style={{color:"black"}}>افزودن</p>
                        </div>
                </span>
            </div>
        </>
    )
}
export default ArchiveTreeLineArchiveTable
