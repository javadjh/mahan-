import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  Fragment,
} from "react";
import moment1 from "jalali-moment";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  getFileStatisticAction,
  getInsertFileInsertDataAction,
  getSingleFileArchive,
  setManualSingleFileArchive,
  updateFileAction,
} from "../../stateManager/actions/FileAction";
import { validatorSP } from "../../utility/formValidator";
import PersianDatePickerComponent from "../../utility/PersianDatePickerComponent";
import { defaultDate } from "../../utility/dateUtil";
import { RootContext } from "../../RootComponent/RootContext";
const UpdateFileDialog = ({ fileId }) => {
  const formValidator = useRef(validatorSP());
  const dispatch = useDispatch();
  const insertFileData = useSelector((state) => state.insertFileData);
  const singleForAddFile = useSelector((state) => state.file);
  const { handleHide } = useContext(RootContext);

  const [title, setTitle] = useState();
  const [fileStatus, setFileStatus] = useState();
  const [type, setType] = useState();
  const [keyword, setKeyword] = useState("");
  const [fileCode, setFileCode] = useState();
  const [faDate, setFaDate] = useState();
  const [enDate, setEnDate] = useState();
  const [isDateValid, setIsDateValid] = useState(false);
  const [isDataReceived, setIsDataReceived] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [applicantId, setApplicantId] = useState();
  const [, formReload] = useState([]);

  useEffect(() => {
    getFileData();
    return () => {
      dispatch(setManualSingleFileArchive({}));
    };
  }, []);

  useEffect(() => {
    if (singleForAddFile.title) {
      setTitle(singleForAddFile.title);
      setFileStatus(singleForAddFile.fileStatus);
      setType(singleForAddFile.type);
      setKeyword(singleForAddFile.keyword ? singleForAddFile.keyword : "");
      setFileCode(singleForAddFile.fileCodeType);
      setFaDate(singleForAddFile.fileDateMiladi);
      setEnDate(singleForAddFile.fileDateMiladi);
      setContacts(singleForAddFile.contacts);
      setApplicantId(singleForAddFile.applicant);
      setIsDateValid(true);
      setIsDataReceived(true);
    }
  }, [singleForAddFile]);

  useEffect(() => {
    getData();
  }, []);

  const getFileData = async () => {
    if (!handleHide("ویرایش پرونده") || !handleHide("ناظر")) {
      if (fileId) {
        await dispatch(getSingleFileArchive(fileId));
      }
    }
  };

  const getData = async () => {
    if (!handleHide("ویرایش پرونده") || !handleHide("ناظر")) {
      await dispatch(getInsertFileInsertDataAction());
    }
  };

  const sendData = async () => {
    if (formValidator.current.allValid()) {
      let data = {
        archiveTreeId: singleForAddFile.archiveTreeId._id,
        title,
        fileDate: faDate,
        fileStatus,
        type,
        keyword,
        contacts,
        applicantId: applicantId,
      };
      if (fileCode) {
        data.fileCode = fileCode;
      }
      await dispatch(updateFileAction(data, singleForAddFile._id));
      setTitle("");
      setFileStatus("");
      setType("");
      setKeyword("");
      setFileCode("");
      setContacts([]);
      setApplicantId({});
    } else {
      formValidator.current.showMessages();
      formReload(0);
    }
    await dispatch(getFileStatisticAction(singleForAddFile._id));
  };
  return (
    <Fragment>
      <div
        className="modal fade"
        id="updateFileDialog"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl " role="document">
          <div className="modal-content p-4">
            <div className={"col-lg-12 card"}>
              {singleForAddFile._id ? (
                <span className={"row "}>
                  <div className={"col-lg-8"}>
                    <p className={"mb-0"}>{singleForAddFile.route}</p>
                    <h3 style={{ display: "inline" }}>ویرایش پرونده </h3>
                  </div>
                  {singleForAddFile.archiveTreeId.archive.availablePattern ===
                    "one" ||
                  singleForAddFile.archiveTreeId.archive.availablePattern ===
                    "two" ||
                  singleForAddFile.archiveTreeId.archive.availablePattern ===
                    "five" ? (
                    <div className="col-lg-4 mt-4" dir={"ltr"}>
                      <span className={"row"}>
                        {singleForAddFile.archiveTreeId.archive
                          .availablePattern === "five" ? null : (
                          <span className={"mt-2 mr-2 ml-1"}>
                            {singleForAddFile.archiveTreeId.archive
                              .availablePattern === "two"
                              ? `${
                                  singleForAddFile.archiveTreeId.archive
                                    .firstStringOfPattern
                                }-${moment1(new Date(), "YYYY/MM/DD")
                                  .locale("fa")
                                  .format("YYYYMMDD")}`
                              : `${singleForAddFile.archiveTreeId.archive.firstStringOfPattern}-`}
                          </span>
                        )}
                        <input
                          type="text"
                          name={"fileCode"}
                          value={fileCode}
                          onChange={(e) => {
                            formValidator.current.showMessageFor("fileCode");
                            setFileCode(e.target.value);
                          }}
                          className="form-control col-lg-8 mx-2"
                          id="validationCustom04"
                          placeholder="شماره پرونده"
                          required
                        />
                        {formValidator.current.message(
                          "fileCode",
                          fileCode,
                          singleForAddFile.archiveTreeId.archive
                            .availablePattern === "one" ||
                            singleForAddFile.archiveTreeId.archive
                              .availablePattern === "two" ||
                            singleForAddFile.archiveTreeId.archive
                              .availablePattern === "four"
                            ? "required|min:3|max:20"
                            : "min:3|max:20"
                        )}
                      </span>
                    </div>
                  ) : null}
                </span>
              ) : null}
              <div className={"row mt-2"}>
                <div className="form-group col-lg-3">
                  <label htmlFor="validationCustom04">عنوان پرونده</label>
                  <input
                    type="text"
                    name={"title"}
                    value={title}
                    onChange={(e) => {
                      formValidator.current.showMessageFor("title");
                      setTitle(e.target.value);
                    }}
                    className="form-control"
                    id="validationCustom04"
                    placeholder="عنوان پرونده را وارد نمایید..."
                    required
                  />
                  {formValidator.current.message(
                    "title",
                    title,
                    "required|min:2|max:255"
                  )}
                </div>
                <div className="form-group col-lg-3">
                  {singleForAddFile._id ? (
                    <>
                      {singleForAddFile.archiveTreeId.lang === "fa" ? (
                        <div>
                          <label htmlFor="validationCustom04">
                            تاریخ پرونده
                            {moment1(
                              singleForAddFile.fileDateMiladi,
                              "YYYY/MM/DD"
                            )
                              .locale("fa")
                              .format("YYYY/MM/DD")}
                          </label>
                          <PersianDatePickerComponent
                            onSelect={(momentDate) => {
                              setFaDate(momentDate + "");
                            }}
                          />
                        </div>
                      ) : (
                        <div>
                          <label htmlFor="validationCustom04">
                            تاریخ پرونده(میلادی)
                          </label>
                          <PersianDatePickerComponent
                            onSelect={(momentDate) => {
                              setFaDate(momentDate + "");
                            }}
                          />
                        </div>
                      )}
                    </>
                  ) : null}
                </div>

                <div className="form-group col-lg-3">
                  <label htmlFor="validationCustom04">وضعیت پرونده</label>
                  <select
                    className="custom-select"
                    onChange={(e) => {
                      formValidator.current.showMessageFor("fileStatus");
                      setFileStatus(e.target.value);
                    }}
                  >
                    <option
                      value={"جاری"}
                      selected={fileStatus === "جاری"}
                      name={"جاری"}
                    >
                      جاری
                    </option>
                    <option
                      value={"نیمه جاری"}
                      selected={fileStatus === "نیمه جاری"}
                      name={"نیمه جاری"}
                    >
                      نیمه جاری
                    </option>
                    <option
                      value={"مختومه"}
                      selected={fileStatus === "مختومه"}
                      name={"مختومه"}
                    >
                      مختومه
                    </option>
                  </select>
                  {formValidator.current.message(
                    "fileStatus",
                    fileStatus,
                    "required"
                  )}
                </div>
                <div className="form-group col-lg-3">
                  <label htmlFor="validationCustom04">نوع پرونده</label>
                  <select
                    className="custom-select"
                    onChange={(e) => {
                      formValidator.current.showMessageFor("type");
                      setType(e.target.value);
                    }}
                  >
                    <option
                      value={"عادی"}
                      selected={type === "عادی"}
                      name={"عادی"}
                    >
                      عادی
                    </option>
                    <option
                      value={"محرمانه"}
                      selected={type === "محرمانه"}
                      name={"محرمانه"}
                    >
                      محرمانه
                    </option>
                    <option
                      value={"به کل محرمانه"}
                      selected={type === "به کل محرمانه"}
                      name={"به کل محرمانه"}
                    >
                      به کل محرمانه
                    </option>
                  </select>
                  {formValidator.current.message("type", type, "required")}
                </div>
              </div>
              <div className={"row my-4"}>
                <div className={"col-lg-6"}>
                  <label htmlFor="validationCustom04">انتخاب مخاطبین</label>
                  <div>
                    {contacts.length > 0 || isDataReceived ? (
                      <Select
                        defaultValue={contacts}
                        onChange={(e) => {
                          setContacts(e);
                        }}
                        noOptionsMessage={() => "یافت نشد"}
                        placeholder={"جست و جو در مخاطبین..."}
                        closeMenuOnSelect={false}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        isMulti
                        options={insertFileData.people}
                      />
                    ) : null}
                  </div>
                </div>
                <div className={"col-lg-6"}>
                  <label htmlFor="validationCustom04">انتخاب مخاطبین </label>
                  <div>
                    {contacts.length > 0 || isDataReceived ? (
                      <Select
                        defaultValue={applicantId}
                        onChange={(e) => {
                          setApplicantId(e.value);
                        }}
                        noOptionsMessage={() => "یافت نشد"}
                        placeholder={"جست و جو در مخاطبین..."}
                        closeMenuOnSelect={false}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        options={insertFileData.applicants}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="validationCustom04">
                  کلید واژه (برای جست و جوی راحت تر)
                </label>
                <textarea
                  id="txtFirstNameBilling"
                  rows={5}
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                  placeholder={
                    "کلید واژه های مورد نظر خود را جهت جستجو راحت تر وارد کنید"
                  }
                  className="form-control"
                />
              </div>
              <div className={"row"}>
                <div className={"col-lg-9"}></div>
                <button className="btn btn-success col-lg-3" onClick={sendData}>
                  ثبت پرونده
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default UpdateFileDialog;
