import React, {useRef, useState} from "react";
import {UpsertRoleContext} from "./UpsertRoleContext";
import {validatorSP} from "../../utility/formValidator";
const UpsertRoleContextProvider = ({children})=>{
    const formValidator = useRef(validatorSP())
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [id,setId] = useState(undefined)
    const [accessList,setAccessList] = useState([])
    const [accessListUpdate,setAccessListUpdate] = useState([])
    const [,setValidatorMessage] = useState()





    const addAccessListHandle = (access)=>{
        let accessListCopy = [...accessList]
        let accessIndex = accessListCopy.findIndex(a=>a===access)
        if(accessListCopy[accessIndex].isSelected===undefined)
            accessListCopy[accessIndex].isSelected = true
        else
            accessListCopy[accessIndex].isSelected = accessListCopy[accessIndex].isSelected === false

        setAccessList(accessListCopy)
    }
    return(
        <UpsertRoleContext.Provider value={{
            title,setTitle,
            description,setDescription,
            accessList,setAccessList,
            addAccessListHandle,
            formValidator,
            id,setId,
            setValidatorMessage,
            accessListUpdate,setAccessListUpdate
        }}>
            {children}
        </UpsertRoleContext.Provider>
    )
}
export default UpsertRoleContextProvider
