import React, {useEffect, useState} from 'react'
import MainLayout from "../RootComponent/MainLayout";
import PagingComponent from "../utility/PagingComponent";
import FilesGuardSystemTableComponent from "./FilesGuardSystemTableComponent";
import {useDispatch, useSelector} from "react-redux";
import {getArchivesFilesGuardSystemAction} from "../stateManager/actions/ArchiveAction";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import FileGuardSystemActionDialog from "../dialog/FileGuardSystemActionDialog";
const animatedComponents = makeAnimated();
const FilesGuardSystemRoot = ()=>{
    const dispatch = useDispatch()
    const [pageId,setPageId] = useState(1)
    const [searchValue,setSearchValue] = useState('')
    const [data,setData] = useState({})
    const [archiveId,setArchiveId] = useState(localStorage.getItem("archive"))
    const [usersArchivesState,setUsersArchivesState] = useState([]);
    const [reload,setReload] = useState();
    const files = useSelector(state => state.archiveTreesFiles)
    const usersArchives = useSelector(state => state.usersArchives)
    useEffect(()=>{
        getFiles()
        setArchives()
    },[pageId,searchValue,archiveId,usersArchives,reload])

    const getFiles = async ()=>{
        if(archiveId){
            await dispatch(getArchivesFilesGuardSystemAction({
                pageId,
                eachPerPage:12,
                searchValue,
                archiveId
            }))
        }
    }
    const setArchives = ()=>{
        let archives = []
        usersArchives.map(u=>{
            archives.push({
                value:u.archiveId._id,
                label:u.archiveId.title
            })
        })
        setUsersArchivesState(archives)
    }
    return(
        <MainLayout isMain={true} title={"لیست پرونده ها"} >
            <FileGuardSystemActionDialog data={data} setReload={setReload}/>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">

                            <div className={"row"}>
                                <div className={"col-lg-4"}>
                                    {usersArchivesState && (
                                        <Select
                                            onChange={(e)=>{
                                                setArchiveId(e.value)
                                            }}
                                            noOptionsMessage={()=>"یافت نشد"}
                                            placeholder={"جست و جو در بایگانی..."}
                                            components={animatedComponents}
                                            className={"mb-3"}
                                            options={usersArchivesState} />
                                    )}
                                </div>
                                <input className="form-control col-lg-8" type="text"
                                       placeholder={"جستجو..."}
                                       onChange={(e)=>{
                                           setSearchValue(e.target.value)
                                       }}
                                />
                            </div>
                            <p className={"mt-1"}>دسترسی شما : <span style={{color:"green"}}>{files.accessRule}</span></p>

                            <FilesGuardSystemTableComponent setData={setData} files={files.files}/>
                            <PagingComponent handlePaging={(page)=>setPageId(page)}
                                             pageId={files.pageId}
                                             eachPerPage={files.eachPerPage}
                                             total={files.total}/>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
export default FilesGuardSystemRoot