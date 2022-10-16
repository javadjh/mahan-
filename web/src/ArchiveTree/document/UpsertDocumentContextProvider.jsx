import React, {useContext, useRef, useState} from 'react'
import {UpsertDocumentContext} from "./UpsertDocumentContext";
import {fileAlertsAction, insertFileAlertAction} from "../../stateManager/actions/FileAlertAction";
import {RootContext} from "../../RootComponent/RootContext";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";
import {validatorSP} from "../../utility/formValidator";
const UpsertDocumentContextProvider = ({children})=>{
    let history = useHistory()
    const formValidator = useRef(validatorSP())
    const dispatch = useDispatch()
    const {handleHide} = useContext(RootContext)
    const [alertTitle,setAlertTitle] = useState()
    const [alertDescription,setAlertDescription] = useState()
    const [alertDate,setAlertDate] = useState()
    const [,setReload] = useState()
    const [singleEmail,setSingleEmail] = useState({})

    const insertFileAlertHandle = async ()=>{
        if(formValidator.current.allValid()){
            if(!handleHide("ویرایش پرونده")){
                const data = {
                    archiveId:history.location.state.archiveId,
                    fileId:history.location.state.fileId,
                    title:alertTitle,
                    description:alertDescription,
                    alertDate:alertDate
                }
                await dispatch(insertFileAlertAction(data,setAlertTitle,setAlertDescription,setAlertDate))
            }
        }else{
            formValidator.current.showMessages()
            setReload(1)
        }


    }
    const getAlerts = async ()=>{
        await dispatch(fileAlertsAction({
            archiveId:history.location.state.archiveId,
            fileId:history.location.state.fileId,
        }))
    }
    return(
        <UpsertDocumentContext.Provider value={{
            alertTitle,setAlertTitle,
            alertDescription,setAlertDescription,
            alertDate,setAlertDate,
            singleEmail,setSingleEmail,
            formValidator,
            insertFileAlertHandle,
            getAlerts
        }}>
            {children}
        </UpsertDocumentContext.Provider>
    )
}
export default UpsertDocumentContextProvider
