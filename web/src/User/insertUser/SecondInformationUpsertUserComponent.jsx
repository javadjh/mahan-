import React, {useContext, useEffect} from 'react'
import {UpsertUserContext} from "./UpsertUserContext";
import {Checkbox} from "antd";
const SecondInformationUpsertUserComponent = ({upsertUserData,sendData,getData})=>{
    const {
        setRole,
        role,
        setArchive,
        archive,
        dataRole,
        addUserRoleHandler,
        deleteUserRoleHandle,
        fileAccess,
        fileAccessManager
    } = useContext(UpsertUserContext)

    return(
        <div className="col-lg-6">
            <div className="card card-body mx-2">
                <h4 className="card-title mx-3">انتخاب بایگانی و نقش</h4>
                <p className="card-title-desc mx-3">در این قسمت برای هر کاربر، نقش آن در هر بایگانی تعیین می گردد</p>
                <div className={"row"}>
                    <div className="col-lg-6">
                        <div className="col-md-12">
                            <label>انتخاب بایگانی</label>
                            <div className={"form-group"} onChange={(e)=>{
                                setArchive(e.target.value)
                            }}>
                                <select className="custom-select">
                                    <option selected={archive===undefined}>انتخاب کنید</option>
                                    {upsertUserData.archives.map(a=>(
                                        <option value={`${a._id}!@${a.title}`} selected={archive===a}>{a.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 row">
                        <div className="col-lg-12">
                            <label>انتخاب نقش</label>
                            <div className={"form-group row"} >
                                <select onClick={()=>{
                                    getData()
                                }} className="custom-select" onChange={(e)=>{
                                    setRole(e.target.value)
                                }}>
                                    <option selected={role===undefined} >انتخاب کنید</option>
                                    {upsertUserData.roles.map(r=>(
                                        <option value={`${r._id}!@${r.title}`} selected={role===r}>{r.title}</option>
                                    ))}
                                </select>

                            </div>
                        </div>

                    </div>
                    <div className="col-lg-8 row ">
                        <div className={"ml-4"}>
                            <label>دسترسی رویت پرونده</label>
                            <div>
                                <Checkbox checked={fileAccess.includes("محرمانه")} onChange={(e)=>{
                                    fileAccessManager("محرمانه",e.target.checked)
                                }}>محرمانه</Checkbox>
                                <Checkbox checked={fileAccess.includes("عادی")} onChange={(e)=>{
                                    fileAccessManager("عادی",e.target.checked)
                                }}>عادی</Checkbox>
                                <Checkbox checked={fileAccess.includes("به کل محرمانه")} onChange={(e)=>{
                                    fileAccessManager("به کل محرمانه",e.target.checked)
                                }}>به کل محرمانه</Checkbox>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <label> </label>
                        <div>
                            <button className={"btn btn-block btn-dark mx-1 waves-effect waves-light"} onClick={()=>addUserRoleHandler()} >افزودن نقش</button>
                        </div>
                    </div>
                </div>
                <span className={"mt-2 mx-3"}>
                    {dataRole.map((d)=>(
                        <div className={"btn btn-light btn-block"} style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}>
                            <span>{d.archiveTitle} - {d.roleTitle}</span>
                            <div className={"row mx-2"}>
                                {d.fileAccess.map((access,index)=>(
                                    <span>{access} {index===d.fileAccess.length-1?"":"-"} </span>
                                ))}

                                <i className={"mdi mdi-close mx-2"} onClick={(()=> deleteUserRoleHandle(d))} style={{color:"red"}}/>
                            </div>
                        </div>
                    ))}
                </span>

                <div className={"row"}>
                    <div className={"col-lg-8"}></div>
                    <button className={"btn btn-success py-1 col-lg-4 mt-5"} style={{fontSize:17}} onClick={sendData}>ثبت</button>
                </div>
            </div>
        </div>
    )
}
export default SecondInformationUpsertUserComponent
