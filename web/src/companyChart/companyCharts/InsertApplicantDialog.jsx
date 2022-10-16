import React, {Fragment, useState} from "react";
const InsertApplicantDialog = ({sendData})=>{
    const [title,setTitle] = useState('')
    return(
        <Fragment>
            <div className="modal fade" id="insertApplicantDialog" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content p-4">
                        <div >
                            <p>افزودن سمت سازمانی</p>
                            <input type={"text"}
                                   value={title}
                                   placeholder={"عنوان را وارد کنید..."}
                                   onChange={(e)=>{
                                       setTitle(e.target.value)
                                   }}
                                   className={"form-control"}
                            />
                            <div className={"row"}>
                                <div className={"col-lg-9"}></div>
                                <button onClick={()=>{
                                    if(title.length>2){
                                        sendData(title,setTitle)
                                    }

                                }} className={"btn btn-success col-lg-3 btn-block mt-4"}>ثبت</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default InsertApplicantDialog