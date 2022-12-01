import React, { Fragment, useContext, useEffect, useState } from "react";
import InputElementComponent from "../../Form/Elements/InputElementComponent";
import { ElementsContext } from "../../Form/Elements/ElementsContext";
import CheckElementComponent from "../../Form/Elements/CheckElementComponent";
import RadioElementComponent from "../../Form/Elements/RadioElementComponent";
import SelectorElementComponent from "../../Form/Elements/SelectorElementComponent";
import TextAreaElementComponent from "../../Form/Elements/TextAreaElementComponent";
import DateElementComponent from "../../Form/Elements/DateElementComponent";
import DateMiladiElementComponent from "../../Form/Elements/DateMiladiElementComponent";
import { RootContext } from "../../RootComponent/RootContext";
import { useSelector } from "react-redux";
const UpsertArchivesFormDialog = ({ isPreview }) => {
  const { fileForm, sendData, childrenList } = useContext(ElementsContext);
  const formState = useSelector((state) => state.fileStatistic);
  const formPreview = useSelector((state) => state.formPreview);
  const [form, setForm] = useState([]);
  useEffect(() => {
    console.log("isPreview");
    console.log(isPreview);
    if (isPreview) {
      setForm(formPreview);
    } else {
      if (formState) {
        if (formState.file) {
          if (formState.file.form) {
            if (formState.file.form.length === 0) {
              if (fileForm) {
                if (fileForm.form)
                  if (fileForm.form.children) setForm(fileForm.form.children);
              }
            } else {
              setForm(formState.file.form);
            }
          }
        }
      }
    }
  }, [formState, childrenList, formPreview]);
  const { handleHide } = useContext(RootContext);
  return (
    <Fragment>
      <div>
        <div>
          <div className="modal-content p-4">
            {/*                        <h6>{fileForm.form.title}</h6>
                        <p>{fileForm.form.description}</p>*/}
            <p>فرم زیر را تکمیل کنید</p>
            <div className={"row"}>
              {form
                ? form.map((c) => (
                    <>
                      {c.type === "input" ? (
                        <div className={"col-lg-6"}>
                          <InputElementComponent
                            option={c}
                            isDisable={handleHide("ویرایش روکش پرونده")}
                            isPreview={isPreview}
                          />
                        </div>
                      ) : null}
                      {c.type === "checkBox" ? (
                        <div className={"col-lg-6"}>
                          <CheckElementComponent
                            option={c}
                            isDisable={handleHide("ویرایش روکش پرونده")}
                            isPreview={isPreview}
                          />
                        </div>
                      ) : null}
                      {c.type === "radio" ? (
                        <div className={"col-lg-6"}>
                          <RadioElementComponent
                            option={c}
                            isDisable={handleHide("ویرایش روکش پرونده")}
                            isPreview={isPreview}
                          />
                        </div>
                      ) : null}
                      {c.type === "selector" ? (
                        <div className={"col-lg-6"}>
                          <SelectorElementComponent
                            option={c}
                            isDisable={handleHide("ویرایش روکش پرونده")}
                            isPreview={isPreview}
                          />
                        </div>
                      ) : null}
                      {c.type === "textArea" ? (
                        <div className={"col-lg-6"}>
                          <TextAreaElementComponent
                            option={c}
                            isDisable={handleHide("ویرایش روکش پرونده")}
                            isPreview={isPreview}
                          />
                        </div>
                      ) : null}
                      {c.type === "date" ? (
                        <div className={"col-lg-6"}>
                          <DateElementComponent
                            option={c}
                            isDisable={handleHide("ویرایش روکش پرونده")}
                            isPreview={isPreview}
                          />
                        </div>
                      ) : null}
                      {c.type === "dateMiladi" ? (
                        <div className={"col-lg-6"}>
                          <DateMiladiElementComponent
                            option={c}
                            isDisable={handleHide("ویرایش روکش پرونده")}
                            isPreview={isPreview}
                          />
                        </div>
                      ) : null}
                    </>
                  ))
                : null}
            </div>

            {!isPreview ? (
              <button
                hidden={handleHide("ویرایش روکش پرونده") || isPreview}
                onClick={sendData}
                className={"btn btn-success btn-block col-lg-2"}
              >
                ثبت
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default UpsertArchivesFormDialog;
