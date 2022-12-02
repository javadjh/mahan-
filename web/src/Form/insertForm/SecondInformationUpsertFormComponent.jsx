import React, { useContext, useEffect, useState } from "react";
import InputComponent from "./components/InputComponent";
import TextAreaComponent from "./components/TextAreaComponent";
import RadioComponent from "./components/RadioComponent";
import CheckComponent from "./components/CheckComponent";
import SelectorComponent from "./components/SelectorComponent";
import DateComponent from "./components/DateComponent";
import { UpsertFormContext } from "./UpsertFormContext";
import { useSelector } from "react-redux";
import InputElementComponent from "../Elements/InputElementComponent";
import CheckElementComponent from "../Elements/CheckElementComponent";
import RadioElementComponent from "../Elements/RadioElementComponent";
import SelectorElementComponent from "../Elements/SelectorElementComponent";
import TextAreaElementComponent from "../Elements/TextAreaElementComponent";
import DateElementComponent from "../Elements/DateElementComponent";
import UpsertArchivesFormDialog from "../../ArchiveTree/dialog/UpsertArchivesFormDialog";
import ElementsContextProvider from "../Elements/ElementsContextProvider";
import DateMiladiComponent from "./components/DateMiladiComponent";
const SecondInformationUpsertFormComponent = () => {
  const {
    childrenList,
    formValidator,
    title,
    setTitle,
    description,
    setDescription,
  } = useContext(UpsertFormContext);
  const formEvent = useSelector((state) => state.formEvent.children);

  useEffect(() => {}, [childrenList]);
  const renderSwitch = (type, uiId) => {
    switch (type) {
      case "input":
        return <InputComponent uiId={uiId} />;
      case "textArea":
        return <TextAreaComponent uiId={uiId} />;
      case "radio":
        return <RadioComponent uiId={uiId} />;
      case "checkBox":
        return <CheckComponent uiId={uiId} />;
      case "selector":
        return <SelectorComponent uiId={uiId} />;
      case "date":
        return <DateComponent uiId={uiId} />;
      case "dateMiladi":
        return <DateMiladiComponent uiId={uiId} />;
    }
  };
  return (
    <div className="col-lg-8">
      <div className={"row col-lg-12"}>
        <div className={"col-lg-11"}>
          <hr />
          {formEvent.map((f) => (
            <div>{renderSwitch(f.type, f.uiId)}</div>
          ))}
        </div>
        {/*<div className={"col-lg-4"}>
                    <h6>پیش نمایش</h6>
                    {childrenList.map(c=>(
                        <p>sdcsdcsdcsdcs</p>
                    ))}
                </div>*/}
      </div>
      <div className="mx-2"></div>
    </div>
  );
};
export default SecondInformationUpsertFormComponent;
