import React, {useEffect, useState} from 'react'
import MainLayout from "../RootComponent/MainLayout";
import ArchiveTreeRootComponent from "./ArchiveTreeRootComponent";
import ArchiveTreeContextProvider from "./ArchiveTreeContextProvider";
import ArchiveTreeLineRoot from "./archiveTreeLine/ArchiveTreeLineRoot";
import ArchiveTreeLineProvider from "./archiveTreeLine/ArchiveTreeLineProvider";
const ArchiveTreeRoot = ()=>{
    const [isTree,setIsTree] = useState(localStorage.getItem("isTree"))
    return(
        <MainLayout title={"قفسه ها"} isMain={true}>
            <span className={"row mx-3 mb-1 "} style={{marginTop:-30,paddingBottom:10}}>
                <span className={"custom-cursor custom-box-shadow"} style={{backgroundColor:"#283D92",paddingTop:20,paddingBottom:10,borderRadius:7}}>
                    <span style={{padding:"6px 10px"}}>
                    <span style={{backgroundColor:isTree?"#283D92":"white",padding:"7px 4px",borderRadius:7,marginLeft:10}} onClick={()=>{
                        localStorage.setItem("isTree",false)
                        setIsTree(false)
                    }}>
                    <img src={"./assets/images/foldermode.png"} className={"mx-1"} width={30}/>
                </span>
                <span className={"custom-cursor"} style={{backgroundColor:isTree?"white":"#283D92",padding:"7px 4px",borderRadius:7}} onClick={()=>{
                        localStorage.setItem("isTree",true)
                        setIsTree(true)
                    }}>
                        <img src={"./assets/images/treemode.png"} className={"mx-1"} width={30}/>
                    </span>
                </span>
                </span>
            </span>
            {isTree?(
                <ArchiveTreeContextProvider>
                    <ArchiveTreeRootComponent/>
                </ArchiveTreeContextProvider>
            ):(
                <ArchiveTreeLineProvider>
                    <ArchiveTreeLineRoot/>
                </ArchiveTreeLineProvider>
            )}
        </MainLayout>
    )
}
export default ArchiveTreeRoot
