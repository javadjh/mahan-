import React, { Fragment, useContext, useRef } from "react";
import PersianDatePickerComponent from "../../utility/PersianDatePickerComponent";
import Select from "react-select";
import { useSelector } from "react-redux";
import { UpsertDocumentContext } from "../document/UpsertDocumentContext";
import { validatorSP } from "../../utility/formValidator";
const FileAlertsDialog = () => {
  const {
    alertTitle,
    setAlertTitle,
    alertDescription,
    setAlertDescription,
    alertDate,
    setAlertDate,
    formValidator,
    setSingleEmail,
    insertFileAlertHandle,
  } = useContext(UpsertDocumentContext);
  return (
    <Fragment>
      <div
        className="modal fade"
        id="fileAlertsDialog"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content p-4">
            <div>
              <div>
                <p>
                  میتوانید با استفاده از فرم زیر برای پرونده هشدار ایجاد کنید تا
                  بقیه کاربران از هشدار های مربوط به این پرونده مطلع باشند
                </p>
                <div className="form-group">
                  <label htmlFor="validationCustom04">عنوان هشدار</label>
                  <input
                    type="text"
                    name={"alertTitle"}
                    value={alertTitle}
                    onChange={(e) => {
                      setAlertTitle(e.target.value);
                      formValidator.current.showMessageFor("alertTitle");
                    }}
                    className="form-control"
                    id="validationCustom04"
                    placeholder={"عنوان هشدار را وارد کنید..."}
                    required
                  />
                  {formValidator.current.message(
                    "alertTitle",
                    alertTitle,
                    "required|min:2|max:255"
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="validationCustom04">توضیحات</label>
                  <textarea
                    rows={3}
                    type="text"
                    name={"alertDescription"}
                    value={alertDescription}
                    onChange={(e) => {
                      setAlertDescription(e.target.value);
                      formValidator.current.showMessageFor("alertDescription");
                    }}
                    className="form-control"
                    id="validationCustom04"
                    placeholder={"توضیحات هشدار را وارد کنید..."}
                    required
                  />
                  {formValidator.current.message(
                    "alertDescription",
                    alertDescription,
                    "required|min:2|max:1000"
                  )}
                </div>
                <div className="form-group">
                  <PersianDatePickerComponent
                    label="تاریخ انتضا"
                    value={alertDate}
                    onSelect={(moment) => {
                      const miladiDate = moment.format("MM/DD/YYYY");
                      const persianDate = moment.format("jYYYY/jMM/jDD");

                      setAlertDate(moment);
                    }}
                  />
                </div>
                <div className={"row"}>
                  <div className={"col-lg-9"}></div>
                  <div className={"col-lg-3"}>
                    <button
                      onClick={insertFileAlertHandle}
                      className={"btn btn-success btn-block mb-2"}
                    >
                      ثبت
                    </button>
                  </div>
                </div>
              </div>
              {/*<span className={"mt-3"}>
                                {fileAlerts.map(f=>(
                                    <div className="alert alert-primary" role="alert">
                                        <div style={{
                                            border: "2px dashed rgba(203,203,203,0.77)",
                                            borderRadius:5,
                                            padding:10
                                        }}>
                                            <p className={"m-0 p-0"}>{f.title}</p>
                                            <p className={"m-0 p-0"}>{f.description}</p>
                                        </div>
                                        <p style={{color:"black"}} className={"m-0 p-0"}>اعتبار هشدار : {f.alertDate}</p>
                                        <p style={{color:"black"}} className={"m-0 p-0"}>ایجاد : {f.createDate}</p>
                                    </div>
                                ))}
                            </span>*/}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default FileAlertsDialog;
