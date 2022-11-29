import React, { Fragment } from "react";
import { useContext } from "react";
import { FormContext } from "../../context/form/FormContext";
import CheckBoxComponent from "../objects/editable/CheckBoxComponent";
import DatePickerComponent from "../objects/editable/DatePickerComponent";
import RadioButtonComponent from "../objects/editable/RadioButtonComponent";
import SelectComponent from "../objects/editable/SelectComponent";
import SimpleInputComponent from "../objects/editable/SimpleInputComponent";
import TextAreaComponent from "../objects/editable/TextAreaComponent";
import ObjectContainer from "../objects/ObjectContainer";
import FormViewerRoot from "../objects/view/FormViewerRoot";

const ShowObjectsListComponent = () => {
  const { child } = useContext(FormContext);
  const objectSwitcher = (item) => {
    switch (item.type) {
      case "input":
        return <SimpleInputComponent item={item} />;
      case "textArea":
        return <TextAreaComponent item={item} />;
      case "radio":
        return <RadioButtonComponent item={item} />;
      case "checkBox":
        return <CheckBoxComponent item={item} />;
      case "selector":
        return <SelectComponent item={item} />;
      case "date":
        return <DatePickerComponent item={item} />;
    }
  };
  return (
    <Fragment>
      {child.map((item) => (
        <ObjectContainer item={item}>
          <>{objectSwitcher(item)}</>
        </ObjectContainer>
      ))}
    </Fragment>
  );
};
export default ShowObjectsListComponent;
