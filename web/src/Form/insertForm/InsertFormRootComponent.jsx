import React, {useContext, useEffect} from 'react'
import MainLayout from "../../RootComponent/MainLayout";
import BaseInformationUpsertFormComponent from "./BaseInformationUpsertFormComponent";
import SecondInformationUpsertFormComponent from "./SecondInformationUpsertFormComponent";
import {UpsertFormContext} from "./UpsertFormContext";
import {useDispatch, useSelector} from "react-redux";
import {insertFormAction, setManualFormPreviewAction, updateFormAction} from "../../stateManager/actions/FormAction";
import {useHistory} from "react-router";
import { StickyContainer, Sticky } from 'react-sticky';
import ShowFileFormDialog from "../../ArchiveTree/dialog/ShowFileFormDialog";

const InsertFormRootComponent = ()=>{
    const history = useHistory()
    const {childrenList,formValidator,setValidatorMessage,title,description} = useContext(UpsertFormContext)
    const id = useSelector(state => state.formEvent._id)
    const dispatch = useDispatch()
    useEffect(()=>{
        console.log(childrenList)
        return()=>{
            dispatch(setManualFormPreviewAction([]))
        }
    },[childrenList])

    const sendData = async ()=>{
        if(formValidator.current.allValid()){
            childrenList.map(item=>{
                item.answer = undefined
            })
            let data = {title,description,children:childrenList}
            console.log(id)
            if(id!==undefined){
                console.log("update")
                await dispatch(updateFormAction(id,data,history))
            }
            else{
                console.log("insert")
                await dispatch(insertFormAction(data,history))
            }
        }else{
            formValidator.current.showMessages()
            setValidatorMessage(1)
        }

    }
    return(
        <StickyContainer>
            <ShowFileFormDialog childrenListInput={childrenList} history={history} isPreview={true}/>
            <MainLayout title={id?"ویرایش فرم":"افزودن فرم جدید"}>
                {/*<div className="btn-group-fab" role="group" aria-label="FAB Menu">
                    <div>
                        <button type="button" className="btn btn-main btn-success has-tooltip" data-placement="left"
                                onClick={sendData}
                                title="افزودن کاربر"><i className="mdi mdi-plus-thick" style={{fontSize:29}}></i></button>
                    </div>
                </div>*/}


                <div>
                    <div className={"mx-2 card card-body"}>
                        <div className={"row"}>
                            <div className={"col-lg-4"} >
                                <BaseInformationUpsertFormComponent sendData={sendData} />
                            </div>


                            <SecondInformationUpsertFormComponent />
                        </div>

                    </div>
                </div>
            </MainLayout>
        </StickyContainer>
    )
}
export default InsertFormRootComponent
