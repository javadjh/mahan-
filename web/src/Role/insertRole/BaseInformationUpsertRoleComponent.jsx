import React, {useContext} from "react";
import {UpsertRoleContext} from "./UpsertRoleContext";
const BaseInformationUpsertRoleComponent = ({insertRoleHandle})=>{
    const {
        title,setTitle,
        description,setDescription,
        formValidator
    } = useContext(UpsertRoleContext)

    return(
        <div className="card" style={{height:450}}>
            <div className="card-body">
                <h4 className="card-title">اطلاعات پایه</h4>
                <p className="card-title-desc">در این قسمت باید اطلاعات کلی نقش را وارد نمایید</p>
                <form className="needs-validation" noValidate>
                    <div >
                        <div className="form-group">
                            <label htmlFor="txtFirstNameBilling" className="col-lg-3 col-form-label">عنوان</label>
                            <div className="col-lg-12">
                                <input id="txtFirstNameBilling"
                                       value={title}
                                       onChange={(e)=>{
                                           formValidator.current.showMessageFor("title")
                                           setTitle(e.target.value)
                                       }}
                                       name={"title"}
                                       type="text"
                                       placeholder={"عنوان نقش را وارد کنید..."}
                                       className="form-control"/>
                                {formValidator.current.message("title",title,"required|min:2|max:80")}
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="txtAddress1Billing" className="col-lg-3 col-form-label">توضیحات</label>
                        <div className="col-lg-12">
                            <textarea id="txtAddress1Billing"
                                      name="description"
                                      value={description}
                                      onChange={(e)=>{
                                          formValidator.current.showMessageFor("description")
                                          setDescription(e.target.value)
                                      }}
                                      rows="4"
                                      placeholder={"توضیحات نقش را وارد کنید..."}
                                      className="form-control"/>
                            {formValidator.current.message("description",description,"min:2|max:255")}
                            <div className={"row"}>
                                <div className={"col-lg-9"}></div>
                                <div className={"col-lg-3"}>
                                    <button type="button" className="btn btn-success btn-block mt-4"
                                            onClick={insertRoleHandle}>ثبت</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>

            </div>
        </div>
    )
}
export default BaseInformationUpsertRoleComponent
