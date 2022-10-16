import React, {useContext, useEffect, useState} from "react";
import MainLayout from "../RootComponent/MainLayout";
import {getArchiveTreesService} from "../service/ArchiveTreeService";
import AddTreeDialog from "./dialog/AddTreeDialog";
import {ArchiveTreeContext} from "./ArchiveTreeContext";
import BaseInformationArchiveTreeComponent from "./BaseInformationArchiveTreeComponent";
import RightClickArchiveTreeComponent from "./RightClickArchiveTreeComponent";
import SecondInformationArchiveTreeComponent from "./SecondInformationArchiveTreeComponent";
import InsertMoreSettingDialog from "./dialog/InsertMoreSettingDialog";
import ArchiveTreeSettingDialog from "./dialog/ArchiveTreeSettingDialog";
import UpsertArchivesFormDialog from "./dialog/UpsertArchivesFormDialog";
import ElementsContextProvider from "../Form/Elements/ElementsContextProvider";
import UpsertMainArchiveTreesForm from "./dialog/UpsertMainArchiveTreesForm";


const ArchiveTreeRootComponent = ()=>{
    const [data,setData] = useState([])

    const { currentTree,setLastData,archiveId,currentArchiveTree,setCurrentArchiveTree} = useContext(ArchiveTreeContext)
    useEffect(()=>{
        getData()
    },[])


    const getData = async ()=>{
        const {data,status} = await getArchiveTreesService({isMain:true,mainParent:undefined,archiveId})
        if(status===200){
            setData(data)
            setLastData(data)
        }
    }
    return(
        <>
            <AddTreeDialog mainParent={currentTree}/>
            <InsertMoreSettingDialog />
            <ArchiveTreeSettingDialog currentArchiveTree={currentArchiveTree} />
            <UpsertMainArchiveTreesForm currentArchiveTree={currentArchiveTree} setCurrentArchiveTree={setCurrentArchiveTree}/>
            <div className={"row m-0 p-0"}>
                <BaseInformationArchiveTreeComponent data={data} />
                <SecondInformationArchiveTreeComponent/>
            </div>
            <RightClickArchiveTreeComponent/>
        </>
    )
}
export default ArchiveTreeRootComponent
