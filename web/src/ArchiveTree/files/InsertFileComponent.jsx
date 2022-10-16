import React, {useContext, useEffect, useRef, useState} from 'react'
import moment1 from "jalali-moment";
import {DatePicker} from "react-persian-datepicker";
import {dateStyle} from "../../utility/dateStyle";
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {getInsertFileInsertDataAction, insertFileAction} from "../../stateManager/actions/FileAction";
import moment from "moment-jalaali";
import {ArchiveTreeContext} from "../ArchiveTreeContext";
import Date_picker from "react-datepicker";
import makeAnimated from "react-select/animated";
import {validatorSP} from "../../utility/formValidator";
import {ArchiveTreeLineContext} from "../archiveTreeLine/ArchiveTreeLineContext";
import PersianDatePickerComponent from "../../utility/PersianDatePickerComponent";
import {defaultDate} from "../../utility/dateUtil";
import {useHistory} from "react-router";
const animatedComponents = makeAnimated();

const InsertFileComponent = ({inTree = true})=>{
    const history = useHistory()
    const formValidator = useRef(validatorSP())
    const dispatch = useDispatch()
    const insertFileData = useSelector(state => state.insertFileData)
    const forms = useSelector(state => state.forms)
    const {singleForAddFile,setIsShowAddFile,mainArchiveTree} = useContext(inTree?ArchiveTreeContext:ArchiveTreeLineContext)



    const [title,setTitle] = useState()
    const [fileStatus,setFileStatus] = useState()
    const [type,setType] = useState()
    const [keyword,setKeyword] = useState()
    const [fileCode,setFileCode] = useState()
    const [faDate,setFaDate] = useState(new Date().toISOString())
    const [enDate,setEnDate] = useState(new Date().toISOString())
    const [fileCodeType,setFileCodeType] = useState()
    const [applicantId,setApplicantId] = useState()
    const [contacts,setContacts] = useState([]);
    const [,formReload] = useState([]);
    const [hasSpecialForm,setHasSpecialForm] = useState(false)
    const [formSelected,setFormSelected] = useState()

    useEffect(()=>{
        console.log(singleForAddFile)
    },[singleForAddFile])

    useEffect(()=>{
        getData()
    },[])


    const getData = async ()=>{
        await dispatch(getInsertFileInsertDataAction())
    }



    const sendData = async ()=>{
        if(formValidator.current.allValid()){
            let data = {
                archiveTreeId:singleForAddFile._id,
                title,
                fileDate:singleForAddFile.lang==="fa"?faDate:enDate,
                fileStatus,
                fileCode,
                fileCodeType,
                type,
                keyword,
                contacts,
                applicantId,
                mainArchiveTreeId:mainArchiveTree._id,
                hasSpecialForm,
                formSelected
            }
            await dispatch(insertFileAction(data,history))
            setIsShowAddFile(false)
            setTitle('')
            setFileStatus('')
            setType('')
            setKeyword('')
            setFileCode('')
            setFaDate('')
            setEnDate('')
            setContacts([])
            setApplicantId('')
            setHasSpecialForm(false)
            setFormSelected('')
        }else{
            formValidator.current.showMessages()
            formReload(0)
        }

    }
    return(
        <div className={`${inTree?"col-lg-9":"col-lg-12"} `}>
            <p className={"mb-0"}>{singleForAddFile.route}</p>
            <div className={"card mt-2 p-3"}>
                <div className={"row mx-1 custom-cursor"} >
                    {/*<i className={"mdi mdi-arrow-right"} style={{fontSize:20,marginRight:-10,marginBottom:10}}/>*/}
                    <button onClick={()=>{
                        setIsShowAddFile(false)
                        setTitle('')
                        setFileStatus('')
                        setType('')
                        setKeyword('')
                        setFileCode('')
                        setFaDate('')
                        setEnDate('')
                        setContacts([])
                    }} type="button" className="btn btn-light waves-effect">
                        <i className="mdi mdi-arrow-right mr-2"></i>بازگشت
                    </button>

                </div>
                <div className={"row"}>
                    <div className="custom-control custom-checkbox col-lg-4 mt-2 mb-2">
                        <input type="checkbox" className="custom-control-input "
                               onClick={()=>{
                                   setHasSpecialForm(!hasSpecialForm)
                               }}
                               checked={hasSpecialForm}
                               id={"isFormDifferent"}/>
                        <label className="custom-control-label ml-2" htmlFor={"isFormDifferent"}>فرم روکش سند برای این پرونده متفاوت باشد</label>
                    </div>
                    {hasSpecialForm?(
                        <div className="col-lg-8">
                            <div className="form-group">
                                <select className="custom-select" onChange={(e)=>{
                                    setFormSelected(e.target.value)
                                }}>
                                    <option value={``} name={``}>انتخاب کنید</option>
                                    {forms.map(f=>(
                                        <option value={f._id} name={f._id}>{f.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ):null}
                </div>
                <span className={"row m-0 p-0"}>

                    {singleForAddFile.archive.availablePattern==="one" ||singleForAddFile.archive.availablePattern==="two" ||
                    singleForAddFile.archive.availablePattern==="five"?(
                        <div className="col-lg-4 mt-4" dir={"ltr"}>
                                    <span className={"row"}>
                                        {singleForAddFile.archive.availablePattern==="five"?null:(
                                            <span className={"mt-2 col-lg-4"}>{singleForAddFile.archive.availablePattern==="two"?
                                                `${singleForAddFile.archive.firstStringOfPattern}-${
                                                    moment1(new Date(), 'YYYY/MM/DD').locale('fa').format('YYYYMMDD')
                                                }`:`${singleForAddFile.archive.firstStringOfPattern}-`}</span>
                                        )}
                                        <input type="text"
                                               name={"fileCode"}
                                               value={fileCode}
                                               onChange={(e)=>{
                                                   formValidator.current.showMessageFor("fileCode")
                                                   setFileCode(e.target.value)
                                                   setFileCodeType(e.target.value)
                                               }}
                                               className="form-control col-lg-8" id="validationCustom04"
                                               placeholder="شماره پرونده" required/>
                                        {formValidator.current.message("fileCode",fileCode,
                                            singleForAddFile.archive.availablePattern==="one" || singleForAddFile.archive.availablePattern==="two"
                                            || singleForAddFile.archive.availablePattern==="four"?"required|min:3|max:20":"min:3|max:20")}
                                    </span>
                        </div>
                    ):null}
                    </span>
                <div className={"row mt-2"}>
                    <div className="form-group col-lg-12">
                        <label htmlFor="validationCustom04">عنوان پرونده</label>
                        <input type="text"
                               name={"title"}
                               value={title}
                               onChange={(e)=>{
                                   formValidator.current.showMessageFor("title")
                                   setTitle(e.target.value)
                               }}
                               className="form-control" id="validationCustom04"
                               placeholder="عنوان پرونده را وارد نمایید..." required/>
                        {formValidator.current.message("title",title,"required|min:2|max:255")}
                    </div>
                </div>
                <div className={"row mt-2"}>
                    <div className="form-group col-lg-4">
                        <label htmlFor="validationCustom04">تاریخ پرونده</label>
                        {singleForAddFile.lang==="fa"?(
                                <>
                                    <PersianDatePickerComponent value={faDate} onSelect={(moment)=>{
                                        const miladiDate = moment.format("MM/DD/YYYY")
                                        const persianDate = moment.format("jYYYY/jMM/jDD")
                                        console.log(persianDate)
                                        console.log(miladiDate)
                                        setFaDate(moment)
                                    }}/>
                                </>
                        ):(
                            <div dir={"ltr"}>
                                <PersianDatePickerComponent value={enDate} onSelect={(moment)=>{
                                    const miladiDate = moment.format("MM/DD/YYYY")
                                    const persianDate = moment.format("jYYYY/jMM/jDD")
                                    console.log(persianDate)
                                    console.log(miladiDate)
                                    setEnDate(moment)
                                }}/>
                            </div>
                        )}
                    </div>

                    <div className="form-group col-lg-4">
                        <label htmlFor="validationCustom04">وضعیت پرونده</label>
                        <select className="custom-select" onChange={(e)=>{
                            formValidator.current.showMessageFor("fileStatus")
                            setFileStatus(e.target.value)
                        }}>
                            <option value={undefined} name={undefined}>انتخاب کنید</option>
                            <option value={"جاری"} name={"جاری"}>جاری</option>
                            <option value={"نیمه جاری"} name={"نیمه جاری"}>نیمه جاری</option>
                            <option value={"مختومه"} name={"مختومه"}>مختومه</option>
                        </select>
                        {formValidator.current.message("fileStatus",fileStatus,"required")}
                    </div>
                    <div className="form-group col-lg-4">
                        <label htmlFor="validationCustom04">نوع پرونده</label>
                        <select className="custom-select" onChange={(e)=>{
                            formValidator.current.showMessageFor("type")
                            setType(e.target.value)
                        }}>
                            <option value={undefined} name={undefined}>انتخاب کنید</option>
                            {insertFileData?.fileAccess?.map(fileAccessItem=>(
                                <option value={fileAccessItem} name={fileAccessItem}>{fileAccessItem}</option>
                            ))}
                        </select>
                        {formValidator.current.message("type",type,"required")}
                    </div>

                </div>
                <div className={"row my-4"}>
                    <div className={"col-lg-6"}>
                        <label htmlFor="validationCustom04">انتخاب مخاطبین</label>
                        <div onClick={()=>{
                            getData()
                        }}>
                            <Select
                                onChange={(e)=>{
                                    setContacts(e)
                                }}
                                noOptionsMessage={()=>"یافت نشد"}
                                placeholder={"جست و جو در مخاطبین..."}
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                options={insertFileData.people} />
                        </div>
                    </div>
                    <div className={"col-lg-6"}>
                        <label htmlFor="validationCustom04">درخواست کننده</label>
                        <div onClick={()=>{
                            getData()
                        }}>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                onChange={(e)=>{
                                    setApplicantId(e.value)
                                }}
                                noOptionsMessage={()=>"یافت نشد"}
                                placeholder={"جست و جو در سمت های سازمانی..."}
                                components={animatedComponents}
                                options={insertFileData.applicants}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="validationCustom04">کلید واژه (برای جست و جوی راحت تر)</label>
                    <textarea id="txtFirstNameBilling"
                              rows={5}
                              value={keyword}
                              onChange={(e)=>{
                                  setKeyword(e.target.value)
                              }}
                              placeholder={"کلید واژه های مورد نظر خود را جهت جستجو راحت تر وارد کنید"}
                              className="form-control"/>
                </div>
                <div>
                    <button className="btn btn-success mb-2 col-lg-2" onClick={sendData}>ثبت پرونده</button>
                </div>
            </div>
        </div>

    )
}
export default InsertFileComponent
