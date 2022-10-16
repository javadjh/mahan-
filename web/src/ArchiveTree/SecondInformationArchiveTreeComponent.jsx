import React, {useContext, useEffect, useState} from "react";

import {ArchiveTreeContext} from "./ArchiveTreeContext";
import {useDispatch, useSelector} from "react-redux";
import makeAnimated from 'react-select/animated';

import InsertFileComponent from "./files/InsertFileComponent";
import ShowFilesRootComponent from "./files/ShowFilesRootComponent";


const SecondInformationArchiveTreeComponent = ()=>{
    const {isShowAddFile,currentArchiveTree} = useContext(ArchiveTreeContext)
    return(
        <>
                {isShowAddFile?(
                    <InsertFileComponent/>
            ):(
                <>
                    {currentArchiveTree?(
                        <ShowFilesRootComponent/>
                    ):null}
                </>
            )}
        </>
    )
}
export default SecondInformationArchiveTreeComponent
