import React, {useEffect, useRef, useState} from "react";
import {UpsertFormContext} from "./UpsertFormContext";
import { v4 as uuidv4 } from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import {setFormEventAction, setManualFormPreviewAction} from "../../stateManager/actions/FormAction";
import _ from 'lodash'
import {validatorSP} from "../../utility/formValidator";
const UpsertFormContextProvider = ({children})=>{
    const [childrenList,setChildrenList] = useState([])
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [id,setId] = useState(undefined)
    const [,setValidatorMessage] = useState()
    const dispatch = useDispatch()
    const formValidator = useRef(validatorSP())
    const formEvent = useSelector(state => state.formEvent.children)
    const formRoot = useSelector(state => state.formEvent)

    useEffect(()=>{
        setChildrenList(formEvent)
        setTitle(formRoot.title)
        setDescription(formRoot.description)
        setDescription(formRoot.description)
        setId(formRoot._id)
    },[formEvent])



    const addNewChildren = async (type,inputType)=>{
        switch (type){
            case "input":
                await addNewData("input",inputType)
                break
            case "textArea":
                await addNewData("textArea")
                break
            case "radio":
                await addNewData("radio")
                break
            case "checkBox":
                await addNewData("checkBox")
                break
            case "selector":
                await addNewData("selector")
                break
            case "date":
                await addNewData("date")
                break
            case "dateMiladi":
                await addNewData("dateMiladi")
                break
        }
    }
    const addNewData = async (type,inputType)=>{
        let childrenListCopy = [...childrenList]

        let data = {
            sortNumber:childrenListCopy.length<=0?1:childrenListCopy[childrenListCopy.length-1].sortNumber+1,
            uiId:uuidv4(),
            type,
            isRequired:false,
            inputType
        }

        childrenListCopy.push(data)

        childrenListCopy = _.sortBy( childrenListCopy, 'sortNumber');

        setChildrenList(childrenListCopy)
        console.log(childrenList)
        await dispatch(setFormEventAction({
            _id:id,
            title,
            description,
            children:childrenListCopy
        }))
        await dispatch(setManualFormPreviewAction(childrenListCopy))
    }

    const deleteData = async (uiId)=>{
        let childrenListCopy = childrenList

        childrenListCopy = childrenListCopy.filter(c=>c.uiId!==uiId)

        console.log(childrenListCopy)

        setChildrenList(childrenListCopy)
        console.log(childrenList)
        await dispatch(setFormEventAction({
            _id:id,
            title,
            description,
            children:childrenListCopy
        }))
        await dispatch(setManualFormPreviewAction(childrenListCopy))
    }

    const onUpOrDownHandle = async (uiId,isUp)=>{
        let childrenListCopy = childrenList
        let index = childrenList.findIndex(c=>c.uiId===uiId)

        if(childrenListCopy[index-1])
            childrenListCopy[index-1].sortNumber = isUp?childrenListCopy[index].sortNumber-1:childrenListCopy[index].sortNumber+1

        if(childrenListCopy[index+1])
            childrenListCopy[index+1].sortNumber = isUp?childrenListCopy[index].sortNumber+1:childrenListCopy[index].sortNumber-1


        childrenListCopy[index].sortNumber = isUp?childrenListCopy[index].sortNumber+2:childrenListCopy[index].sortNumber-2

        childrenListCopy = _.sortBy( childrenListCopy, 'sortNumber');

        setChildrenList(childrenListCopy)
        await dispatch(setFormEventAction({
            _id:id,
            title,
            description,
            children:childrenListCopy
        }))
        console.log(childrenList)
        await dispatch(setManualFormPreviewAction(childrenListCopy))
    }

    return(
        <UpsertFormContext.Provider value={{
            childrenList,setChildrenList,
            title,setTitle,
            description,setDescription,
            formValidator,
            setValidatorMessage,
            addNewChildren,
            onUpOrDownHandle,
            deleteData
        }}>
            {children}
        </UpsertFormContext.Provider>
    )
}
export default UpsertFormContextProvider
