import { Form, message } from "antd";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  insertFormAction,
  updateFormAction,
} from "../../stateManager/actions/FormAction";
import { FormContext } from "./FormContext";

const FormContextProvider = ({ children, match, history }) => {
  let id = match?.params?.id;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [child, setChild] = useState([]);
  const addChildren = (obj) => {
    const childrenCopy = [...child];
    childrenCopy.push(obj);
    setChild(childrenCopy);
  };
  const findItem = (uiId) => {
    const childrenCopy = [...child];
    let itemIndex = childrenCopy.findIndex((item) => item.uiId === uiId);
    return { itemIndex, childrenCopy };
  };
  const setLabel = (uiId, label) => {
    let { itemIndex, childrenCopy } = findItem(uiId);
    childrenCopy[itemIndex].label = label;
    setChild(childrenCopy);
  };
  const setMax = (uiId, max) => {
    let { itemIndex, childrenCopy } = findItem(uiId);
    childrenCopy[itemIndex].max = Number(max);
    setChild(childrenCopy);
  };
  const setMin = (uiId, min) => {
    let { itemIndex, childrenCopy } = findItem(uiId);
    childrenCopy[itemIndex].min = Number(min);
    setChild(childrenCopy);
  };
  const setRequired = (uiId, isRequired) => {
    let { itemIndex, childrenCopy } = findItem(uiId);
    childrenCopy[itemIndex].isRequired = isRequired;
    setChild(childrenCopy);
    console.log(childrenCopy);
  };
  const setValues = (uiId, value) => {
    let { itemIndex, childrenCopy } = findItem(uiId);
    let values = childrenCopy[itemIndex].values || [];
    values.push(value);
    childrenCopy[itemIndex].values = values;
    setChild(childrenCopy);
    console.log(childrenCopy);
  };
  const deleteValue = (uiId, value) => {
    let { itemIndex, childrenCopy } = findItem(uiId);
    let values = childrenCopy[itemIndex].values || [];
    values = values.filter((item) => item !== value);
    console.log(values);
    childrenCopy[itemIndex].values = values;
    setChild(childrenCopy);
    console.log(childrenCopy);
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    console.log(oldIndex);
    console.log(newIndex);
    array_move(oldIndex, newIndex);
  };

  function array_move(old_index, new_index) {
    let arr = child;
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    setChild([]);
    setChild(arr);
    console.log(arr);
  }

  const deleteObject = (uiId) => {
    let childrenCopy = [...child];
    childrenCopy = childrenCopy.filter((item) => item.uiId !== uiId);
    setChild(childrenCopy);
  };

  const sendData = async (formData) => {
    formData = { ...formData, children: child };
    if (id != "0") await dispatch(updateFormAction(id, formData));
    else await dispatch(insertFormAction(formData));
    history.goBack();
  };

  return (
    <FormContext.Provider
      value={{
        child,
        form,
        addChildren,
        setLabel,
        setMax,
        setMin,
        setRequired,
        setValues,
        deleteValue,
        onSortEnd,
        deleteObject,
        sendData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
export default FormContextProvider;
