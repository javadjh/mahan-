import React, {Fragment, useContext, useEffect, useState} from 'react'
import MainLayout from "../RootComponent/MainLayout";
import {useDispatch, useSelector} from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {getArchiveFilesArchive} from "../stateManager/actions/FileAction";
import {LibraryContext} from "./LibraryContext";
import LibrariesDocumentsComponent from "./LibrariesDocumentsComponent";

const animatedComponents = makeAnimated();
const LibraryRootComponent = ()=>{
    const dispatch = useDispatch()
    const {setFile,sendData,archive,setArchive} = useContext(LibraryContext)

    const usersArchives = useSelector(state => state.usersArchives)
    const archivesFile = useSelector(state => state.archivesFile)


    const [usersArchivesState,setUsersArchivesState] = useState([]);




    useEffect(()=>{
        setArchives()
    },[usersArchives])

    useEffect(()=>{
        if(archive)
            getArchivesFile('')
    },[archive])

    const setArchives = ()=>{
        let archives = []
        console.table(usersArchives)
        usersArchives.map(u=>{
            archives.push({
                value:u.archiveId._id,
                label:u.archiveId.title
            })
        })
        console.log(archives)
        setUsersArchivesState(archives)
        if(archives.length===1){
            setArchive(archives[0].value)
        }
    }



    const getArchivesFile = async (searchValue)=>{
        await dispatch(getArchiveFilesArchive({
            archiveId:archive,
            searchValue
        }))
    }



    return(
        <Fragment>
            <MainLayout title={"کازیو"} isMain={true}>
                <div className={"mb-4 mx-2"}>
                <span className="alert alert-info " role="alert">
                    <span>جهت حذف اسناد انتخاب شده کلید <b style={{color:"green"}}>Del</b> و جهت انتقال به پوشه کلید <b style={{color:"green"}}>M</b> را فشار دهید</span>
                </span>
                </div>
                <div className={"card mx-2 my-0"}>
                    <div className={"card-body"}>

                        <div className={"row"}>
                            <div className={"col-lg-5"}>
                                <label htmlFor="validationCustom04">انتخاب بایگانی</label>
                                {usersArchivesState.length===1?(
                                    <>
                                        <p style={{color:"green"}}>{usersArchivesState[0].label}</p>
                                    </>
                                ):(
                                    <div>
                                        <Select
                                            onChange={(e)=>{
                                                setArchive(e.value)
                                            }}
                                            noOptionsMessage={()=>"یافت نشد"}
                                            placeholder={"جست و جو در بایگانی..."}
                                            components={animatedComponents}
                                            options={usersArchivesState} />
                                    </div>
                                )}

                            </div>
                            <div className={"col-lg-5"}>
                                <label htmlFor="validationCustom04">انتخاب پرونده</label>
                                <div>
                                    <Select
                                        onChange={(e)=>{
                                            setFile(e.value)
                                            getArchivesFile(e.label)
                                        }}
                                        noOptionsMessage={()=>"یافت نشد"}
                                        placeholder={"جست و جو در پرونده..."}
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        options={archivesFile} />
                                </div>
                            </div>
                            <div className={"col-lg-2"}>
                                <br/>
                                <button className={"btn btn-success mt-2 btn-block"} onClick={sendData}>ثبت اسناد</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={" mt-3"} style={{marginRight:32}}>
                    <LibrariesDocumentsComponent/>
                </div>
            </MainLayout>
        </Fragment>
    )
}
export default LibraryRootComponent
