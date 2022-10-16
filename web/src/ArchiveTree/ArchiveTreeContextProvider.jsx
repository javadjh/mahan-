import React, {useState} from "react";
import {ArchiveTreeContext} from "./ArchiveTreeContext";
import {useDispatch} from "react-redux";
import {
    changeArchiveTreesNameAction,
    insertArchiveTreeAction,
    settingArchiveTreesAction
} from "../stateManager/actions/ArchiveTreeAction";
const ArchiveTreeContextProvider = ({children})=>{
    const [currentTree,setCurrent] = useState()
    const [currentArchiveTree,setCurrentArchiveTree] = useState()
    const [isMain,setIsMain] = useState(true)
    const [singleTreeData,setSingleTreeData] = useState({})
    const [lastData,setLastData] = useState({})
    const [singleForAddFile,setSingleForAddFile] = useState({})
    const [mainParent,setMainParent] = useState()
    const [archiveId,setArchiveId] = useState(localStorage.getItem("archive"))
    const [isShowAddFile,setIsShowAddFile] = useState(false)
    const [files,setFiles] = useState([])
    const [fileId,setFileId] = useState()
    const [mainArchiveTree,setMainArchiveTree] = useState({})
    const dispatch = useDispatch()
    const addNewTree = async (title)=>{
        if(singleTreeData._id){
            await dispatch(changeArchiveTreesNameAction(singleTreeData._id,{title,archiveId}))
        }else{
            await dispatch(insertArchiveTreeAction({
                title,isMain,mainParent:currentTree,archiveId
            }))
        }
    }

    const changeArchiveTreeSettingHandle = async (setting)=>{
        await dispatch(settingArchiveTreesAction(singleTreeData._id,setting))
    }
    return(
        <ArchiveTreeContext.Provider value={{
            currentTree, setCurrent,
            isMain,setIsMain,
            singleTreeData,setSingleTreeData,
            mainParent,setMainParent,
            lastData,setLastData,
            archiveId,setArchiveId,
            isShowAddFile,
            setIsShowAddFile,
            singleForAddFile,setSingleForAddFile,
            files,setFiles,
            currentArchiveTree,setCurrentArchiveTree,
            fileId,setFileId,
            mainArchiveTree,setMainArchiveTree,
            addNewTree,
            changeArchiveTreeSettingHandle
        }}>
            {children}
        </ArchiveTreeContext.Provider>
    )
}
export default ArchiveTreeContextProvider
