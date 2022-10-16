import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insertMoreSettingArchiveAction } from "../../stateManager/actions/ArchiveAction";
import GuardSystemRoot from "../../guardSystem/GuardSystemRoot";
const InsertMoreSettingDialog = () => {
  const dispatch = useDispatch();
  const singleArchive = useSelector((state) => state.singleArchive.archive);

  const [inputLabel, setInputLabel] = useState("");

  const [firstStringOfPattern, setFirstStringOfPattern] = useState(
    singleArchive.firstStringOfPattern
  );
  const [availablePattern, setAvailablePattern] = useState(
    singleArchive.availablePattern
  );
  const [watermarkText, setWatermarkText] = useState(
    singleArchive.watermarkText
  );
  const [maxFileSize, setMaxFileSize] = useState(singleArchive.maxFileSize);

  const [
    isDigitalCodeGeneratedWithSystem,
    setIsDigitalCodeGeneratedWithSystem,
  ] = useState(
    singleArchive.isDigitalCodeGeneratedWithSystem === undefined
      ? false
      : singleArchive.isDigitalCodeGeneratedWithSystem
  );
  const [illegalFormats, setIllegalFormats] = useState([]);

  useEffect(() => {
    if (singleArchive._id) {
      setWatermarkText(singleArchive.watermarkText);
      setMaxFileSize(singleArchive.maxFileSize);
      setIsDigitalCodeGeneratedWithSystem(
        singleArchive.isDigitalCodeGeneratedWithSystem === undefined
          ? false
          : singleArchive.isDigitalCodeGeneratedWithSystem
      );
      setFirstStringOfPattern(singleArchive.firstStringOfPattern);
      setAvailablePattern(singleArchive.availablePattern);
      switch (singleArchive.availablePattern) {
        case "one":
          setInputLabel(`-حروفی که کاربر وارد میکند`);
          break;
        case "two":
          setInputLabel(`-تاریخ-عددی که کاربر وارد میکند`);
          break;
        case "three":
          setInputLabel(`-تاریخ-عددی که سامانه تولید میکند`);
          break;
        case "four":
          setInputLabel(``);
          break;
        case "five":
          setInputLabel(``);
          break;
      }
      setIllegalFormats(singleArchive.illegalFormats);
    } else {
      setWatermarkText("");
      setMaxFileSize("");
      setIsDigitalCodeGeneratedWithSystem(false);
      setFirstStringOfPattern(``);
      setAvailablePattern(``);
      setIllegalFormats([]);
    }
  }, [singleArchive]);
  const sendData = async () => {
    let data = {
      watermarkText,
      maxFileSize,
      isDigitalCodeGeneratedWithSystem,
      firstStringOfPattern,
      availablePattern,
      illegalFormats,
    };
    await dispatch(insertMoreSettingArchiveAction(singleArchive._id, data));
  };
  return (
    <Fragment>
      <div
        className="modal fade"
        id="insertMoreSetting"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg " role="document">
          <div className="modal-content p-4">
            <div>
              <GuardSystemRoot archiveId={singleArchive._id} />
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="validationCustom04">متن واترمارک</label>
                    <input
                      type="text"
                      name={"watermarkText"}
                      value={watermarkText}
                      onChange={(e) => {
                        setWatermarkText(e.target.value);
                      }}
                      className="form-control"
                      id="validationCustom04"
                      placeholder="متن واترمارک ..."
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="validationCustom04">
                      حداکثر حجم فایل هر سند(KB)
                    </label>
                    <input
                      type="number"
                      name={"maxFileSize"}
                      value={maxFileSize}
                      onChange={(e) => {
                        setMaxFileSize(e.target.value);
                      }}
                      className="form-control"
                      id="validationCustom04"
                      placeholder="حداکثر حجم فایل هر سند را وارد کنید"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <hr />

                <div hidden={inputLabel.length < 2}>
                  <div className="col-md-12 text-right">
                    <div
                      className="form-group text-right col-lg-12"
                      style={{ display: "flex" }}
                    >
                      <input
                        type="text"
                        name={"firstStringOfPattern"}
                        value={firstStringOfPattern}
                        placeholder={"شناسه"}
                        onChange={(e) => {
                          setFirstStringOfPattern(e.target.value);
                        }}
                        className="col-lg-1 text-right p-0 m-0"
                        style={{ fontSize: 14, outline: "none" }}
                        id="validationCustom04"
                      />
                      <a className={"text-right "}>{inputLabel}</a>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <div>
                      <div className="custom-control custom-radio mb-2">
                        <input
                          type="radio"
                          id={`one`}
                          checked={availablePattern === "one"}
                          onClick={() => {
                            setAvailablePattern(`one`);
                            setInputLabel(`-حروفی که کاربر وارد میکند`);
                          }}
                          name={`type`}
                          className="custom-control-input"
                        />
                        <label className="custom-control-label" htmlFor={`one`}>
                          {" "}
                          <a>نوع اول - [شناسه]-(توسط کاربر وارد شود) f-</a>
                          <b style={{ color: "red" }}>541263</b>
                        </label>
                      </div>
                      <div className="custom-control custom-radio mb-2">
                        <input
                          type="radio"
                          id={`two`}
                          checked={availablePattern === "two"}
                          onClick={() => {
                            setAvailablePattern(`two`);
                            setInputLabel(`-تاریخ-عددی که کاربر وارد میکند`);
                          }}
                          name={`type`}
                          className="custom-control-input"
                        />
                        <label className="custom-control-label" htmlFor={`two`}>
                          نوع دوم - [شناسه]-تاریخ-(توسط کاربر وارد شود) f-
                          <b style={{ color: "green" }}>14001025</b>
                          <b style={{ color: "red" }}>741525</b>
                        </label>
                      </div>
                      <div className="custom-control custom-radio mb-2">
                        <input
                          type="radio"
                          id={`three`}
                          checked={availablePattern === "three"}
                          onClick={() => {
                            setAvailablePattern(`three`);
                            setInputLabel(`-تاریخ-عددی که سامانه تولید میکند`);
                          }}
                          name={`type`}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={`three`}
                        >
                          نوع سوم - [شناسه]-تاریخ-(توسط سامانه وارد می شود) f-
                          <b style={{ color: "green" }}>14001025</b>
                          <b style={{ color: "red" }}>001</b>
                        </label>
                      </div>
                      <div className="custom-control custom-radio mb-2">
                        <input
                          type="radio"
                          id={`four`}
                          checked={availablePattern === "four"}
                          onClick={() => {
                            setAvailablePattern(`four`);
                            setInputLabel(``);
                          }}
                          name={`type`}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={`four`}
                        >
                          کامل توسط سامانه تولید شود
                        </label>
                      </div>
                      <div className="custom-control custom-radio mb-2">
                        <input
                          type="radio"
                          id={`five`}
                          checked={availablePattern === "five"}
                          onClick={() => {
                            setAvailablePattern(`five`);
                            setInputLabel(``);
                          }}
                          name={`type`}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={`five`}
                        >
                          کامل توسط کاربر تولید شود
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={"row"}>
                <div className={"col-lg-10"}></div>

                <div className={"col-lg-2"}>
                  <button
                    type="button"
                    onClick={sendData}
                    className="btn btn-primary btn-lg waves-effect waves-light mb-1 mt-2 btn-block"
                  >
                    ثبت
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default InsertMoreSettingDialog;
