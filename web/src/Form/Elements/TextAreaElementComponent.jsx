import React, { useContext, useState } from "react";
import { ElementsContext } from "./ElementsContext";
import { v4 as uuidv4 } from "uuid";
import { setManualFormPreviewAction } from "../../stateManager/actions/FormAction";
import { useDispatch } from "react-redux";

const TextAreaElementComponent = ({ option, isDisable, isPreview }) => {
  const { childrenList, setChildrenList } = useContext(ElementsContext);
  const [isShowValidator, setIsShowValidator] = useState(false);
  const [, setReload] = useState();
  let data = childrenList.find((c) => c.uiId === option.uiId)
    ? childrenList.find((c) => c.uiId === option.uiId)
    : {};
  const setChange = async () => {
    const index = childrenList.find((c) => c.uiId === option.uiId);
    let copy = childrenList;
    copy[index] = data;
    setChildrenList(copy);
    setReload(uuidv4());
  };
  return (
    <>
      <div className="form-group">
        <label htmlFor="validationCustom04">
          {option.label}
          <span style={{ color: "red" }}>{option.isRequired ? " * " : ""}</span>
        </label>
        <textarea
          disabled={isDisable}
          value={data.answer}
          name={"input"}
          onChange={(e) => {
            if (
              e.target.value.length > option.max ||
              e.target.value.length < option.min
            ) {
              setIsShowValidator(true);
              data.isValid = false;
            } else {
              setIsShowValidator(false);
              data.isValid = true;
            }
            data.answer = e.target.value;
            if (!isPreview) setChange();
          }}
          className="form-control"
          id="validationCustom04"
          placeholder={option.label}
        />
        {isShowValidator ? (
          <p style={{ color: "red" }}>
            حداقل تعداد کاراکتر {option.min} و همچنین حداکثر {option.max}
          </p>
        ) : null}
        <hr className={"mt-4 mb-0"} />
      </div>
    </>
  );
};
export default TextAreaElementComponent;
