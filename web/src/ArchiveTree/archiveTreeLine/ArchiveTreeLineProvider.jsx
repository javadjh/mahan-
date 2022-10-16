import React, {useState} from "react";
import {
    changeArchiveTreesNameAction,
    insertArchiveTreeAction,
    settingArchiveTreesAction
} from "../../stateManager/actions/ArchiveTreeAction";
import {useDispatch} from "react-redux";
import {ArchiveTreeLineContext} from "./ArchiveTreeLineContext";
const ArchiveTreeLineProvider = ({children})=>{
    const dispatch = useDispatch()
    const [archiveId,setArchiveId] = useState(localStorage.getItem("archive"))
    const [singleTreeData,setSingleTreeData] = useState({})
    const [currentTree,setCurrentTree] = useState()
    const [isShowAddFile,setIsShowAddFile] = useState()
    const [singleForAddFile,setSingleForAddFile] = useState({})
    const [mainArchiveTree,setMainArchiveTree] = useState({})

    const changeArchiveTreeSettingHandle = async (setting)=>{
        await dispatch(settingArchiveTreesAction(singleTreeData._id,setting))
    }
    const addNewTree = async (title)=>{
        if(singleTreeData._id){
            await dispatch(changeArchiveTreesNameAction(singleTreeData._id,{title,archiveId}))
        }else{
            await dispatch(insertArchiveTreeAction({
                title,isMain:currentTree?false:true,mainParent:currentTree,archiveId
            }))
        }
    }
    return(
        <ArchiveTreeLineContext.Provider value={{
            archiveId,setArchiveId,
            singleTreeData,setSingleTreeData,
            currentTree,setCurrentTree,
            isShowAddFile,setIsShowAddFile,
            singleForAddFile,setSingleForAddFile,
            mainArchiveTree,setMainArchiveTree,
            changeArchiveTreeSettingHandle,
            addNewTree
        }}>
            {children}
        </ArchiveTreeLineContext.Provider>
    )
}
export default ArchiveTreeLineProvider
