import React, { Fragment } from "react";
import { useContext } from "react";
import { FormContext } from "../../context/form/FormContext";
import OptionItem from "./OptionItem";
import { v4 as uuidv4 } from "uuid";

const ObjectsUtilitiesBlock = () => {
  const { addChildren } = useContext(FormContext);
  const childrenModel = {
    simpleInput: {
      uiId: uuidv4(),
      type: "input",
      isRequired: false,
    },
    textArea: {
      uiId: uuidv4(),
      type: "textArea",
      isRequired: false,
    },
    radio: {
      uiId: uuidv4(),
      type: "radio",
      isRequired: false,
    },
    checkBox: {
      uiId: uuidv4(),
      type: "checkBox",
      isRequired: false,
    },
    select: {
      uiId: uuidv4(),
      type: "selector",
      isRequired: false,
    },
    jalaliDate: {
      uiId: uuidv4(),
      type: "date",
      isRequired: false,
    },
    miladiDate: {
      uiId: uuidv4(),
      type: "dateMiladi",
      isRequired: false,
    },
    melliCode: {
      uiId: uuidv4(),
      type: "input",
      isRequired: false,
      inputType: "melliCode",
      label: "کد ملی",
      pattern: "melliCode",
    },
    email: {
      uiId: uuidv4(),
      type: "input",
      isRequired: false,
      inputType: "email",
      label: "ایمیل",
      pattern: "email",
    },
    phoneNumber: {
      uiId: uuidv4(),
      type: "input",
      isRequired: false,
      inputType: "phoneNumber",
      label: "شماره تماس",
      pattern: "phoneNumber",
    },
    number: {
      uiId: uuidv4(),
      type: "input",
      isRequired: false,
      inputType: "number",
      label: "شماره",
      pattern: "number",
    },
    unique: {
      uiId: uuidv4(),
      type: "input",
      isRequired: false,
      inputType: "unique",
      label: "ورودی یکتا",
      pattern: "unique",
    },
  };
  return (
    <Fragment>
      <OptionItem onClick={() => addChildren(childrenModel.simpleInput)}>
        دریافت متن ساده
      </OptionItem>
      <OptionItem onClick={() => addChildren(childrenModel.textArea)}>
        نوشتن چند خطی
      </OptionItem>
      <OptionItem onClick={() => addChildren(childrenModel.radio)}>
        دریافت یک گزینه از چند گزینه
      </OptionItem>
      <OptionItem onClick={() => addChildren(childrenModel.checkBox)}>
        دریافت چند گزینه از چند گزینه
      </OptionItem>
      <OptionItem onClick={() => addChildren(childrenModel.select)}>
        گزینه های زیاد و انتخاب یکی
      </OptionItem>
      <OptionItem onClick={() => addChildren(childrenModel.jalaliDate)}>
        دریافت تاریخ (جلالی)
      </OptionItem>
      <OptionItem onClick={() => addChildren(childrenModel.miladiDate)}>
        دریافت تاریخ (میلادی)
      </OptionItem>
      <OptionItem onClick={() => addChildren(childrenModel.melliCode)}>
        دریافت شماره ملی
      </OptionItem>
      <OptionItem onClick={() => addChildren(childrenModel.email)}>
        دریافت ایمیل
      </OptionItem>
      <OptionItem onClick={() => addChildren(childrenModel.phoneNumber)}>
        دریافت شماره تماس
      </OptionItem>
      <OptionItem onClick={() => addChildren(childrenModel.number)}>
        دریافت عدد
      </OptionItem>
      <OptionItem onClick={() => addChildren(childrenModel.unique)}>
        دریافت ورودی یکتا
      </OptionItem>
    </Fragment>
  );
};
export default ObjectsUtilitiesBlock;
