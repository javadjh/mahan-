import React, {useContext} from 'react'
import {UpsertFormContext} from "./UpsertFormContext";
import ReactTooltip from "react-tooltip";
import { StickyContainer, Sticky } from 'react-sticky';
import {useSelector} from "react-redux";

const BaseInformationUpsertFormComponent = ({sendData})=>{
    const {addNewChildren} = useContext(UpsertFormContext)
    const {childrenList,
        formValidator,
        title,setTitle,
        description,setDescription} = useContext(UpsertFormContext)
    const formPreview = useSelector(state => state.formPreview)
    return(
        <div className="card col-lg-12 pb-2">
            <div>
                <div className="form-group">
                    <label >عنوان فرم</label>
                    <div>
                        <input data-parsley-type="alphanum"
                               value={title}
                               onChange={(e)=>{
                                   formValidator.current.showMessageFor("title")
                                   setTitle(e.target.value)
                               }}
                               type="text" className="form-control"
                               placeholder="عنوان فرم را وارد کنید..."/>
                        {formValidator.current.message("title",title,"required|min:2|max:80")}
                    </div>
                </div>
                <div className="form-group">
                    <label>توضیحات فرم</label>
                    <div>
                        <textarea
                            value={description}
                            onChange={(e)=>{
                                formValidator.current.showMessageFor("description")
                                setDescription(e.target.value)
                            }}
                            className="form-control" rows="3"/>
                        {formValidator.current.message("description",description,"min:5|max:255")}
                    </div>
                </div>
                <h4 className="card-title mb-3">لیست ابزار ها</h4>
                <Sticky topOffset={450}>
                    {({
                          style,
                          distanceFromTop,
                          distanceFromBottom,
                          calculatedHeight
                      }) => (
                        <header style={style}>
                            <div className={"card card-body"}>
                                <div>
                                    <div >
                                        <div onClick={()=>addNewChildren("input")} style={{cursor:"pointer"}}>
                                            <div className={"row text-center mb-0"}>
                                                <i className="mdi mdi-text-recognition mx-3 mb-0"  style={{fontSize:20}}/>
                                                <p className={"m-0"}>دریافت متن ساده</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className={"m-2"}/>
                                    <div  onClick={()=>addNewChildren("textArea")} style={{cursor:"pointer"}}>
                                        <div className={"row text-center mb-0"}>
                                            <i  className="mdi mdi-format-text-rotation-down-vertical mx-3 mb-0" style={{fontSize:20}}/>
                                            <p className={"m-0"}>نوشتن چند خطی</p>
                                        </div>
                                    </div>
                                    <hr className={"m-2"}/>
                                    <div>
                                        <div onClick={()=>addNewChildren("radio")} style={{cursor:"pointer"}}>
                                            <div className={"row text-center mb-0"}>
                                                <i className="mdi mdi-radiobox-marked mx-3 mb-0" style={{fontSize:20}}/>
                                                <p className={"m-0"}>دریافت یک گزینه از چند گزینه</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className={"m-2"}/>
                                    <div>
                                        <div onClick={()=>addNewChildren("checkBox")} style={{cursor:"pointer"}}>
                                            <div className={"row text-center mb-0"}>
                                                <i className="mdi mdi-checkbox-marked mx-3 mb-0" style={{fontSize:20}}/>
                                                <p className={"m-0"}>دریافت چند گزینه از چند گزینه</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className={"m-2"}/>
                                    <div>
                                        <div onClick={()=>addNewChildren("selector")} style={{cursor:"pointer"}}>
                                            <div className={"row text-center mb-0"}>
                                                <i className="mdi mdi-select-place mx-3 mb-0" style={{fontSize:20}}/>
                                                <p className={"m-0"}>گزینه های زیاد و انتخاب یکی</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className={"m-2"}/>
                                    <div>
                                        <div onClick={()=>addNewChildren("date")} style={{cursor:"pointer"}}>
                                            <div className={"row text-center mb-0"}>
                                                <i className="mdi mdi-calendar-month mx-3 mb-0" style={{fontSize:20}}/>
                                                <p className={"m-0"}>دریافت تاریخ (جلالی)</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className={"m-2"}/>
                                    <div>
                                        <div onClick={()=>addNewChildren("dateMiladi")} style={{cursor:"pointer"}}>
                                            <div className={"row text-center mb-0"}>
                                                <i className="mdi mdi-calendar-month mx-3 mb-0" style={{fontSize:20}}/>
                                                <p className={"m-0"}>دریافت تاریخ (میلادی)</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className={"m-2"}/>
                                    <div className={"custom-cursor"}>
                                        <div>
                                            <div onClick={()=>addNewChildren("input","melliCode")} className={"row text-center mb-0"}>
                                                <i className="mdi mdi-two-factor-authentication mx-3 mb-0" style={{fontSize:20}}/>
                                                <p className={"m-0"}>دریافت شماره ملی</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className={"m-2"}/>
                                    <div className={"custom-cursor"}>
                                        <div>
                                            <div onClick={()=>addNewChildren("input","email")} className={"row text-center mb-0"}>
                                                <i className="mdi mdi-email-multiple-outline mx-3 mb-0" style={{fontSize:20}}/>
                                                <p className={"m-0"}>دریافت ایمیل</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className={"m-2"}/>
                                    <div className={"custom-cursor"}>
                                        <div>
                                            <div onClick={()=>addNewChildren("input","phoneNumber")} className={"row text-center mb-0"}>
                                                <i className="mdi mdi-phone-outline mx-3 mb-0" style={{fontSize:20}}/>
                                                <p className={"m-0"}>دریافت شماره تماس</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className={"m-2"}/>
                                    <div className={"custom-cursor"}>
                                        <div>
                                            <div onClick={()=>addNewChildren("input","number")} className={"row text-center mb-0"}>
                                                <i className="mdi mdi-clock-digital mx-3 mb-0" style={{fontSize:20}}/>
                                                <p className={"m-0"}>دریافت عدد</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className={"m-2"}/>
                                    <div className={"custom-cursor mb-2"}>
                                        <div>
                                            <div onClick={()=>addNewChildren("input","unique")} className={"row text-center mb-0"}>
                                                <i className="mdi mdi-shield-edit-outline mx-3 mb-0" style={{fontSize:20}}/>
                                                <p className={"m-0"}>دریافت ورودی یکتا</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>




                                <div className={"row"}>
                                    <span className={"col-lg-8"}>
                                        <button type="button" className="btn btn-block btn-main btn-success p-2 " onClick={sendData}>ثبت</button>
                                    </span>
                                    <span className={"col-lg-4"} hidden={formPreview.length<=0}>
                                        <button onClick={()=>{
                                            window.$('#showFileFormDialog').modal('show')
                                        }} type="button" className="btn btn-block btn-main btn-primary p-2 " >پیش نمایش</button>
                                    </span>

                                </div>



                                <div>
                                </div>


                            </div>
                        </header>
                    )}
                </Sticky>

        </div>
    </div>
    )
}
export default BaseInformationUpsertFormComponent
