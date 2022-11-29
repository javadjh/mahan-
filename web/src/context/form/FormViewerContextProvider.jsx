import React from "react";
import { FormViewerContext } from "./FormViewerContext";
const FormViewerContextProvider = ({ child, children, onSubmit }) => {
  const onFinishForm = (formData) => {
    let submitData = [];
    child.map((item) => {
      submitData.push({
        ...item,
        ...{
          answer: formData[item.uiId],
        },
      });
    });
    onSubmit(submitData);
  };
  return (
    <FormViewerContext.Provider value={{ child, onFinishForm }}>
      {children}
    </FormViewerContext.Provider>
  );
};
export default FormViewerContextProvider;
