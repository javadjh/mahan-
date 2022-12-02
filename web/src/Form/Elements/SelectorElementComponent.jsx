import React, { useContext, useEffect, useState } from "react";
import { ElementsContext } from "./ElementsContext";
import { v4 as uuidv4 } from "uuid";

const SelectorElementComponent = ({ option, isDisable, isPreview }) => {
  const [values, setValues] = useState([]);
  const { childrenList, setChildrenList } = useContext(ElementsContext);
  const [isShowValidator, setIsShowValidator] = useState(false);

  const [, setReload] = useState();
  let data = childrenList.find((c) => c.uiId === option.uiId)
    ? childrenList.find((c) => c.uiId === option.uiId)
    : {};
  useEffect(() => {
    setValues(data.values ? data.values : []);
  }, [data, option]);

  const setChange = async () => {
    const index = childrenList.find((c) => c.uiId === option.uiId);
    let copy = childrenList;
    copy[index] = data;
    setChildrenList(copy);
    setReload(uuidv4());
  };
  return (
    <div className="form-group">
      <label htmlFor="validationCustom04">
        {option.label}
        <span style={{ color: "red" }}>{option.isRequired ? " * " : ""}</span>
      </label>
      <div>
        <select
          disabled={isDisable}
          className="custom-select"
          onChange={(e) => {
            if (option.isRequired && e.target.value === ".") {
              setIsShowValidator(true);
              data.isValid = false;
            } else {
              setIsShowValidator(false);
              data.isValid = true;
            }
            data.answer = e.target.value;
            if (!isPreview) setChange();
          }}
        >
          <option value={"."} name={"."}>
            انتخاب کنید
          </option>
          {values.map((v) => (
            <option
              selected={data.answer ? data.answer.includes(v) : false}
              value={v}
              name={v}
            >
              {v}
            </option>
          ))}
        </select>
        {isShowValidator ? (
          <p style={{ color: "red" }}>یک مورد را انتخاب کنید</p>
        ) : null}
        <hr />
      </div>
    </div>
  );
};
export default SelectorElementComponent;
