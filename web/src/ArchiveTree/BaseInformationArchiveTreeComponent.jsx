import React, {useContext, useEffect, useState} from "react";
import {ContextMenuTrigger} from "react-contextmenu";
import ItemTreeComponent from "./ItemTreeComponent";
import {ArchiveTreeContext} from "./ArchiveTreeContext";
import {useDispatch, useSelector} from "react-redux";
import {searchArchiveTreesAction} from "../stateManager/actions/ArchiveTreeAction";
import {getSingleArchiveAction, setArchiveState} from "../stateManager/actions/ArchiveAction";
const BaseInformationArchiveTreeComponent = ()=>{
    const dispatch = useDispatch()
    const usersArchives = useSelector(state => state.usersArchives)
    const searchArchiveTrees = useSelector(state => state.searchArchiveTrees)
    const {setSingleTreeData,setMainParent,setArchiveId,archiveId,setCurrentArchiveTree,setIsShowAddFile} = useContext(ArchiveTreeContext)
    const [mainParentItem,setMainParentItem] = useState()

    const getData = async (searchValue)=>{
        await dispatch(searchArchiveTreesAction({searchValue}))
    }

    let renderHTML = <ItemTreeComponent mainParent={undefined} isMain={true}/>
    return(
        <div className={"col-lg-3"}>
            <input
                type="text"
                onChange={(e)=>{
                    getData(e.target.value)
                }}
                placeholder={"جستجو..."}
                className="form-control"/>
            {searchArchiveTrees.map(s=>(
                <div className={"card my-2"} style={{cursor:"pointer"}}
                     onClick={()=>{
                         setIsShowAddFile(false)
                         setCurrentArchiveTree(s)
                         setSingleTreeData({})
                         setMainParentItem(s._id)
                     }}>
                    <div style={{display:"flex",justifyContent:"space-between"}} >
                        <a style={{fontSize:14,alignSelf:"center",marginRight:5}}>{s.route}</a>
                        <div style={{height:"100%",backgroundColor:"#f1f1f1",alignSelf:"center"}} className={"p-2"}>
                            <i className="mdi mdi-arrow-left"></i>
                        </div>
                    </div>
                </div>
            ))}
            {usersArchives.map(u=>(

                    <div className={"card my-2 mx-0 p-0"}>
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                                <span
                                    style={{cursor:"pointer"}}
                                    className={"row m-2"}
                                    onClick={ async ()=>{
                                        await dispatch(setArchiveState(u.archiveId._id))
                                        setSingleTreeData({})
                                        setMainParent(undefined)
                                        setTimeout(()=>{
                                            window.location.reload()
                                        },100)
                                    }}>
                                    <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                                        <div className={"row mx-1"}>
                                            <img src={'./assets/images/archiveroom.png'} width={20} height={20} style={{marginTop:5,marginLeft:10}}/>
                                            <p className={"m-0 p-0"} style={{color:"#414141"}}>{u.archiveId.title}</p>
                                        </div>
                                    </div>
                                </span>
                                <span className={"mx-2"} style={{marginTop:7}} onClick={ async ()=>{
                                    console.log(u.archiveId._id)
                                    await dispatch(getSingleArchiveAction(u.archiveId._id))
                                }}>
                                    <i className="mdi mdi-settings" style={{fontSize:19,color:"orange"}}/>
                                </span>
                            </div>
                        {archiveId===u.archiveId._id?renderHTML:null}
                        <hr className={"m-0 p-0"}/>
                    </div>
            ))}

        </div>
    )
}
export default BaseInformationArchiveTreeComponent
