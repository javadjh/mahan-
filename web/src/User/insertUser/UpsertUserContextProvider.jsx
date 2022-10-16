import {UpsertUserContext} from "./UpsertUserContext";
import React, {useEffect, useRef, useState} from "react";
import {validatorSP} from "../../utility/formValidator";
import { v4 as uuidv4 } from 'uuid';

const UpsertUserContextProvider = ({children})=>{
    const formValidator = useRef(validatorSP())
    const [firstName,setFirstName] = useState('')
    const [id,setId] = useState()
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [reloadPassword,setReloadPassword] = useState('')
    const [role,setRole] = useState(undefined)
    const [archive,setArchive] = useState(undefined)
    const [fileAccess,setFileAccess] = useState([])
    const [dataRole,setDataRole] = useState([])
    const [,setReloadValidator] = useState()
    const [reload,setReload] = useState()
    const [position,setPosition] = useState('')
    const [showMelliCodeError,setShowMelliCodeError] = useState(false)
    const addUserRoleHandler = ()=>{

        if(archive!==undefined && role!==undefined){
            let data = {}
            let archiveEdited = archive.split("!@")
            let roleEdited = role.split("!@")
            data.archiveId = archiveEdited[0]
            data.archiveTitle = archiveEdited[1]
            data.roleId = roleEdited[0]
            data.roleTitle = roleEdited[1]
            data.fileAccess = fileAccess

            let dataRoleCopy = dataRole
            dataRoleCopy.push(data)

            setDataRole(dataRoleCopy)
            setArchive(undefined)
            setRole(undefined)
            setReload(uuidv4())
            setFileAccess([])
        }
    }
    useEffect(()=>{
        console.log(dataRole)
    },[dataRole,reload])
    const deleteUserRoleHandle = (data)=>{
        let dataRoleCopy = dataRole
        dataRoleCopy = dataRoleCopy.filter(d=>d!==data)
        setDataRole(dataRoleCopy)
    }
    const fileAccessManager = (itemSelected,isChecked)=>{
        let fileAccessCopy = [...fileAccess]
        if(isChecked)
            fileAccessCopy.push(itemSelected)
        else
            fileAccessCopy = fileAccessCopy.filter(item=>item!==itemSelected)
        setFileAccess(fileAccessCopy)
    }
    return(
        <UpsertUserContext.Provider value={{
            fileAccess,setFileAccess,
            id,setId,
            firstName,setFirstName,
            lastName,setLastName,
            phoneNumber,setPhoneNumber,
            userName,setUserName,
            password,setPassword,
            reloadPassword,setReloadPassword,
            role,setRole,
            archive,setArchive,
            dataRole,
            formValidator,
            setReloadValidator,
            setDataRole,
            email,setEmail,
            position,setPosition,
            showMelliCodeError,setShowMelliCodeError,
            addUserRoleHandler,
            deleteUserRoleHandle,
            fileAccessManager
        }}>
            {children}
        </UpsertUserContext.Provider>
    )
}
export default UpsertUserContextProvider
