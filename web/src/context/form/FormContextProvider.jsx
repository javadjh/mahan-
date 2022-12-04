import { Form, message } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { formService } from "../../service/FormService";
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

  useEffect(() => {
    if (id != "0") getData();
  }, [id]);
  const getData = async () => {
    const { data } = await formService(id);
    form.setFieldsValue(data);
    setChild(data.children);
  };

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
  };
  const setValues = (uiId, value) => {
    let { itemIndex, childrenCopy } = findItem(uiId);
    let values = childrenCopy[itemIndex].values || [];
    values.push(value);
    childrenCopy[itemIndex].values = values;
    setChild(childrenCopy);
  };
  const deleteValue = (uiId, value) => {
    let { itemIndex, childrenCopy } = findItem(uiId);
    let values = childrenCopy[itemIndex].values || [];
    values = values.filter((item) => item !== value);
    childrenCopy[itemIndex].values = values;
    setChild(childrenCopy);
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    array_move(oldIndex, newIndex);
  };
  const upAction = (item) => {
    let { itemIndex, childrenCopy } = findItem(item.uiId);
    if (itemIndex !== childrenCopy.length) {
      array_move(itemIndex, itemIndex - 1);
    }
  };
  const downAction = (item) => {
    let { itemIndex } = findItem(item.uiId);
    if (itemIndex !== child.length) {
      array_move(itemIndex, itemIndex + 1);
    }
  };

  function array_move(old_index, new_index) {
    let arr = [...child];

    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    setChild([]);
    setChild(arr);
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
        upAction,
        downAction,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
export default FormContextProvider;
