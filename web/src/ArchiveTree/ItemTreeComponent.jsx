import React, {useEffect, useState, Fragment, useRef, useContext} from "react";
import {getArchiveTreesService} from "../service/ArchiveTreeService";
import AddTreeDialog from "./dialog/AddTreeDialog";
import {ArchiveTreeContext} from "./ArchiveTreeContext";
import {useSelector} from "react-redux";
import AlertDialog from "../utility/AlertDialog";
import {ContextMenuTrigger} from "react-contextmenu";
import {RootContext} from "../RootComponent/RootContext";



const ItemTreeComponent = ({isMain, mainParent})=>{
    const [data,setData] = useState([])
    const [mainParentItem,setMainParentItem] = useState()
    const {handleHide} = useContext(RootContext)
    const {setCurrent,setIsMain,setSingleTreeData,setLastData,archiveId,setMainArchiveTree,setCurrentArchiveTree,setIsShowAddFile} = useContext(ArchiveTreeContext)
    const reloadMainParentArchiveTree = useSelector(state => state.reloadMainParentArchiveTree)
    let renderHTML = <ItemTreeComponent mainParent={mainParentItem} isMain={false}/>
    useEffect(()=>{
        getData()
    },[])

    useEffect(()=>{
        console.log(reloadMainParentArchiveTree.mianParent)
        console.log(mainParent)
        if(reloadMainParentArchiveTree.mainParent===mainParent)
            getData()
    },[reloadMainParentArchiveTree])


    const getData = async ()=>{
        const {data,status} = await getArchiveTreesService({isMain,mainParent,archiveId})
        if(status===200){
            setData(data)
            setLastData(data.trees)
        }
    }

    return(
        <Fragment>
            <AddTreeDialog mainParent={mainParentItem}/>
            <div style={{marginRight:20,backgroundColor:"#e7e7e7"}} >
                <hr className={"m-0 p-0"} style={{color:"green"}} />
                <div className={"row m-0 p-0"} >
                    <div style={{borderLeft:`2px solid green`}} />
                    <div className={"col-lg-12 row pr-0 pl-1"}>
                        {data.map(d=>(

                                <div className={"ml-2 mt-1 mx-0 p-0"} style={{width:"100%"}}>
                                    <ContextMenuTrigger id="archiveTreeRightClick">
                                        <span
                                            onClick={()=>{
                                                setIsShowAddFile(false)
                                                setCurrentArchiveTree(d)
                                                setSingleTreeData({})
                                                setMainParentItem(d._id)
                                                if(d.isMain)
                                                    setMainArchiveTree(d)
                                            }}
                                            style={{cursor:"pointer"}}
                                            className={"row ml-2 mr-1 mt-1"}
                                            onContextMenu={()=>{
                                                setSingleTreeData(d)
                                                setMainArchiveTree(d)
                                                setCurrentArchiveTree(d)
                                            }}>
                                            <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                                                <div className={"row "}>
                                                    <span style={{width:15,height:3,backgroundColor:"green",marginRight:3,marginTop:8}}/>
                                                    {mainParentItem===d._id?(
                                                        <i className={"mdi mdi-arrow-down-bold"} style={{fontColor:"green"}}/>
                                                    ):(
                                                        <i className={"mdi mdi-arrow-left-bold"} style={{fontColor:"green"}}/>
                                                    )}
                                                    <img src={'./assets/images/archive.png'} width={20} height={20} style={{marginBottom:8,marginLeft:12,marginRight:2}}/>
                                                    <span className={"m-0 p-0"} style={{color:"#414141",marginTop:-10}}>{d.title} ({d.totalFileCount})</span>
                                                </div>
                                                <span hidden={handleHide("انتخاب فرم برای بایگانی") || handleHide("ثبت اطلاعات تکمیلی برای بایگانی")}>
                                                    {/*<i onClick={()=>{

                                                        window.$('#upsertMainArchiveTreesForm').modal('show')
                                                    }} hidden={!isMain} className={"mdi mdi-book-information-variant"} style={{fontColor:"green"}}/>*/}
                                                </span>
                                            </div>
                                        </span>
                                    </ContextMenuTrigger>
                                    {mainParentItem===d._id?renderHTML:null}
                                </div>
                        ))}
                        <hr className={"m-0 p-0"}/>

                        <div className={" mx-0 p-0 ml-2"} style={{width:"100%",marginBottom:10}}>
                                <span
                                    style={{cursor:"pointer"}}
                                    className={"row mx-2"}>
                                    <div style={{display:"flex",justifyContent:"space-between",width:"100%"}} onClick={()=>{
                                        setSingleTreeData({})
                                        setIsMain(mainParent===undefined)
                                        setCurrent(mainParent)
                                        window.$('#addTreeDialog').modal('show')
                                    }}>
                                        <div className={"row px-2 mt-1"} style={{backgroundColor:"green",marginRight:-10,borderBottomLeftRadius:10,borderTopLeftRadius:10}}>
                                            <i className="mdi mdi-plus-thick" style={{fontSize:16,color:"white"}}/>
                                            <span className={"m-0 p-0"} style={{color:"white",marginRight:10,marginLeft:10}}>افزودن</span>
                                        </div>

                                    </div>
                                </span>
                        </div>

                        <hr className={"m-0 p-0"} style={{color:"green"}}/>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ItemTreeComponent
